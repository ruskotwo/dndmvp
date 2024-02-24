import React from "react";
import './AttributeTable.css'

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
            imageSrc: "/icon/cryptocurrency-02.svg",
            altText: "Strength",
            statName: "Сила",
            statValue: props.character.strength,
        },
        {
            imageSrc: "/icon/cryptocurrency-01.svg",
            altText: "Ловкость",
            statName: "Ловкость",
            statValue: props.character.dexterity,
        },
        {
            imageSrc: "/icon/cryptocurrency-00.svg",
            altText: "Интелект",
            statName: "Интелект",
            statValue: props.character.intelligence,
        },
        {
            imageSrc: "/icon/user-01.svg",
            altText: "Телосложение",
            statName: "Телосложение",
            statValue: props.character.constitution,
        },
        {
            imageSrc: "/icon/graduation-hat-01.svg",
            altText: "Мудрость",
            statName: "Мудрость",
            statValue: props.character.wisdom,
        },
        {
            imageSrc: "/icon/face-happy.svg",
            altText: "Харизма",
            statName: "Харизма",
            statValue: props.character.charisma,
        },
        {
            imageSrc: "/icon/coins-stacked-02.svg",
            altText: "Золото",
            statName: "Золото",
            statValue: props.character.gold,
        },
        {
            imageSrc: "/icon/coins-hand.svg",
            altText: "Мета монета",
            statName: "Мета монета",
            statValue: props.character.metaCoins,
        },
        {
            imageSrc: "/icon/shield-01.svg",
            altText: "Броня",
            statName: "Броня",
            statValue: props.character.armor,
        },
        {
            imageSrc: "/icon/heart.svg",
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