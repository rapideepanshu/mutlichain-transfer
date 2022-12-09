//SPDX-License-Identifier:none
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

interface IToken {
    function mint(address to, uint amount) external;

    function burn(address owner, uint amount) external;
}

contract Bridge is Ownable {
    IToken public token;
    uint public nonce;
    mapping(uint => bool) public processedNonces;

    enum Step {
        Burn,
        Mint
    }
    event Transfer(
        address from,
        address to,
        uint amount,
        uint date,
        uint nonce,
        Step indexed step
    );

    constructor(address _token) {
        token = IToken(_token);
    }

    function burn(address to, uint amount) external onlyOwner {
        emit Transfer(
            msg.sender,
            to,
            amount,
            block.timestamp,
            nonce,
            Step.Burn
        );
        nonce++;
    }

    function mint(
        address to,
        uint amount,
        uint otherChainNonce
    ) external onlyOwner {
        require(
            processedNonces[otherChainNonce] == false,
            "transfer already processed"
        );
        processedNonces[otherChainNonce] = true;
        token.mint(to, amount);
        emit Transfer(
            msg.sender,
            to,
            amount,
            block.timestamp,
            otherChainNonce,
            Step.Mint
        );
    }
}
