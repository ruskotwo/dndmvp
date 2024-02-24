import React from "react";
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

const StatItem = ({ imageSrc, altText, statName, statValue }) => (
    <div className="stat-item">
        <div className="stat-icon-text">
            <img loading="lazy" src={imageSrc} alt={altText} className="stat-icon" />
            <div className="stat-name">{statName}</div>
        </div>
        <div className="stat-value">{statValue}</div>
    </div>
);

const CharacterStats = (props) => {
    const stats = [
        {
            imageSrc: iconStrength,
            altText: "Strength",
            statName: "Сила",
            statValue: props.character.strength,
        },
        {
            imageSrc: iconStrength,
            altText: "Ловкость",
            statName: "Ловкость",
            statValue: props.character.dexterity,
        },
        {
            imageSrc: iconIntelligence,
            altText: "Интелект",
            statName: "Интелект",
            statValue: props.character.intelligence,
        },
        {
            imageSrc: iconConstitution,
            altText: "Телосложение",
            statName: "Телосложение",
            statValue: props.character.constitution,
        },
        {
            imageSrc: iconWisdom,
            altText: "Мудрость",
            statName: "Мудрость",
            statValue: props.character.wisdom,
        },
        {
            imageSrc: iconCharisma,
            altText: "Харизма",
            statName: "Харизма",
            statValue: props.character.charisma,
        },
        {
            imageSrc: iconGold,
            altText: "Золото",
            statName: "Золото",
            statValue: props.character.gold,
        },
        {
            imageSrc: iconMetaCoins,
            altText: "Мета монета",
            statName: "Мета монета",
            statValue: props.character.metaCoins,
        },
        {
            imageSrc: iconArmor,
            altText: "Броня",
            statName: "Броня",
            statValue: props.character.armor,
        },
        {
            imageSrc: iconHealth,
            altText: "Хп",
            statName: "Хп",
            statValue: props.character.health,
        },
        // Add other stats following the same structure
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
                />
            ))}
        </div>
    );
};

export default CharacterStats;