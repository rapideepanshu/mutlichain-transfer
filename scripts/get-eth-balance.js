const { ethers } = require("hardhat");

async function main() {
  const [sender] = await ethers.getSigners();

  const EthToken = await ethers.getContractAt(
    "EthToken",
    "0xA6863f3cd261FCA32ac1f5498233895D90AB8a04"
  );

  const balance = await EthToken.balanceOf(sender.address);
  console.log("balance", balance.toString());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
