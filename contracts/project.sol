// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

contract Project {
  // look into storing them in order to minimize slot use
  address public creator;
  uint256 public fundingGoal;
  uint256 public endTime;
  bool public cancelled = false;

  constructor(uint256 _fundingGoal) {
    creator = msg.sender;
    fundingGoal = _fundingGoal;
    endTime = block.timestamp + 30 days;
  }

}