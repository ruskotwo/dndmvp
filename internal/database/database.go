package database

import (
	"database/sql"
	"dndmvp/internal/config"
	_ "github.com/go-sql-driver/mysql"
	"log"
	"sync"
	"time"
)

var instance *sql.DB
var once sync.Once

func GetDB() *sql.DB {
	once.Do(func() {
		// TODO: в идеале переписать на пул
		var err error
		instance, err = sql.Open("mysql", config.GetConfig().Database)
		if err != nil {
			log.Fatal(err)
		}

		instance.SetConnMaxLifetime(time.Minute * 3)
		instance.SetMaxOpenConns(10)
		instance.SetMaxIdleConns(10)
	})

	return instance
}
