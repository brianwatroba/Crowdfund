// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "hardhat/console.sol";

contract Project is ERC721 {

  // look into storing them in order to minimize slot use
  mapping(address => uint256) public contributors;
  address public creator;
  uint256 public fundingGoal;
  uint256 public minContribution = 0.01 ether;
  uint256 public totalContributions = 0;
  uint256 public deadline;
  uint256 public badgeCount;
  bool public cancelled = false;
  // add NFT mappings?

  modifier onlyCreator {
    require(msg.sender == creator, "must be project creator");
    _;
  }

  modifier onlyIfActive {
    require(!cancelled && block.timestamp < deadline && totalContributions < fundingGoal, "project is not live");
    _;
    //timestamp issue, front running
  }

  constructor(uint256 _fundingGoal, address _sender) ERC721("Badge", "BDG") {
    creator = _sender;
    fundingGoal = _fundingGoal;
    deadline = block.timestamp + 30 days;
    badgeCount = 0; // do this in contructor or in base storage?
  }

  function contribute() external payable onlyIfActive {
    require(msg.value >= minContribution, "contribution must be at least 0.01 ETH");
    uint256 totalContributed = contributors[msg.sender] + msg.value; // need safemath
    contributors[msg.sender] = totalContributed;
    totalContributions += msg.value; // need safemath
    uint256 numToMint = (totalContributed - (balanceOf(msg.sender) * 1 ether)) / 1 ether;
    awardBadge(msg.sender, numToMint);
  }

  function withdraw(uint256 _amount) external onlyCreator {
    require (totalContributions >= fundingGoal, "project must be fully funded");
    require(_amount <= address(this).balance, "amount requested for withdrawal must exist in contract"); // is this check built into call?
    (bool success, ) = msg.sender.call{value: _amount}("");
    require(success, "failed to withdraw");
  }

  function refund() external {
    require((totalContributions < fundingGoal && block.timestamp >= deadline) || cancelled, "project must be over");
    require(contributors[msg.sender] > 0, "must have existing contribution balance");
    uint256 contribution = contributors[msg.sender];
    contributors[msg.sender] -= contribution; // need safemath
    (bool success, ) = msg.sender.call{value: contribution}("");
    require(success, "failed to send refund");
  }

  function awardBadge(address _contributor, uint256 _count) internal {
    for (uint i = 1; i <= _count; i++) {
      uint256 newBadgeId = badgeCount + i;
      _safeMint(_contributor, newBadgeId);
    }
    badgeCount += _count;
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
// need to test for contracts to be able to do all of this? vs. EOA?