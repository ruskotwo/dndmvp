package controller

import (
	"dndmvp/internal/database/items"
	"encoding/json"
	"log"
)

func handleUpdateItem(data WsUpdateData) {
	res := items.UpdateValueById(
		data.Key,
		data.Value,
		data.Id,
	)

	if res {
		req := WsRequest{
			WsTypeUpdateItem,
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

func handleCreateItem(gameId uint64) {
	id := items.CreateFromGame(gameId)

	if id != 0 {
		req := WsRequest{
			WsTypeCreateItem,
			items.Item{
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

func handleDeleteItem(id uint64) {
	items.Delete(id)

	if id != 0 {
		req := WsRequest{
			WsTypeDeleteItem,
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
