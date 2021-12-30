// async function loadWeb3() {
  //   if (window.ethereum) {
  //     window.web3 = new Web3(window.ethereum)
  //     await window.ethereum.enable()
  //   }
  //   else if (window.web3) {
  //     window.web3 = new Web3(window.web3.currentProvider)
  //   }
  //   else {
  //     window.alert("Non-Ethereum browser detected. You should consider trying MetaMask!")
  //   }
  // }

  // async function loadBlockchainData() {
  //   const web3 = window.web3
  //   const accounts = await web3.eth.getAccounts()
  //   setAccount(accounts[0])

  //   const networkId = await web3.eth.net.getId()
  //   const networkData = Contract.networks[networkId]
  //   const networkDataNFT = NFT.networks[networkId]

  //   if (networkData) {
  //     const contract = new web3.eth.Contract(Contract.abi, networkData.address)
  //     const nft = new web3.eth.Contract(NFT.abi, networkDataNFT.address)
  //     setContract(contract)
  //     setNFT(nft)

  //     const videoCount = await contract.methods.videoCount().call()
  //     for (let i = videoCount; i >= 1; i--) {
  //       const video = await contract.methods.videos(i).call()
  //       setVideos(_videos => [..._videos, video])
  //     }
  //   }
  //   else {
  //     alert("The contract is not deployed to detected network.")
  //   }
  // }

  // useEffect(() => {
  //   loadWeb3()
  //   loadBlockchainData()
  // }, [])