import "dotenv/config"
import {ethers} from "ethers"

const infuraUrl = `https://eth-mainnet.g.alchemy.com/v2/${process.env.MAINNET_RPC_URL}`
const provider = new ethers.providers.JsonRpcProvider(infuraUrl)

// Get Current Block Number
console.log("Current block number", await provider.getBlockNumber())

// Get user public address from ENS name
console.log("atg.eth address is:", await provider.resolveName("atg.eth")) 

// Get ENS name from user public address
console.log("0x34aA3F359A9D614239015126635CE7732c18fDF3 is", await provider.lookupAddress("0x34aA3F359A9D614239015126635CE7732c18fDF3"))

// Get Vitalik balance
const vitalikBalance = await provider.getBalance("vitalik.eth")
console.log("vitalik balance is", ethers.utils.formatEther(vitalikBalance))

send 1.5 ETH(toString() is Wei)
console.log("1.5 ETH is", ethers.utils.formatEther(ethers.utils.parseEther("1.5")))

// Vitalik balance more than sanfordstout
const vitalikBalance = await provider.getBalance("vitalik.eth")
const sanfordstoutBalance = await provider.getBalance("sanfordstout.eth")

if (vitalikBalance.gt(sanfordstoutBalance)){
    console.log("vitalikBalance more than sanfordstoutBalance")
} else {
    console.log("sanfordstoutBalance more than vitalikBalance")
}

console.log("vitalik balance has:", ethers.utils.formatEther(vitalikBalance))
console.log("sanfordstout balance has:", ethers.utils.formatEther(sanfordstoutBalance))

// Add some value to sanfordstout, sanfordstout balance more than vitalik
const vitalikBalance = await provider.getBalance("vitalik.eth")
let sanfordstoutBalance = await provider.getBalance("sanfordstout.eth")
sanfordstoutBalance = sanfordstoutBalance.add(ethers.utils.parseEther("5000"))

if (vitalikBalance.gt(sanfordstoutBalance)){
    console.log("vitalikBalance more than sanfordstoutBalance")
} else {
    console.log("sanfordstoutBalance more than vitalikBalance")
}

console.log("vitalik balance has:", ethers.utils.formatEther(vitalikBalance))
console.log("sanfordstout balance has:", ethers.utils.formatEther(sanfordstoutBalance))