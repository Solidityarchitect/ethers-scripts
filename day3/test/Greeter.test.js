const { expect } = require("chai")
const { ethers } = require("hardhat")

describe("Greeter Unit Test", function () {
    let Greeter, greeter
    beforeEach(async () => {
        Greeter = await ethers.getContractFactory("Greeter")
        greeter = await Greeter.deploy("Hellow World")
        await greeter.deployed()
    })

describe("Greeter", function () {
    it("Should revert if the contract is not unlocked", async () => {
        await expect(greeter.setGreeting("hala, mundo!")).to.be.reverted
    })

    it("Should return the new greeting once it's changed (and it's unlocked)", async () => {
        expect(await greeter.greet()).to.equal("Hellow World")

        const unlockTx = await greeter.toggleUnlocked()
        await unlockTx.wait()

        const setGreetingTx = await greeter.setGreeting("halo, mundo!")
        
        expect(await greeter.greet()).to.equal("halo, mundo!")
    })
    })
})
