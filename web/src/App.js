import './App.css';
import './normalize.css';
import Collapsible from "./components/Collapsible/Collapsible";
import CharacterCard from './components/characterCards/CharacterCard';
import ItemCard from "./components/itemCard/ItemCard";
import React from "react";


export default class App extends React.Component {

    ws = null

    constructor(props) {
        super(props);
        this.state = {
            game: {}, items: [], characters: []
        };
        this.initWS()
    }

    initWS() {
        if (this.ws) {
            return;
        }

        this.ws = new WebSocket("wss://4204-2a00-1370-8198-872d-91c8-ce55-9c03-b247.ngrok-free.app/ws/game");

        this.ws.onopen = function () {
            console.log('Open');
        }
        this.ws.onclose = () => {
            console.log('Close');
            this.ws = null
            setTimeout(() => this.initWS(), 10000)
        }
        this.ws.onmessage = (evt) => {
            console.log("RESPONSE: " + evt.data)
            let data = JSON.parse(evt.data)

            this.setState({
                game: data.game ?? {},
                items: data.items ?? [],
                characters: data.characters ?? []
            })

            console.log(data.game)
        }
        this.ws.onerror = function (evt) {
            console.log('Error: ' + evt.data);
        }
    }

    render() {
        return (<div className="App" data-1-color-modes-mode="dark-mode">
            <div className="game-content">
                <Collapsible label='Описание'>
                    <p className='game-content-description'>
                        {this.state.game.desc === null ? 'Описание отсутствует' : this.state.game.desc}
                    </p>
                </Collapsible>
                <Collapsible label='Инвентарь гильдии'>
                    {this.state.items.map(item => item.ownerId === 0 ? <ItemCard item={item}/> : null)}
                </Collapsible>
                <Collapsible label='Игроки'>
                    {this.state.characters.map(character => (
                        <CharacterCard
                            items={this.state.items.filter(item => item.ownerId === character.id)}
                            character={character}
                        />
                    ))}
                </Collapsible>
            </div>
        </div>);
    }
}
