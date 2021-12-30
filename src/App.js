import React, { Component } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom"
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
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/account" element={<Account />} />
        <Route path="/stats" element={<Stats />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
