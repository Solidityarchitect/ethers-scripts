const hre = require("hardhat")
const { ethers } = require("ethers")

async function main() {
    const contractAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"
    const greeter = await hre.ethers.getContractAt("Greeter", contractAddress)

    console.log("Initial greeting", await greeter.greet())

    console.log("Setting greeting....")
    const setTx = await greeter.setGreeting("Is this working??")

    console.log("setTx sent!")

    await setTx.wait()

    console.log("setTx mined!")

    console.log("New greeting!", await greeter.greet())
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
