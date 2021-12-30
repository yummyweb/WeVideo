import React, { Component } from "react";
import { HashRouter, Route, Routes } from "react-router-dom"
import Landing from "./routes/Landing"
import Account from "./routes/Account"
import Web3 from "web3"
import { useEffect, useState } from "react"
import Contract from "./abis/Contract.json"
import NFT from "./abis/NFT.json"
import "./App.css";
import Stats from "./routes/Stats";

function App() {
  const [videos, setVideos] = useState([])
  const [account, setAccount] = useState("0x0")

  return (
    <HashRouter>
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/account" element={<Account />} />
        <Route exact path="/stats" element={<Stats />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
