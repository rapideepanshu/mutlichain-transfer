//SPDX-License-Identifier:none
pragma solidity ^0.8.0;

import "./Token.sol";

contract EthToken is Token {
    constructor() Token("ETH Token", "ETK") {}
}
