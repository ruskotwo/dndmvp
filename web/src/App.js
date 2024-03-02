import React from "react";
import "./App.css";
import "./normalize.css";
import TabbedView from "./components/tabbedView/TabbedView";
import CharacterCard from "./components/characterCards/CharacterCard";
import ItemCard from "./components/itemCard/ItemCard";
import Collapsible from "./components/Collapsible/Collapsible";
import {handleAllData} from "./websocketHandlers/allDataHandler";
import {handleUpdateCharacter} from "./websocketHandlers/updateCharacterHandler";
import {handleCreateCharacter} from "./websocketHandlers/createCharacterHandler";
import {handleDeleteCharacter} from "./websocketHandlers/deleteCharacterHandler";
import {handleCreateItem} from "./websocketHandlers/createItemHandler";
import {handleUpdateItem} from "./websocketHandlers/updateItemHandler";
import {handleDeleteItem} from "./websocketHandlers/deleteItemHandler";
import {handleUpdateGame} from "./websocketHandlers/handleUpdateGame";

export default class App extends React.Component {
    ws = null;
    mounted = false;

    constructor(props) {
        super(props);
        this.state = {
            game: {}, items: [], characters: [],
        };
        this.initWS();
    }

    componentDidMount() {
        this.mounted = true;
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    initWS() {
        if (this.ws) {
            return;
        }

        this.ws = new WebSocket("ws://dnd.igc.su:4000/ws/game");

        this.ws.onopen = this.onWSOpen;
        this.ws.onclose = this.onWSClose;
        this.ws.onmessage = this.onWSMessage;
        this.ws.onerror = this.onWSError;
    }

    onWSOpen = () => {
        console.log('connected');
    };
    onWSClose = () => {
        console.log('disconnected');
        this.ws = null;
        setTimeout(this.initWS, 10000);
    };
    onWSError = (evt) => {
        console.log("Error: " + evt.data);
    };
    onWSMessage = (raw) => {
        let evt = JSON.parse(raw.data);
        switch (evt.type) {
            case 'allData':
                if (this.mounted) {
                    handleAllData(evt.data, this.setState.bind(this));
                }
                console.log(evt.data)
                return;
            case 'updateCharacter':
                if (this.mounted) {
                    handleUpdateCharacter(evt.data, this.state, this.setState.bind(this));
                }
                return;
            case 'createCharacter':
                if (this.mounted) {
                    handleCreateCharacter(evt.data, this.state, this.setState.bind(this));
                }
                return;
            case 'deleteCharacter':
                if (this.mounted) {
                    handleDeleteCharacter(evt.data, this.state, this.setState.bind(this));
                }
                return;
            case 'createItem':
                if (this.mounted) {
                    handleCreateItem(evt.data, this.state, this.setState.bind(this));
                }
                return;
            case 'updateItem':
                if (this.mounted) {
                    handleUpdateItem(evt.data, this.state, this.setState.bind(this));
                }
                return;
            case 'deleteItem':
                if (this.mounted) {
                    handleDeleteItem(evt.data, this.state, this.setState.bind(this));
                }
                return;
            case 'updateGame':
                if (this.mounted) {
                    handleUpdateGame(evt.data, this.state, this.setState.bind(this));
                }
                return;
            default:
                return;
        }
    };

    render() {
        const tabs = [
            {
                label: "Описание", content: (<div>
                    <p className="game-content-description">
                        {this.state.game.description === null ? "Описание отсутствует" : this.state.game.description}
                    </p>
                </div>)
            }, {
                label: "Карта", content: (<div>
                    <h1 style={{color: '#fff'}}>Тут будет карта, но мы ее не сделали</h1>
                </div>)
            }, {
                label: "Ход игры", content: (<div>
                    <Collapsible key="inventoryGuild" label='Инвентарь гильдии'>
                        {this.state.items
                            .filter(item => item.ownerId === 0 && item.count > 0) // Фильтруем элементы по условию
                            .map((item, index) => (
                                <ItemCard key={index} item={item}/>
                            ))}
                    </Collapsible>
                    <Collapsible key="characters" label='Персонажи'>
                        {this.state.characters.map((character, index) => (
                            character.name && character.name.trim() !== "" && (
                                <CharacterCard
                                    key={index}
                                    items={this.state.items.filter((item) => item.ownerId === character.id)}
                                    character={character}
                                />
                            )
                        ))}
                    </Collapsible>
                </div>)
            }, {
                label: "Боссы", content: (<div>
                    {/*{this.state.boss.length === 0 ? (*/}
                    {/*    <p>Боссы еще не завершены</p>*/}
                    {/*) : (*/}
                    {/*    this.state.boss.map((boss, index) => (*/}
                    {/*        boss.name && boss.name.trim() !== "" && (*/}
                    {/*            <CharacterCard*/}
                    {/*                key={index}*/}
                    {/*                items={this.state.items.filter((item) => item.ownerId === boss.id)}*/}
                    {/*                boss={boss}*/}
                    {/*            />*/}
                    {/*        )*/}
                    {/*    ))*/}
                    {/*)}*/}
                </div>)
            }, {
                label: "Нейтральные персонажи", content: (<div>
                    {/*{this.state.neutral.length === 0 ? (*/}
                    {/*    <p>Нейтральных персонажей еще нет</p>*/}
                    {/*) : (*/}
                    {/*    this.state.neutral.map((neutral, index) => (*/}
                    {/*        neutral.name && neutral.name.trim() !== "" && (*/}
                    {/*            <CharacterCard*/}
                    {/*                key={index}*/}
                    {/*                items={this.state.items.filter((item) => item.ownerId === neutral.id)}*/}
                    {/*                neutral={neutral}*/}
                    {/*            />*/}
                    {/*        )*/}
                    {/*    ))*/}
                    {/*)}*/}
                </div>)
            },
        ];

        return (<div className="App" data-1-color-modes-mode="dark-mode">
                <div className="game-content">
                    <TabbedView tabs={tabs}/>
                </div>
            </div>);
    }
}
