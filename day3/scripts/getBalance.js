const hre = require("ethers")
const { ethers } = require("ethers")

async function main() {
    const providerUrl = "http://127.0.0.1:8545/"
    const localProvider = new ethers.providers.JsonRpcProvider(providerUrl)

    const account0Address = "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199"

    const myBalance = await localProvider.getBalance(account0Address)
    console.log("balance:", ethers.utils.formatEther(myBalance))
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
