const { ethers } = require("hardhat")
const { expect } = require("chai")

describe("Counter Unit Test", function () {
    let Counter, counter
    beforeEach(async () => {
        [signer0, signer1] = await ethers.getSigners()

        Counter = await ethers.getContractFactory("Counter")
        counter = await Counter.deploy(7)
        await counter.deployed()
    })

describe("inc", function () {
    it("Should return the new count once it's changed", async () => {
        expect(await counter.count()).to.equal(7)

        const incTx = await counter.inc()
        await incTx.wait()

        expect(await counter.count()).to.equal(8)
        expect(await counter.boss()).to.equal(signer0.address)

      
    })
describe("dec", function () {
    it("Should revert a error, if the not boss",async () => {
        await expect(counter.connect(signer1).dec()).to.be.reverted
    })
  })

describe("super Inc", function () {
    it("if not the boss, should revert a error", async () => {
        await expect(counter.connect(signer1).superInc()).to.be.reverted
    })
})
    })
})
