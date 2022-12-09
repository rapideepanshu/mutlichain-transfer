//SPDX-License-Identifier:none
pragma solidity ^0.8.0;

import "./Token.sol";

contract BscToken is Token {
    constructor() Token("BSC Token", "BTK") {}
}
