package characters

import (
	"dndmvp/internal/database"
	"fmt"
	"log"
)

type Stat int8

type Character struct {
	Id           uint64 `json:"id"`
	GameId       uint64 `json:"gameId"`
	Name         string `json:"name"`
	Description  string `json:"description"`
	Health       uint64 `json:"health"`
	Armor        uint64 `json:"armor"`
	Gold         uint64 `json:"gold"`
	MetaCoins    uint64 `json:"metaCoins"`
	Strength     Stat   `json:"strength"`
	Dexterity    Stat   `json:"dexterity"`
	Constitution Stat   `json:"constitution"`
	Intelligence Stat   `json:"intelligence"`
	Wisdom       Stat   `json:"wisdom"`
	Charisma     Stat   `json:"charisma"`
}

func GetByGame(gameId uint64) (result []Character) {
	res, err := database.GetDB().Query("SELECT * FROM characters WHERE gameId = ?", gameId)

	if err != nil {
		log.Fatal(err)
	}

	for res.Next() {
		var character Character
		err := res.Scan(
			&character.Id,
			&character.GameId,
			&character.Name,
			&character.Description,
			&character.Health,
			&character.Armor,
			&character.Gold,
			&character.MetaCoins,
			&character.Strength,
			&character.Dexterity,
			&character.Constitution,
			&character.Intelligence,
			&character.Wisdom,
			&character.Charisma,
		)

		if err != nil {
			log.Println(err)
		}

		result = append(result, character)
	}

	_ = res.Close()

	return
}

func UpdateValueById(column string, value string, id uint64) bool {
	_, err := database.GetDB().Exec(
		fmt.Sprintf("UPDATE characters SET %s = ? WHERE id = ?", column),
		value,
		id,
	)

	if err != nil {
		log.Printf("Falled update characters column %s for %v: %v\n", column, id, err)
		return false
	}

	log.Printf("Updated characters column %s for %v", column, id)
	return true
}

func CreateFromGame(gameId uint64) uint64 {
	res, err := database.GetDB().Exec(
		"INSERT INTO characters (gameId) VALUES (?)",
		gameId,
	)

	if err != nil {
		log.Println("Falled insert character")
		return 0
	}

	id, err := res.LastInsertId()
	if err != nil {
		log.Println("Falled get last insert")
		return 0
	}

	log.Printf("Create character %v", id)
	return uint64(id)
}

func Delete(id uint64) {
	_, err := database.GetDB().Exec(
		"DELETE FROM characters WHERE id = ?",
		id,
	)

	if err != nil {
		log.Println("Falled insert character")
		return
	}

	log.Printf("Deleted character %v", id)
}
