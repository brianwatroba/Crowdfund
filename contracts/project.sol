// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

contract Project {
  // look into storing them in order to minimize slot use
  mapping(address => uint256) public contributors;
  address public creator;
  uint256 public fundingGoal;
  uint256 public minContribution = 0.01 ether;
  uint256 public totalContributions = 0;
  uint256 public deadline;
  bool public cancelled = false;
  // add NFT mappings?

  modifier onlyCreator {
    require(msg.sender == creator);
    _;
  }

  modifier onlyIfActive {
    require(!cancelled && block.timestamp < deadline && totalContributions < fundingGoal);
    _;
    //timestamp issue, front running
  }

  constructor(uint256 _fundingGoal, address _sender) {
    creator = _sender;
    fundingGoal = _fundingGoal;
    deadline = block.timestamp + 30 days;
  }

  function contribute(uint256 _amount) external payable onlyIfActive {
    require(msg.value >= minContribution, "contribution must be at least 0.01 ETH");
    uint256 totalContributed = contributors[msg.sender] + _amount; // need safemath
    contributors[msg.sender] = totalContributed;
    // check if total contributed matches correct number of NFTs, if not, give NFTs
  }

  function withdraw(uint256 _amount) external onlyCreator {
    require (totalContributions >= fundingGoal);
    require(_amount <= address(this).balance); // is this check built into call?
    (bool success, ) = msg.sender.call{value: _amount}("");
    require(success, "failed to withdraw");
  }

  function refund() external {
    require((totalContributions < fundingGoal && block.timestamp >= deadline) || cancelled);
    require(contributors[msg.sender] > 0);
    uint256 contribution = contributors[msg.sender];
    contributors[msg.sender] -= contribution; // need safemath
    (bool success, ) = msg.sender.call{value: contribution}("");
    require(success, "failed to send refund");
  }

  function cancel() external onlyCreator onlyIfActive {
    cancelled = true;
  }

  receive() external payable {}
  fallback() external payable {}
}

// be weary of very big numbers, need a way to catch them
// which uint should we use?
// pure internal function for seeing if time up? guard against front running
