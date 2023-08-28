import {ethers} from "ethers"
import {getProvider, getSigner} from "./utils.js"

const mainnetProvider = getProvider(true)
const mainnetSigner = getSigner(true)

const myBalance = await mainnetSigner.getBalance()

console.log("my balance:", ethers.utils.formatEther(myBalance))
console.log("my address:", mainnetSigner.address)