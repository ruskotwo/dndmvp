package games

import (
	"dndmvp/internal/database"
	"fmt"
	"log"
)

type Game struct {
	Id          uint64  `json:"id"`
	Name        string  `json:"name"`
	Description *string `json:"description"`
	pass        string
}

func (g Game) ComparePass(pass string) bool {
	return g.pass == pass
}

func GetOneById(id uint64) (bool, Game) {
	res, err := database.GetDB().Query("SELECT * FROM games WHERE id = ?", id)

	if err != nil {
		log.Fatal(err)
	}

	var game Game
	isExist := false

	for res.Next() {
		err := res.Scan(&game.Id, &game.Name, &game.Description, &game.pass)

		if err != nil {
			log.Println(err)
		}

		isExist = true
		break
	}

	_ = res.Close()

	return isExist, game
}

func UpdateValueById(column string, value string, id uint64) bool {
	_, err := database.GetDB().Exec(
		fmt.Sprintf("UPDATE games SET %s = ? WHERE id = ?", column),
		value,
		id,
	)

	if err != nil {
		log.Printf("Falled update game column %s for %v: %v\n", column, id, err)
		return false
	}

	log.Printf("Updated game column %s for %v", column, id)
	return true
}
