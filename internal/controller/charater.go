package controller

import (
	"dndmvp/internal/database/characters"
	"encoding/json"
	"log"
)

func handleUpdateCharacter(data WsUpdateData) {
	res := characters.UpdateValueById(
		data.Key,
		data.Value,
		data.Id,
	)

	if res {
		req := WsRequest{
			WsTypeUpdateCharacter,
			data,
		}

		marshal, err := json.Marshal(req)
		if err != nil {
			log.Printf("error marshal game data: %v", err)
			return
		}

		SendMessage(marshal, &clients)
	}
}

func handleCreateCharacter(gameId uint64) {
	id := characters.CreateFromGame(gameId)

	if id != 0 {
		req := WsRequest{
			WsTypeCreateCharacter,
			characters.Character{
				Id: id,
			},
		}

		marshal, err := json.Marshal(req)
		if err != nil {
			log.Printf("error marshal game data: %v", err)
			return
		}

		SendMessage(marshal, &clients)
		SendMessage(marshal, &masters)
	}
}

func handleDeleteCharacter(id uint64) {
	characters.Delete(id)

	if id != 0 {
		req := WsRequest{
			WsTypeDeleteCharacter,
			id,
		}

		marshal, err := json.Marshal(req)
		if err != nil {
			log.Printf("error marshal game data: %v", err)
			return
		}

		SendMessage(marshal, &clients)
		SendMessage(marshal, &masters)
	}
}
