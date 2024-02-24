package items

import (
	"dndmvp/internal/database"
	"fmt"
	"log"
)

type Item struct {
	Id          uint64  `json:"id"`
	GameId      uint64  `json:"gameId"`
	OwnerId     uint64  `json:"ownerId"`
	Name        string  `json:"name"`
	Description *string `json:"description"`
	Count       uint64  `json:"count"`
}

func GetByGame(gameId uint64) (result []Item) {
	res, err := database.GetDB().Query("SELECT * FROM items WHERE gameId = ?", gameId)

	if err != nil {
		log.Fatal(err)
	}

	for res.Next() {
		var chapter Item
		err := res.Scan(
			&chapter.Id,
			&chapter.GameId,
			&chapter.OwnerId,
			&chapter.Name,
			&chapter.Description,
			&chapter.Count,
		)

		if err != nil {
			log.Println(err)
		}

		result = append(result, chapter)
	}

	_ = res.Close()

	return
}

func UpdateValueById(column string, value string, id uint64) bool {
	_, err := database.GetDB().Exec(
		fmt.Sprintf("UPDATE items SET %s = ? WHERE id = ?", column),
		value,
		id,
	)

	if err != nil {
		log.Printf("Falled update item column %s for %v: %v\n", column, id, err)
		return false
	}

	log.Printf("Updated item column %s for %v", column, id)
	return true
}

func CreateFromGame(gameId uint64) uint64 {
	res, err := database.GetDB().Exec(
		"INSERT INTO items (gameId, description) VALUES (?, '')",
		gameId,
	)

	if err != nil {
		log.Println("Falled insert item")
		return 0
	}

	id, err := res.LastInsertId()
	if err != nil {
		log.Println("Falled get last insert")
		return 0
	}

	log.Printf("Create item %v", id)
	return uint64(id)
}

func Delete(id uint64) {
	_, err := database.GetDB().Exec(
		"DELETE FROM items WHERE id = ?",
		id,
	)

	if err != nil {
		log.Println("Falled insert item")
		return
	}

	log.Printf("Deleted item %v", id)
}
