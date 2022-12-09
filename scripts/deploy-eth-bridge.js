const { ethers } = require("hardhat");

async function main() {
  const [addr1] = await ethers.getSigners();

  const EthToken = await ethers.getContractFactory("EthToken");
  const ethToken = await EthToken.deploy();
  await ethToken.deployed();
  console.log("eth token", ethToken.address);

  await ethToken.mint(addr1.address, 500);

  const EthBridge = await ethers.getContractFactory("EthBridge");
  const ethBridge = await EthBridge.deploy(ethToken.address);
  await ethBridge.deployed();

  await ethToken.transferOwnership(ethBridge.address);
  console.log("eth bridge", ethBridge.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
