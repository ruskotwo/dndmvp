import React, { useRef, useState, useEffect } from "react";
import "./Collapsible.css";

export default function Collapsible(props) {
    const [open, setOpen] = useState(false);
    const contentRef = useRef();
    const [mounted, setMounted] = useState(false); // Состояние для отслеживания монтирования компонента

    useEffect(() => {
        setMounted(true); // Установка флага монтирования компонента в true при монтировании

        return () => {
            setMounted(false); // Установка флага монтирования компонента в false при размонтировании
        };
    }, []);

    const toggle = () => {
        setOpen(!open);
    };

    if (!mounted) return null; // Если компонент еще не смонтирован, возвращаем null

    return (
        <div className='Collapsible-container'>
            <div onClick={toggle} className="collapsible-title">
                <div className="Collapsible-text">{props.label}</div>
                <img className='Collapsible-chevron' src="/icon/chevron-down20px.svg" alt=""
                     style={{transform: open ? 'rotate(-90deg)' : 'rotate(0deg)'}}/>
            </div>

            <div className="Collapsible-content-parent" ref={contentRef}
                 style={{height: !open ? `auto` : "0px", overflow: "hidden",}}>
                <div className='Collapsible-content-CharacterCard'>
                    {props.children}
                </div>
            </div>
        </div>
    );
}
