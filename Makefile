build:
	docker build -t dnd2 .

run:
	docker run -p 4000:4000 dnd2