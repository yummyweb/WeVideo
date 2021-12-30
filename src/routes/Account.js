import React, { useState } from "react"
import Header from "../components/Header"
import SideItem from "../components/SideItem"
import SidebarContainer from "../components/SidebarContainer"
import Feed from "../components/Feed"
import Following from "../components/Following"
import Stats from "./Stats"
import Profile from "../components/Profile"
import CreateDiscussion from "../components/CreateDiscussion"
import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'
import "./Account.css"
import { useNavigate } from 'react-router-dom';

const Account = ({ data }) => {
    const [currentSection, setCurrentSection] = useState(0)
    const navigate = useNavigate()

    return (
        <SimpleBar style={{ height: "100vh", width: "100vw" }} forceVisible="y" autoHide={false}>
            <Header />
            <div className="account">
                <SidebarContainer>
                    <SideItem active={currentSection === 0} text="For you" onclick={() => { window.location.reload(); setCurrentSection(0)}} />
                    <SideItem active={currentSection === 1} text="Following" onclick={() => setCurrentSection(1)} />
                    <SideItem active={currentSection === 2} text="Create" onclick={() => setCurrentSection(2)} />
                    <SideItem active={currentSection === 3} text="Stats" onclick={() => { window.location.replace("/#/stats") }} />
                    <SideItem active={currentSection === 4} text="Profile" onclick={() => setCurrentSection(4)} />
                </SidebarContainer>
                <div style={{ flex: 1 }}>
                    {currentSection === 0 ? (
                        <Feed />
                    ) : (
                        currentSection === 1 ? (
                            <Following />
                        ) : (
                            currentSection === 2 ? (
                                <CreateDiscussion />
                            ) : (
                                currentSection === 3 ? (
                                    <Stats />
                                ) : (
                                    <Profile />
                                )
                            )
                        )
                    )}
                </div>
            </div>
        </SimpleBar>
    )
}

export default Account