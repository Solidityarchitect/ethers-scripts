import {ethers} from "ethers"
import sanfordNFTAbi from "./Abi/sanfordNFTAbi.js"
import {getSigner} from "./utils.js"

const sanfordAddress = "0x4A5415c12333B84f5BB5a332949327fEdB9b2fA5"
const sepoliaSigner = getSigner()

const sanfordContract = new ethers.Contract(
    sanfordAddress,
    sanfordNFTAbi,
    sepoliaSigner
)

console.log("mint price is:", ethers.utils.formatEther(await sanfordContract._price()))

const mintPrce = ethers.utils.parseEther("0.01")

const calldata = "0x1249c58b"

const mintTx = await sepoliaSigner.sendTransaction({
    to: sanfordAddress,
    value: mintPrce,
    data: calldata,
    nonce: 2,
    gasPrice: 10000000000
})
    
console.log("Tx sent", mintTx.hash)
await mintTx.wait()
    
    // 当你发送一个交易时，你设置的 gas 限制是这个交易可以使用的最大 gas 数量。
    // 如果你设置的 gas 限制超过了当前区块的 gas 限制，那么矿工就无法将你的交易打包进区块，因为这会导致区块的 gas 用量超过限制。
    // 这就是为什么你的交易会因为 "exceeds block gas limit" 而失败。
    // 主网上大约是 15,000,000 gas