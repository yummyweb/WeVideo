import React, { createContext, useContext, useState, useEffect } from 'react'

import { useWeb3Context } from './Web3ContextProvider';
import ContractInstance from '../contracts/Contract'
import NFTInstance from '../contracts/NFT'

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { provider, signer } = useWeb3Context()
  const [contract, setContract] = useState(null)
  const [nft, setNFT] = useState(null)
  const [readOnlyContract, setReadOnlyContract] = useState(null)
  const [loading, setLoading] = useState(false)
  const [videos, setVideos] = useState([])

  useEffect(async () => {
    if (!provider) {
      return
    }

    setContract(ContractInstance(signer))
    setNFT(NFTInstance(signer || provider))
    setReadOnlyContract(ContractInstance(provider))
  }, [provider, signer])

  const getVideos = async () => {
      setLoading(true)
      const videoCount = await readOnlyContract.videoCount()
      for (let i = videoCount; i >= 1; i--) {
        readOnlyContract.videos(i)
        .then(video => {
          setVideos(_videos => [..._videos, video])
        })
      }
      setLoading(false)
  }

  const uploadVideo = async (hash, title, issue) => {
    setLoading(true)
    await contract.uploadVideo(hash, title, issue)
    setLoading(false)
  }

  return (
    <StateContext.Provider
      value={{
        videos,
        getVideos,
        loading,
        contract,
        uploadVideo,
        readOnlyContract,
        setVideos,
        nft
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
