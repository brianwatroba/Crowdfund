const { expect } = require("chai");

describe("Project contract", () => {
  let Project;
  let hardhatProject;
  let creator;
  let addr1;
  let addr2;

  beforeEach(async () => {
    Project = await ethers.getContractFactory("Project");
    [creator, addr1, addr2] = await ethers.getSigners();
    hardhatProject = await Project.connect(creator).deploy(1000000);
    await hardhatProject.deployed();
  });

  describe("Deployment", () => {
    it("Should set the right creator", async () => {
      expect(await hardhatProject.creator()).to.equal(creator.address);
    });
  });
});
