// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "hardhat/console.sol";

contract Project is ERC721 {
  
  uint256 public fundingGoal;
  uint256 public minContribution = 0.01 ether;
  uint256 public totalContributions;
  uint256 public deadline;
  uint256 public badgeCount;
  bool public cancelled = false;
  address public creator;
  mapping(address => uint256) public contributors;
 

  modifier onlyCreator {
    require(msg.sender == creator, "must be project creator");
    _;
  }

  modifier onlyIfActive {
    require(!cancelled && block.timestamp < deadline && totalContributions < fundingGoal, "project is not active");
    _;
  }

  constructor(uint256 _fundingGoal, address _sender) ERC721("Badge", "BDG") {
    creator = _sender;
    fundingGoal = _fundingGoal;
    deadline = block.timestamp + 30 days;
  }

  /// @dev Contribute ETH to a project. Awards badge NFT for each 1 ETH contributed
  function contribute() external payable onlyIfActive {
    require(msg.value >= minContribution, "contribution must be at least 0.01 ETH");
    uint256 totalContributed = contributors[msg.sender] + msg.value;
    contributors[msg.sender] = totalContributed;
    totalContributions += msg.value;
    uint256 numToMint = (totalContributed - (balanceOf(msg.sender) * 1 ether)) / 1 ether;
    awardBadge(msg.sender, numToMint);
  }

  /// @dev Creator can withdraw a number of funds if project meets funding goal
  function withdraw(uint256 _amount) external onlyCreator {
    require (totalContributions >= fundingGoal, "project must be fully funded");
    require(_amount <= address(this).balance, "amount requested for withdrawal must exist in contract");
    (bool success, ) = msg.sender.call{value: _amount}("");
    require(success, "failed to withdraw");
  }

  /// @dev Contributors can get their contribution refunded if project is cancelled or doesn't meet goal
  function refund() external {
    console.log(totalContributions < fundingGoal, block.timestamp >= deadline);
    require((totalContributions < fundingGoal && block.timestamp >= deadline) || cancelled, "project must be failed");
    require(contributors[msg.sender] > 0, "must have existing contribution balance");
    uint256 contribution = contributors[msg.sender];
    contributors[msg.sender] -= contribution;
    (bool success, ) = msg.sender.call{value: contribution}("");
    require(success, "failed to send refund");
  }

  /// @dev Mints a number of badge NFTs for a given contributor
  function awardBadge(address _contributor, uint256 _count) internal {
    for (uint i = 1; i <= _count; i++) {
      uint256 newBadgeId = badgeCount + i;
      _safeMint(_contributor, newBadgeId);
    }
    badgeCount += _count;
  }

  /// @dev Creator can cancel campaign if funding goal isn't met by deadline. This is irreversible.
  function cancel() external onlyCreator onlyIfActive {
    cancelled = true;
  }

  receive() external payable {}
  fallback() external payable {}
}

// need to test for contracts to be able to do all of this? vs. EOA?
// do I need to add my own storage mappings to show NFT work under the hood
// badgecount: initialize in constructor or base storage?
// any pitfalls in using block.timestamp?
// write tests for modifiers or just test 
// is require and state change in middle enough for reentrancy? or need a guard?
// are we graded on our tests?