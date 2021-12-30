import React from "react"
import Header from "../components/Header"
import Main from "../components/Main"

const Landing = ({ user }) => {
    return (
        <div className="App">
            <Header user={user} />
            <Main />
        </div>
    )
}

export default Landing