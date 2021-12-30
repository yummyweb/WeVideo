import React from "react"
import "./SidebarContainer.css"

const SidebarContainer = ({ children }) => {
    return (
        <div className="sidebar-container">
            { children }
        </div>
    )
}

export default SidebarContainer