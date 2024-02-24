import React from 'react';
import './ItemCard.css';

export default function ItemCard(props) {
    return (
        <article className="item-card">
            <header className="item-header">
                <h3 className="item-name">{props.item.name}</h3>
                <p className="item-count">x{props.item.count}</p>
            </header>
            <p className="item-description">{props.item.desc}</p>
        </article>
    );
}