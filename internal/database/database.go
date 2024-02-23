package database

import (
	"database/sql"
	"dndmvp/internal/config"
	"log"
	"sync"
	"time"
)

var instance *sql.DB
var once sync.Once

func GetDB() *sql.DB {
	once.Do(func() {
		// TODO: в идеале переписать на пул
		db, err := sql.Open("mysql", config.GetConfig().Database)
		if err != nil {
			log.Fatal(err)
		}

		db.SetConnMaxLifetime(time.Minute * 3)
		db.SetMaxOpenConns(10)
		db.SetMaxIdleConns(10)
	})

	return instance
}
