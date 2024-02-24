FROM node:latest as web

RUN mkdir /app
ADD . /app
WORKDIR /app/web

RUN npm install react-scripts

RUN npm run build

FROM golang:alpine

COPY --from=web /app /app
WORKDIR /app

RUN go build -o ./main ./cmd/main.go

CMD /app/main