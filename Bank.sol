// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Transfer {
    event TransferFunds(address indexed from, address indexed to, uint256 amount);

    function transferFunds(address payable recipient) public payable {
        require(msg.value > 0, "Transfer amount must be greater than zero");
        recipient.transfer(msg.value);
        emit TransferFunds(msg.sender, recipient, msg.value);
    }
}