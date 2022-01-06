// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "./Project.sol";
import "hardhat/console.sol";

contract ProjectFactory {
  
  address[] public deployedProjects;

  function createProject(uint256 _fundingGoal) external {
    address newProject = address(new Project(_fundingGoal, msg.sender));
    deployedProjects.push(newProject);
  }
 
  receive() external payable {}
  fallback() external payable {}
}
