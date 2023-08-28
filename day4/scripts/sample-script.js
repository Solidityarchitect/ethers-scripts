const hre = require("hardhat");
const { ethers } = require("hardhat");

exports.module = async () => {
  const Counter = await ethers.getContractFactory("Counter");
  const counter = Counter.deploy();
  await counter.deployed();

  const incTx = await counter.inc();
  await incTx.wait();
};
