import {ethers} from "ethers"
import sanfordNFTAbi from "./Abi/sanfordNFTAbi.js"
import { getProvider } from "./utils.js"

const sanfordNFTAdddress = "0x4A5415c12333B84f5BB5a332949327fEdB9b2fA5" 
const sepoliaProvider = getProvider()


const sanfordContract = new ethers.Contract(
    sanfordNFTAdddress,
    sanfordNFTAbi,
    sepoliaProvider
)

const mintPrice = await sanfordContract._price()
console.log("sanford mint price:", ethers.utils.formatEther(mintPrice))