import React from "react"
import "./SideItem.css"

const SideItem = ({ active, text, onclick }) => {
    return (
        <div onClick={onclick} className={`sidebar-item ${active ? "active-item" : null}`}>
            <p>{ text }</p>
        </div>
    )
}

export default SideItem