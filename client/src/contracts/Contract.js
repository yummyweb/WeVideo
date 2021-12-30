import { ethers } from 'ethers'

import Contract from '../deployments/metis/Contract.json'

export default function ContractInstance(signer) {
  return new ethers.Contract(Contract.address, Contract.abi, signer)
}
