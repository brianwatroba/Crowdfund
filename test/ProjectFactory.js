const { expect } = require("chai");
const BN = ethers.BigNumber;

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
    fundingGoal = 10000;

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
    it("Saves contribution amount", async () => {
      const hash = await hardhatProject
        .connect(addr1)
        .contribute({ value: ethers.utils.parseUnits("0.01", "ether") });
    });
    // base functionality
    // amount gets added to mapping for the user
    // they get an NFT, show up in NFT mapping array
    // it("Must contribute at least 0.01 ETH", async () => {
    //   await expect(
    //     hardhatProject.connect(addr1).contribute(10)
    //   ).to.be.revertedWith("contribution must be at least 0.01 ETH");
    // });
    // it("Can contribute if you're the creator", async () => {});
  });
});
