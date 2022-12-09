const { ethers } = require("hardhat");

async function main() {
  const BscToken = await ethers.getContractFactory("BscToken");
  const bscToken = await BscToken.deploy();
  await bscToken.deployed();
  console.log("bsc token", bscToken.address);
  const BscBridge = await ethers.getContractFactory("BscBridge");
  const bscBridge = await BscBridge.deploy(bscToken.address);
  await bscBridge.deployed();
  await bscToken.transferOwnership(bscBridge.address);
  console.log("bsc bridge", bscBridge.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
