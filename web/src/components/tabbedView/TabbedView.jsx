import React, { useState } from "react";
import "./TabbedView.css";

function TabbedView(props) {
    const [activeTab, setActiveTab] = useState(0);

    const handleTabClick = (index) => {
        setActiveTab(index);
    };

    return (
        <div className="tabbed-view">
            <div className="tabbed-view-tabs">
                {props.tabs.map((tab, index) => (
                    <div
                        key={index}
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

export default TabbedView;
