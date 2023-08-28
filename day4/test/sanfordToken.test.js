const {expect} = require("chai")
const {ethers} = require("hardhat")

describe("sanfordToken Unit Test", function() {
    let sanfordToken
    beforeEach(async () => {
        [signer0, signer1] = await ethers.getSigners()
        const SanfordToken = await ethers.getContractFactory("SanfordToken")
        sanfordToken = await SanfordToken.deploy()
        await sanfordToken.deployed()
    })

describe("create function", function () {
    it("Should able to create tokens", async () => {
        const createTx = await sanfordToken.create(100)
        await createTx.wait()
        expect(await sanfordToken.totalCreated()).to.equal(100)
    })

    it("Should revert if creating more than total supply", async () => {
        const totalSupply = await sanfordToken.s_totalSupply()
        await expect(sanfordToken.create(totalSupply.add(100))).to.be.reverted
    })

    it("Should revert if non-boss creat", async () => {
        await expect(sanfordToken.connect(signer1).create(100)).to.be.reverted
    })
})

describe("sned function", function () {
    it("Should be able send tokens", async () => {
        const createTx = await sanfordToken.create(100)
        await createTx.wait()

        const sendTx = await sanfordToken.send(signer1.address, 25)
        await sendTx.wait()

        expect(await sanfordToken.balances(signer0.address)).to.equal(75)
        expect(await sanfordToken.balances(signer1.address)).to.equal(25)
    })
})

describe("buy function", function () {
    it("Should allow a rando to buy some tokens", async () => {
        const createTx = await sanfordToken.connect(signer0).create(100)
        await createTx.wait()

        const PRICE = await sanfordToken.CREATION_PRICE()

        const buyTx = await sanfordToken.connect(signer1).buy({value: PRICE})
        await buyTx.wait()
        expect(await sanfordToken.balances(signer1.address)).to.equal(1)
    })

    it("Should emit if rando buy some tokens", async () => {
        const createTx = await sanfordToken.create(100)
        await createTx.wait()

        const PRICE = await sanfordToken.CREATION_PRICE()

        expect(await sanfordToken.connect(signer1).buy({value: PRICE})).to.emit("Buy")
    })
})

describe("withdraw", function () {
    it("Should revert non-boss withdraw money", async () => {
        const createTx = await sanfordToken.connect(signer0).create(100)
        await createTx.wait()

        const PRICE = await sanfordToken.CREATION_PRICE()

        const buyTx = await sanfordToken.connect(signer1).buy({value: PRICE})
        await buyTx.wait()

        await expect(sanfordToken.connect(signer1).withdraw()).to.be.reverted
    })

    it("only owner can withdraw moeny", async () => {
        const createTx = await sanfordToken.connect(signer0).create(100)
        await createTx.wait()

        const PRICE = await sanfordToken.CREATION_PRICE()

        const buyTx = await sanfordToken.connect(signer1).buy({value: PRICE})
        await buyTx.wait()

        const contractBalance = await ethers.provider.getBalance(sanfordToken.address)
        console.log("address balance:", ethers.utils.formatEther(contractBalance))
        
        const withdrawTx = await sanfordToken.connect(signer0).withdraw()
        await withdrawTx.wait()

        const newContractBalance = await ethers.provider.getBalance(sanfordToken.address)
        console.log("new address balance:", ethers.utils.formatEther(newContractBalance)) 
        
        expect(newContractBalance).to.equal(0)
    })
})
})