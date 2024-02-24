package controller

import (
	"log"
	"net/http"
	"os"
)

func StartServer() {
	fs := http.FileServer(http.Dir("./web/build/"))

	http.Handle("/static/", fs)
	http.HandleFunc("/ws/master", handleWsMaster)
	http.HandleFunc("/ws/game", handleWsGame)
	http.HandleFunc("/master", handleMaster)
	http.HandleFunc("/", handleHome)

	log.Print("Listening on :4000...")
	err := http.ListenAndServe(":4000", nil)
	if err != nil {
		log.Fatal(err)
	}
}

func handleHome(w http.ResponseWriter, r *http.Request) {
	showPage(w, r, "./web/build/index.html")
}

func handleMaster(w http.ResponseWriter, r *http.Request) {
	showPage(w, r, "./web/master.html")
}

func showPage(w http.ResponseWriter, r *http.Request, path string) {
	index, err := os.ReadFile(path)
	if err != nil {
		if os.IsNotExist(err) {
			http.NotFound(w, r)
			return
		}
		http.Error(w, http.StatusText(500), 500)
		return
	}

	_, err = w.Write(index)

	if err != nil {
		http.Error(w, http.StatusText(500), 500)
		return
	}
}
