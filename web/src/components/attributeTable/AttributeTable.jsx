import React, { useState } from "react";
import './AttributeTable.css'
import iconStrength from '../../icons/cryptocurrency-02.svg'
import iconDexterity from '../../icons/cryptocurrency-01.svg'
import iconIntelligence from '../../icons/cryptocurrency-00.svg'
import iconConstitution from '../../icons/user-01.svg'
import iconWisdom from '../../icons/graduation-hat-01.svg'
import iconCharisma from '../../icons/face-happy.svg'
import iconGold from '../../icons/coins-stacked-02.svg'
import iconMetaCoins from '../../icons/coins-hand.svg'
import iconArmor from '../../icons/shield-01.svg'
import iconHealth from '../../icons/heart.svg'

const StatItem = ({ imageSrc, altText, statName, statValue, onClick, isSelected }) => (
    <div className={`stat-item ${isSelected ? 'selected' : ''}`} onClick={onClick}>
        <div className="stat-icon-text">
            <img loading="lazy" src={imageSrc} alt={altText} className="stat-icon" />
            <div className="stat-name">{statName}</div>
        </div>
        <div className="stat-value">{statValue}</div>
    </div>
);

const CharacterStats = (props) => {
    const [selectedItem, setSelectedItem] = useState(null);

    const stats = [
        {
            imageSrc: iconStrength,
            altText: "Strength",
            statName: "Сила",
            statValue: props.character.strength,
        },
        {
            imageSrc: iconDexterity,
            altText: "Dexterity",
            statName: "Ловкость",
            statValue: props.character.dexterity,
        },
        {
            imageSrc: iconIntelligence,
            altText: "Intelligence",
            statName: "Интелект",
            statValue: props.character.intelligence,
        },
        {
            imageSrc: iconConstitution,
            altText: "Constitution",
            statName: "Телосложение",
            statValue: props.character.constitution,
        },
        {
            imageSrc: iconWisdom,
            altText: "Wisdom",
            statName: "Мудрость",
            statValue: props.character.wisdom,
        },
        {
            imageSrc: iconCharisma,
            altText: "Charisma",
            statName: "Харизма",
            statValue: props.character.charisma,
        },
        {
            imageSrc: iconGold,
            altText: "Gold",
            statName: "Золото",
            statValue: props.character.gold,
        },
        {
            imageSrc: iconMetaCoins,
            altText: "Meta Coins",
            statName: "Мета монета",
            statValue: props.character.metaCoins,
        },
        {
            imageSrc: iconArmor,
            altText: "Armor",
            statName: "Броня",
            statValue: props.character.armor,
        },
        {
            imageSrc: iconHealth,
            altText: "Health",
            statName: "Хп",
            statValue: props.character.health,
        },
    ];

    return (
        <div className='AttributeTable'>
            {stats.map(({ imageSrc, altText, statName, statValue }) => (
                <StatItem
                    key={statName}
                    imageSrc={imageSrc}
                    altText={altText}
                    statName={statName}
                    statValue={statValue}
                    onClick={() => setSelectedItem(statName)}
                    isSelected={selectedItem === statName}
                />
            ))}
        </div>
    );
};

export default CharacterStats;
