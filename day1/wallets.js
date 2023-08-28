import { BigNumber, ethers } from "ethers";
import "dotenv/config";

Create a random wallet
const wallet = ethers.Wallet.createRandom();

console.log("address:", wallet.address);
console.log("private Key", wallet.privateKey);
console.log("mnemonic", wallet.mnemonic.phrase);

Create 10 accounts from mnemonic
let path, myWallet;

for (let i = 0; i < 10; i++) {

/* m: 这表示根路径，是整个派生路径的起始点;
   44: 这表示 BIP-44 规范中的带单引号的硬币类型索引，44' 代表以太坊。BIP-44（Bitcoin Improvement Proposal 44）是一个用于确定不同加密货币派生路径的标准规范。
   60: 这表示币种的索引，以太坊在 BIP-44 中的索引为 60
   0: 这表示账户索引，通常用于多账户钱包，0' 表示第一个账户。
   0: 这表示外部地址索引，用于生成钱包的外部地址
   0: 这表示具体的地址索引，0 表示生成的地址的第一个
*/
  path = `m/44'/60'/0'/0/0${i}`;
  myWallet = ethers.Wallet.fromMnemonic(wallet.mnemonic.phrase, path);
  console.log("address:", i, wallet.address);
  console.log("private key:", i, wallet.privateKey);
}

// use a wallet from private key
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY)
console.log("My wallet address(from private key):", wallet.address)

// sign and verify a message
console.log("Is signer?", wallet._isSigner)
const signature = await wallet.signMessage("hello")
console.log("Signed message",signature)

const signerAddress = ethers.utils.verifyMessage("hello", signature)
console.log("signerAddress", signerAddress)
console.log("wallet address", wallet.address)

// connect to sepolia provider and send to atg.eth 0.05 eth
const sepoliaInfuraUrl = `https://eth-sepolia.g.alchemy.com/v2/${process.env.SEPOLIA_RPC_URL}`
const sepoliaProvider = new ethers.providers.JsonRpcProvider(sepoliaInfuraUrl)

const mainnetInfuraUrl = `https://eth-mainnet.g.alchemy.com/v2/${process.env.MAINNET_RPC_URL}`
const mainnetProvider = new ethers.providers.JsonRpcProvider(mainnetInfuraUrl)

const signer = new ethers.Wallet(process.env.PRIVATE_KEY, sepoliaProvider)

const myBalance = await sepoliaProvider.getBalance(signer.address)

console.log("my Balance", ethers.utils.formatEther(myBalance))
console.log("my Address", signer.address)

const atgAddress = await mainnetProvider.resolveName("atg.eth")
console.log("send transaction to", atgAddress)

const sendTx = await signer.sendTransaction({
  to: "atgAddress",
  value: myBalance.div(BigNumber.from(10))
})
console.log("sending...")

await sendTx.wait()

console.log(sendTx)

console.log("block confirmation...")