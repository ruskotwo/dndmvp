import React from "react";
import "./CharacterCard.css";
import Button from '../button/Button'

export default function CharacterCard() {
    return (
        <div className="character-card" data-1-color-modes-mode="dark-mode">
            <div className="cards-content">
                <div className="avatar" />
                <div className="content">
                    <div className="title-and-supporting">
                        <div className="title">Бромир Дрифтспор</div>
                        <div className="des">Руслан</div>
                    </div>
                </div>
                <Button />
            </div>
            <div className="favorite-icon-stat">
                <div className="div">
                    <img className="img" alt="Cryptocurrency" src="/icon/cryptocurrency-02.svg" />
                    <div className="text">8</div>
                </div>
                <div className="div">
                    <img className="img" alt="Cryptocurrency" src="/icon/cryptocurrency-01.svg" />
                    <div className="text">-5</div>
                </div>
                <div className="div">
                    <img className="img" alt="Cryptocurrency" src="/icon/cryptocurrency-00.svg" />
                    <div className="text">8</div>
                </div>
                <div className="div">
                    <img className="img" alt="Coins stacked" src="/icon/coins-stacked-02.svg" />
                    <div className="text">0</div>
                </div>
                <div className="div">
                    <img className="img" alt="Coins hand" src="/icon/coins-hand.svg" />
                    <div className="text">2</div>
                </div>
                <div className="div">
                    <img className="img" alt="Shield" src="/icon/shield-01.svg" />
                    <div className="text">25</div>
                </div>
                <div className="div">
                    <img className="img" alt="Heart" src="/icon/heart.svg" />
                    <div className="text">34</div>
                </div>
            </div>
        </div>
    );
}
