import { getProvider, getSigner } from "./utils.js"
import { ethers, BigNumber } from "ethers"

const mainnetProvider = getProvider(true)
const sepoliaSigner = getSigner()

const myBalance = await sepoliaSigner.getBalance()
console.log("my balance", ethers.utils.formatEther(myBalance))
console.log("my address", sepoliaSigner.address)

const sanfordstoutAddress = await mainnetProvider.resolveName("sanfordstout.eth")
console.log("Send ETH to", sanfordstoutAddress)

const sendTx = await sepoliaSigner.sendTransaction({
    to: sanfordstoutAddress,
    value: myBalance.div(BigNumber.from(10))
})
console.log("Sending...", sendTx.hash)

await sendTx.wait()
 
console.log("block confirmation")

console.log("MINED!")

