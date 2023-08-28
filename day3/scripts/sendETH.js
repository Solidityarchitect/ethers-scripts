const hre = require("hardhat")
const { ethers, BigNumber } = require("ethers")

async function main() {
    const hardhatSigner = (await hre.ethers.getSigners())[18]

    console.log("my address:", hardhatSigner.address)

    const myBalance = await hardhatSigner.getBalance()
    console.log("balance:", ethers.utils.formatEther(myBalance))

    toAddress = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
    console.log("send ETH to", toAddress)

    const sendTx = await hardhatSigner.sendTransaction({
        to: toAddress,
        value: myBalance.div(BigNumber.from(10)),
    })

    console.log("TX SENT", sendTx.hash)

    await sendTx.wait()

    console.log("TX MINED!")

    const endingBalance = await hardhatSigner.getBalance()
    console.log("balance:", ethers.utils.formatEther(endingBalance))
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
