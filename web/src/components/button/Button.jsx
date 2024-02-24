import React from "react";
import "./Button.css";
import chevronRight from '../../icons/chevron-right24px.svg'

export default function Button() {
    return (
        <button>
            <img src={chevronRight} alt="right"/>
        </button>
    );
}
