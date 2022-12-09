const { ethers } = require("hardhat");

async function main() {
  const [sender] = await ethers.getSigners();

  const BscToken = await ethers.getContractAt(
    "BscToken",
    "0x9e4D05E88F138C69715c7157A50ff77377B1F08D"
  );

  const balance = await BscToken.balanceOf(sender.address);
  console.log("balance", balance.toString());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

//   bsc token 0x9e4D05E88F138C69715c7157A50ff77377B1F08D
// bsc bridge 0x85f2FAF964ef3D94501bb15c11fcb30420ee15e7

// eth token 0xA6863f3cd261FCA32ac1f5498233895D90AB8a04
// eth bridge 0x5b40439794f269aCD23755AdAE133Dc6a71b10Fb
