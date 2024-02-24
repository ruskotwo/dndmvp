package controller

import (
	"dndmvp/internal/database/characters"
	"dndmvp/internal/database/games"
	"dndmvp/internal/database/items"
	"encoding/json"
	"fmt"
	"github.com/gorilla/websocket"
	"log"
	"net/http"
	"sync"
)

type WsGameData struct {
	Characters []characters.Character `json:"characters"`
	Items      []items.Item           `json:"items"`
	Game       games.Game             `json:"game"`
}

type WsRequest struct {
	Type string      `json:"type"`
	Data interface{} `json:"data"`
}

type WsUpdateData struct {
	Id    uint64 `json:"id"`
	Key   string `json:"key"`
	Value string `json:"value"`
}

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

var clients sync.Map
var masters sync.Map

var gameId = uint64(2) // Ну раз пока фронт не умеет понимать, что за игру мы смотрим

func handleWsGame(w http.ResponseWriter, r *http.Request) {
	connection, _ := upgrader.Upgrade(w, r, nil)
	defer func(connection *websocket.Conn) {
		_ = connection.Close()
	}(connection)

	clients.Store(connection, true)
	defer clients.Delete(connection)

	isExist, gameData := fetchAllData(gameId)

	if !isExist {
		_ = connection.WriteMessage(websocket.CloseMessage, []byte("Game not found"))
		return
	}

	req := WsRequest{
		WsTypeAllData,
		gameData,
	}

	marshal, err := json.Marshal(req)
	if err != nil {
		log.Printf("error marshal game data: %v", err)
		return
	}
	err = connection.WriteMessage(websocket.TextMessage, marshal)
	if err != nil {
		log.Printf("error send game data: %v", err)
		return
	}

	for {
		mt, _, err := connection.ReadMessage()

		if err != nil || mt == websocket.CloseMessage {
			break // Выходим из цикла, если клиент пытается закрыть соединение или связь с клиентом прервана
		}
	}
}

func handleWsMaster(w http.ResponseWriter, r *http.Request) {
	isExist, gameData := fetchAllData(gameId)

	if !isExist {
		http.NotFound(w, r)
		return
	}

	if !gameData.Game.ComparePass(r.URL.Query().Get("pass")) {
		http.Error(w, http.StatusText(401), 401)
		return
	}

	connection, _ := upgrader.Upgrade(w, r, nil)
	defer func(connection *websocket.Conn) {
		_ = connection.Close()
	}(connection)

	masters.Store(connection, true)
	defer masters.Delete(connection)

	req := WsRequest{
		WsTypeAllData,
		gameData,
	}

	marshal, err := json.Marshal(req)
	if err != nil {
		log.Printf("error marshal game data: %v", err)
		return
	}
	err = connection.WriteMessage(websocket.TextMessage, marshal)
	if err != nil {
		log.Printf("error send game data: %v", err)
		return
	}

	for {
		mt, message, err := connection.ReadMessage()

		if err != nil || mt == websocket.CloseMessage {
			break // Выходим из цикла, если клиент пытается закрыть соединение или связь с клиентом прервана
		}

		wsRequest := &WsRequest{}

		err = json.Unmarshal(message, wsRequest)
		if err != nil {
			log.Printf("error unmarshal ws request: %v", err)
			return
		}

		handleWsRequest(wsRequest, gameId)
	}
}

func SendMessage(message []byte, recipients *sync.Map) {
	recipients.Range(func(k, v interface{}) bool {
		connect, ok := k.(*websocket.Conn)
		if !ok {
			return true
		}
		err := connect.WriteMessage(websocket.TextMessage, message)
		if err != nil {
			log.Printf("error send message: %v", err)
			_ = connect.Close()
			clients.Delete(connect)
			return true
		}
		return true
	})
}

func fetchAllData(gameId uint64) (isExist bool, gameData WsGameData) {
	isExist, gameData.Game = games.GetOneById(gameId)
	gameData.Characters = characters.GetByGame(gameId)
	gameData.Items = items.GetByGame(gameId)

	return
}

func handleWsRequest(wsRequest *WsRequest, gameId uint64) {
	jsonData, err := json.Marshal(wsRequest.Data)
	if err != nil {
		log.Printf("error outgoing Req data: %v", err)
		return
	}

	switch wsRequest.Type {
	case WsTypeUpdateCharacter:
		var data WsUpdateData
		err = json.Unmarshal(jsonData, &data)
		if err != nil {
			fmt.Printf("Conversion failed to WsUpdateData for %#v\n", wsRequest.Data)
			return
		}
		handleUpdateCharacter(data)
		break
	case WsTypeCreateCharacter:
		handleCreateCharacter(gameId)
		break
	case WsTypeDeleteCharacter:
		var id uint64
		err = json.Unmarshal(jsonData, &id)
		if err != nil {
			fmt.Printf("Conversion failed to WsUpdateData for %#v\n", wsRequest.Data)
			return
		}
		handleDeleteCharacter(id)
		break
	case WsTypeUpdateItem:
		var data WsUpdateData
		err = json.Unmarshal(jsonData, &data)
		if err != nil {
			fmt.Printf("Conversion failed to WsUpdateData for %#v\n", wsRequest.Data)
			return
		}
		handleUpdateItem(data)
		break
	case WsTypeCreateItem:
		handleCreateItem(gameId)
		break
	case WsTypeDeleteItem:
		var id uint64
		err = json.Unmarshal(jsonData, &id)
		if err != nil {
			fmt.Printf("Conversion failed to WsUpdateData for %#v\n", wsRequest.Data)
			return
		}
		handleDeleteItem(id)
		break

	case WsTypeUpdateGame:
		var data WsUpdateData
		err = json.Unmarshal(jsonData, &data)
		if err != nil {
			fmt.Printf("Conversion failed to WsUpdateData for %#v\n", wsRequest.Data)
			return
		}
		handleUpdateGame(data)
		break
	}
}
