const hre = require("hardhat")
const { ethers } = require("ethers")

async function main() {
    const signer = (await hre.ethers.getSigners())[0]

    const mybalance = await signer.getBalance()

    console.log("My balance", ethers.utils.formatEther(mybalance))
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
