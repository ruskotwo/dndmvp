package controller

import (
	"dndmvp/internal/database/games"
	"encoding/json"
	"log"
)

func handleUpdateGame(data WsUpdateData) {
	res := games.UpdateValueById(
		data.Key,
		data.Value,
		data.Id,
	)

	if res {
		req := WsRequest{
			WsTypeUpdateGame,
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
