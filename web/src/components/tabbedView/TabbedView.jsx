import React, { useState, useEffect } from "react";
import "./TabbedView.css";

export default function TabbedView(props) {
    const [activeTab, setActiveTab] = useState(0);
    const [mounted, setMounted] = useState(false); // Флаг для отслеживания монтирования компонента

    // Устанавливаем флаг монтирования в true при монтировании компонента
    useEffect(() => {
        setMounted(true);

        // Функция для сброса флага монтирования в false при размонтировании компонента
        return () => {
            setMounted(false);
        };
    }, []);

    const handleTabClick = (index) => {
        setActiveTab(index);
    };

    // Если компонент еще не смонтирован, возвращаем null
    if (!mounted) return null;

    return (
        <div className="tabbed-view">
            <div className="tabbed-view-tabs">
                {props.tabs.map((tab, index) => (
                    <div
                        key={tab.label}
                        className={`tabbed-view-tab ${activeTab === index ? "active" : ""}`}
                        onClick={() => handleTabClick(index)}
                    >
                        {tab.label}
                    </div>
                ))}
            </div>
            <div className="tabbed-view-content">
                {props.tabs[activeTab].content}
            </div>
        </div>
    );
}
