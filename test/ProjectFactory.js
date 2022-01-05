const chai = require("chai");
const { expect } = chai;
const { solidity } = require("ethereum-waffle");
chai.use(solidity);

describe("Project contract", () => {
  let contractFactory;
  let ProjectFactory;
  let Project;
  let ProjectAddress;
  let hardhatProject;
  let creator;
  let addr1;
  let addr2;
  let fundingGoal;

  beforeEach(async () => {
    contractFactory = await ethers.getContractFactory("ProjectFactory");
    ProjectFactory = await contractFactory.deploy();
    await ProjectFactory.deployed();

    [creator, addr1, addr2] = await ethers.getSigners();
    fundingGoal = 1000000;

    Project = await ProjectFactory.connect(creator).createProject(fundingGoal);
    ProjectAddress = ProjectFactory.deployedProjects(0);
    hardhatProject = await ethers.getContractAt("Project", ProjectAddress);
  });

  describe("Deployment", () => {
    it("Should set the right creator", async () => {
      expect(await hardhatProject.creator()).to.equal(creator.address);
    });
  });

  describe("contribute()", () => {
    it("Must contribute at least 0.01 ETH", async () => {
      await expect(
        hardhatProject.connect(addr1).contribute(10)
      ).to.be.revertedWith("contribution must be at least 0.01 ETH");
      await expect(
        hardhatProject.connect(addr1).contribute(10)
      ).to.be.revertedWith("contribution must be at least 0.01 ETH");
    });
  });
});
