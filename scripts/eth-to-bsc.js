const { ethers } = require("hardhat");

async function main() {
  const [addr1] = await ethers.getSigners();
  const ethBridge = await ethers.getContractAt(
    "EthBridge",
    "0x5b40439794f269aCD23755AdAE133Dc6a71b10Fb"
  );
  const test = await ethBridge.burn(addr1.address, 100);
  console.log(test);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
