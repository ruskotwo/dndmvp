import React, { useState, useEffect } from "react";
import "./CharacterCard.css";
import Collapsible from "../Collapsible/Collapsible";
import ItemCard from "../itemCard/ItemCard";
import AttributeTable from "../attributeTable/AttributeTable";

export default function CharacterCard(props) {
    const [open, setOpen] = useState(false);
    const [notes, setNotes] = useState('');
    const [mounted, setMounted] = useState(false); // Состояние для отслеживания монтирования компонента

    useEffect(() => {
        setMounted(true); // Установка флага монтирования компонента в true при монтировании
        const savedNotes = localStorage.getItem(`playerNotes_${props.character.id}`);
        setNotes(savedNotes || '');

        return () => {
            setMounted(false); // Установка флага монтирования компонента в false при размонтировании
        };
    }, [props.character.id]);

    const toggle = () => {
        setOpen(!open);
    };

    const handleChange = (event) => {
        const value = event.target.value;
        setNotes(value);
        localStorage.setItem(`playerNotes_${props.character.id}`, value);
    };

    if (!mounted) return null; // Если компонент еще не смонтирован, возвращаем null

    return (
        <div className="character-card-container">
            <div onClick={toggle} className="character-card-character">
                <div className="character-card-avatar"/>
                <div className="character-card-title-and-supporting">
                    <div className="title">{props.character.name}</div>
                    <div className="des">{props.character.description}</div>
                </div>
                <img className='Collapsible-chevron' src="/icon/chevron-down20px.svg" alt=""
                     style={{transform: open ? 'rotate(0deg)' : 'rotate(-90deg)'}}/>
            </div>
            <div className="character-card-favorite-icon-stat" style={{display: open ? 'none' : 'flex'}}>
                <div className="stat">
                    <img className="img" alt="Cryptocurrency" src="/icon/cryptocurrency-02.svg"/>
                    <div className="text">{props.character.strength}</div>
                </div>
                <div className="stat">
                    <img className="img" alt="Cryptocurrency" src="/icon/cryptocurrency-01.svg"/>
                    <div className="text">{props.character.dexterity}</div>
                </div>
                <div className="stat">
                    <img className="img" alt="Cryptocurrency" src="/icon/cryptocurrency-00.svg"/>
                    <div className="text">{props.character.intelligence}</div>
                </div>
                <div className="stat">
                    <img className="img" alt="Coins stacked" src="/icon/coins-stacked-02.svg"/>
                    <div className="text">{props.character.gold}</div>
                </div>
                <div className="stat">
                    <img className="img" alt="Coins hand" src="/icon/coins-hand.svg"/>
                    <div className="text">{props.character.metaCoins}</div>
                </div>
                <div className="stat">
                    <img className="img" alt="Shield" src="/icon/shield-01.svg"/>
                    <div className="text">{props.character.armor}</div>
                </div>
                <div className="stat">
                    <img className="img" alt="Heart" src="/icon/heart.svg"/>
                    <div className="text">{props.character.health}</div>
                </div>
            </div>
            <div className="character-card-detailed-information" style={{display: open ? 'block' : 'none'}}>
                <Collapsible key="attributes" label='Атрибуты'>
                    <AttributeTable key="attributeTable" character={props.character}/>
                </Collapsible>
                <Collapsible key="inventory" label='Инвентарь'>
                    {props.items.map(item => <ItemCard key={item.id} item={item}/>)}
                </Collapsible>
                <Collapsible label='Заметки'>
                    <textarea
                        placeholder="Ваши мысли об игроке"
                        className='detailed-information-textatea'
                        value={notes}
                        onChange={handleChange}
                    />
                </Collapsible>
            </div>
        </div>
    );
}
