import { ethers } from "ethers"
import "dotenv/config"

// Get a Provider from mainnet or sepolia
const getProvider = (mainnet = false) => {
    const providerUrl = mainnet
    ? `https://eth-mainnet.g.alchemy.com/v2/${process.env.MAINNET_RPC_URL}` 
    : `https://eth-sepolia.g.alchemy.com/v2/${process.env.SEPOLIA_RPC_URL}`

    return new ethers.providers.JsonRpcProvider(providerUrl)
}

// Detect which network
// const provider = getProvider()
// console.log("Provider",await provider.getNetwork())

// Create a new account
const generateNewWallet = () => {
    const wallet = ethers.Wallet.createRandom()

    console.log("wallet address:", wallet.address)
    // console.log("private Key:", wallet.privateKey)
    // console.log("mnemonic:", wallet.mnemonic.phrase)
}
// generateNewWallet()

// Create a signer
const getSigner = (mainnet = false) => {
    const provider = getProvider(mainnet)
    return new ethers.Wallet(process.env.PRIVATE_KEY, provider)
}
// const signer = getSigner()
// console.log("signer", await signer.getAddress())
export { getProvider, generateNewWallet, getSigner }