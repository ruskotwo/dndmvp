import React from "react";
import "./App.css";
import "./normalize.css";
import TabbedView from "./components/tabbedView/TabbedView";
import CharacterCard from "./components/characterCards/CharacterCard";
import ItemCard from "./components/itemCard/ItemCard";
import Collapsible from "./components/Collapsible/Collapsible";

export default class App extends React.Component {
    ws = null;

    constructor(props) {
        super(props);
        this.state = {
            game: {}, items: [], characters: [],
        };
        this.initWS();
    }

    initWS() {
        if (this.ws) {
            return;
        }

        this.ws = new WebSocket("wss://4204-2a00-1370-8198-872d-91c8-ce55-9c03-b247.ngrok-free.app/ws/game");

        this.ws.onopen = function () {
            console.log("Open");
        };
        this.ws.onclose = () => {
            console.log("Close");
            this.ws = null;
            setTimeout(() => this.initWS(), 10000);
        };
        this.ws.onmessage = (raw) => {
            let evt = JSON.parse(raw.data)

            switch (evt.type) {
                case 'allData':
                    if (evt.data && evt.data.game && evt.data.items && evt.data.characters) {
                        this.setState({
                            game: evt.data.game,
                            items: evt.data.items,
                            characters: evt.data.characters,
                        });
                    }
                    return;
                case 'updateCharacter':
                    const updatedStat = evt.data;
                    if (!updatedStat || typeof updatedStat !== 'object' || !updatedStat.id || !updatedStat.key || !updatedStat.value) {
                        console.error('Invalid data received for character update:', updatedStat);
                        return; // Прерываем выполнение обработчика, если данные некорректные
                    }

                    // Находим персонажа, которому принадлежит обновленная статистика
                    const updatedCharacter = this.state.characters.find(character => character.id === updatedStat.id);
                    if (!updatedCharacter) {
                        console.error('Character not found for id:', updatedStat.id);
                        return; // Прерываем выполнение обработчика, если персонаж не найден
                    }

                    // Обновляем соответствующую характеристику персонажа
                    updatedCharacter[updatedStat.key] = updatedStat.value;

                    // Обновляем состояние, чтобы отобразить изменения
                    this.setState(prevState => ({
                        characters: prevState.characters.map(character =>
                            character.id === updatedCharacter.id ? updatedCharacter : character
                        )
                    }));
                    return;
                case 'createCharacter':
                    const newCharacter = evt.data;
                    if (!newCharacter || typeof newCharacter !== 'object' || !newCharacter.id) {
                        console.error('Invalid data for creating character:', newCharacter);
                        return; // Прерываем выполнение метода, если данные некорректные
                    }

                    // Проверяем, что персонаж с таким ID еще не существует
                    if (this.state.characters.find(character => character.id === newCharacter.id)) {
                        console.error('Character with ID already exists:', newCharacter.id);
                        return; // Прерываем выполнение метода, если персонаж уже существует
                    }

                    // Добавляем нового персонажа в массив персонажей в состоянии
                    this.setState(prevState => ({
                        characters: [...prevState.characters, newCharacter]
                    }));
                    return;
                case 'deleteCharacter':
                    const characterId = evt.data;
                    if (!characterId) {
                        console.error('Invalid character id:', characterId);
                        return; // Прерываем выполнение метода, если id некорректный
                    }

                    // Проверяем, существует ли персонаж с таким id
                    const characterToDelete = this.state.characters.find(character => character.id === characterId);
                    if (!characterToDelete) {
                        console.error('Character with id not found:', characterId);
                        return; // Прерываем выполнение метода, если персонаж не найден
                    }

                    // Фильтруем массив персонажей, оставляя только те, у которых id не совпадает с characterId
                    const updatedCharacters = this.state.characters.filter(character => character.id !== characterId);

                    // Обновляем состояние, чтобы удалить персонажа из списка
                    this.setState({
                        characters: updatedCharacters
                    });
                    return;
                default:
                    return;
            }
        };
        this.ws.onerror = function (evt) {
            console.log("Error: " + evt.data);
        };
    }

    render() {
        const tabs = [{
            label: "Описание", content: (<p className="game-content-description">
                {this.state.game.desc === null ? "Описание отсутствует" : this.state.game.desc}
            </p>),
        }, {
            label: "Карта", content: (<div>
                <h1 style={{color: '#fff'}}>Тут будет карта, но мы ее не сделали</h1>
            </div>),
        }, {
            label: "Инвентарь & Персонажи", content: (<div>
                <Collapsible label='Инвентарь гильдии'>
                    {this.state.items.map((item) => item.ownerId === 0 ? <ItemCard item={item}/> : null)}
                </Collapsible>
                <Collapsible label='Персонажи'>
                    {this.state.characters.map((character) => (
                        character.name && character.name.trim() !== "" && ( // Проверяем, что имя не пустое
                            <CharacterCard
                                items={this.state.items.filter((item) => item.ownerId === character.id)}
                                character={character}
                            />
                        )
                    ))}
                </Collapsible>
            </div>),
        }, {
            label: "Боссы", content: (<div>
                <h1 style={{color: '#fff'}}>Тут будут Боссы, но мы их не сделали</h1>
            </div>),
        }, {
            label: "Нейтральные персонажи", content: (<div>
                <h1 style={{color: '#fff'}}>Тут будут Нейтральные персонажи, но мы их не сделали</h1>
            </div>),
        },];

        return (<div className="App" data-1-color-modes-mode="dark-mode">
            <div className="game-content">
                <TabbedView tabs={tabs}/>
            </div>
        </div>);
    }
}
