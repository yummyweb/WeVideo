import { ethers } from 'ethers'

import NFT from '../deployments/metis/NFT.json'

export default function NFTInstance(signer) {
  return new ethers.Contract(NFT.address, NFT.abi, signer)
}
