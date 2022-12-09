const { ethers } = require("hardhat");
const EthBridge = require("./artifacts/contracts/EthBridge.sol/EthBridge.json");
const BscBridge = require("./artifacts/contracts/BscBridge.sol/BscBridge.json");

require("dotenv").config();

const eth_provider = new ethers.providers.InfuraProvider(
  "goerli",
  "391511e84300430abbe0b3b240b16a0f"
);

const bsc_provider = new ethers.providers.JsonRpcProvider(
  `${process.env.BSC_URL}`
);

const signer = new ethers.Wallet(`${process.env.PRIVATE_KEY}`, bsc_provider);

const eth_bridge = new ethers.Contract(
  "0x5b40439794f269aCD23755AdAE133Dc6a71b10Fb",
  EthBridge.abi,
  eth_provider
);

const bsc_bridge = new ethers.Contract(
  "0x85f2FAF964ef3D94501bb15c11fcb30420ee15e7",
  BscBridge.abi,
  bsc_provider
);

eth_bridge.on(
  "Transfer",
  async (sender, recepient, amount, timestamp, nonce, status) => {
    const tx = await bsc_bridge.connect(signer).mint(recepient, amount, nonce);
    const gasPrice = await bsc_provider.getGasPrice();
    const gasCost = await bsc_provider.estimateGas(tx.data);
    const data = new ethers.utils.AbiCoder(tx);

    const txData = {
      from: signer,
      to: bsc_bridge.address,
      data,
      gas: gasCost,
      gasPrice,
    };
    const receipt = await bsc_provider.sendTransaction(txData);
    console.log(`Transaction hash: ${receipt.transactionHash}`);
  }
);
