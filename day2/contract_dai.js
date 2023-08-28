import { ethers } from "ethers"
import { getProvider, getSigner } from "./utils.js"
import daiAbi from "./Abi/daiAbi.js"

const sepoliaProvider = getProvider()
const sepoliaSigner = getSigner()
const mainnetProvider = getProvider(true)

const daiAddress = "0x68194a729C2450ad26072b3D33ADaCbcef39D574"
const myAddress = "0xF44D52cB8F23dd403B2188b825E387B563F182ef"

const daiContractRead = new ethers.Contract(
    daiAddress,
    daiAbi,
    sepoliaProvider
)

const daiContractWrite = new ethers.Contract(
    daiAddress,
    daiAbi,
    sepoliaSigner
)

const myBalance = await daiContractRead.balanceOf(myAddress)
console.log("my balance:", ethers.utils.formatEther(myBalance))

const atgAddress = await mainnetProvider.resolveName("atg.eth")
console.log("Send DAI to ", atgAddress)

const transferTx = await daiContractWrite.transfer(atgAddress, ethers.utils.parseEther("3"))
console.log("TX SENT!", transferTx.hash)

await transferTx.wait()

console.log("TX MINED!")

const endingBalance = await daiContractRead.balanceOf(myAddress)
console.log("Ending Balance is:", ethers.utils.formatEther(endingBalance))