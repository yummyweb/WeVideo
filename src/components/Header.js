import React from "react"
import "./Header.css"
import { Link } from "react-router-dom"
import { useWeb3Context } from "../contexts/Web3ContextProvider"

const Header = () => {
    const { loadWeb3Modal, logoutOfWeb3Modal, address } = useWeb3Context()

    return (
        <div class="header">
            <img src="/logo.png" />
            <Link to="/account" className="header-link">Feed</Link>
            {address ? <a onClick={logoutOfWeb3Modal} className="header-link">Logout</a> : <a onClick={loadWeb3Modal} className="header-link">Login</a>}
        </div>
    )
}

export default Header