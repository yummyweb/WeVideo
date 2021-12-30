import React from "react"
import Gravatar from "react-gravatar"
import { useWeb3Context } from "../contexts/Web3ContextProvider"
import "./Profile.css"

const Profile = () => {
    const { address } = useWeb3Context()

    return (
        <div className="profile">
            <Gravatar email={address} className="profile-avatar" />
            <h2>{ address }</h2>
        </div>
    )
}

export default Profile