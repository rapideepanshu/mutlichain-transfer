//SPDX-License-Identifier:none
pragma solidity ^0.8.0;

import "./Bridge.sol";

contract BscBridge is Bridge {
    constructor(address token) Bridge(token) {}
}
