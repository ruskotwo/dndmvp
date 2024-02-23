package main

import (
	"github.com/gorilla/mux"
	"log"
	"net/http"
	"os"
)

func main() {
	fs := http.FileServer(http.Dir("./web/build/"))

	r := mux.NewRouter()

	r.Handle("/static/", fs)

	r.HandleFunc("/", handleUrl)

	log.Print("Listening on :3000...")
	err := http.ListenAndServe(":3000", nil)
	if err != nil {
		log.Fatal(err)
	}
}

func handleUrl(w http.ResponseWriter, r *http.Request) {
	index, err := os.ReadFile("./web/build/index.html")
	if err != nil {
		if os.IsNotExist(err) {
			http.NotFound(w, r)
			return
		}
	}

	_, err = w.Write(index)

	if err != nil {
		http.Error(w, http.StatusText(500), 500)
		return
	}
}
