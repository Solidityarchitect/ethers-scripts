import {ethers} from "ethers"
import sanfordNFTAbi from "./Abi/sanfordNFTAbi.js"
import {getSigner} from "./utils.js"

const sepoliaSigner = getSigner()
const sanfordAddress = "0x4A5415c12333B84f5BB5a332949327fEdB9b2fA5"

const sanfordContract = new ethers.Contract(
    sanfordAddress,
    sanfordNFTAbi,
    sepoliaSigner
)

console.log("Minting...")
const mintPrice = await sanfordContract._price()
console.log("mint price is:", ethers.utils.formatEther(mintPrice))

const mintTx = await sanfordContract.mint({
    value: mintPrice
})

console.log("Tx send", mintTx.hash)

await mintTx.wait()