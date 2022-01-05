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
    fundingGoal = ethers.utils.parseUnits("10", "ether");

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
    it("Saves new contribution amount", async () => {
      await hardhatProject
        .connect(addr1)
        .contribute({ value: ethers.utils.parseUnits("0.01", "ether") });
      const total = await hardhatProject.contributors(addr1.address);
    });
    it("Can contribute multiple times, increments contribution amount", async () => {
      await hardhatProject
        .connect(addr1)
        .contribute({ value: ethers.utils.parseUnits("0.01", "ether") });
      await hardhatProject
        .connect(addr1)
        .contribute({ value: ethers.utils.parseUnits("0.02", "ether") });
      const total = await hardhatProject.contributors(addr1.address);
      expect(total).to.equal(ethers.utils.parseUnits("0.03", "ether"));
    });
    it("Must contribute at least 0.01 ETH", async () => {
      await expect(
        hardhatProject
          .connect(addr1)
          .contribute({ value: ethers.utils.parseUnits("0.001", "ether") })
      ).to.be.revertedWith("contribution must be at least 0.01 ETH");
    });
    it("Can contribute if you're the creator", async () => {
      await hardhatProject
        .connect(creator)
        .contribute({ value: ethers.utils.parseUnits("0.01", "ether") });
      const total = await hardhatProject.contributors(creator.address);
    });
    // check for NFT awarding
  });

  describe("cancel()", () => {
    it("Marks contract as cancelled", async () => {
      const before = await hardhatProject.cancelled();
      await hardhatProject.connect(creator).cancel();
      const after = await hardhatProject.cancelled();
      expect(before).to.not.be.equal(after);
    });
    it("Only the creator can cancel", async () => {
      await expect(hardhatProject.connect(addr1).cancel()).to.be.revertedWith(
        "must be project creator"
      );
    });
    it("Project must be active", async () => {
      await hardhatProject.connect(creator).cancel();
      await expect(hardhatProject.connect(creator).cancel()).to.be.revertedWith(
        "project is not live"
      );
    });
  });

  describe("refund()", () => {
    beforeEach(async () => {
      await hardhatProject
        .connect(addr1)
        .contribute({ value: ethers.utils.parseUnits("0.02", "ether") });
      await hardhatProject
        .connect(creator)
        .contribute({ value: ethers.utils.parseUnits("0.02", "ether") });
      await hardhatProject.connect(creator).cancel();
    });
    it("Returns all contributed funds to a given contributor", async () => {
      await expect(
        await hardhatProject.connect(addr1).refund()
      ).to.changeEtherBalance(addr1, ethers.utils.parseUnits("0.02", "ether"));
    });
    it("Updates contract ledger", async () => {
      await hardhatProject.connect(addr1).refund();
      expect(await hardhatProject.contributors(addr1.address)).to.deep.equal(0);
    });
  });

  describe("withdraw()", () => {
    beforeEach(async () => {
      await hardhatProject
        .connect(addr1)
        .contribute({ value: ethers.utils.parseUnits("10", "ether") });
    });
    it("Creator can withdraw an amount of funds", async () => {
      await expect(
        await hardhatProject
          .connect(creator)
          .withdraw(ethers.utils.parseUnits("10", "ether"))
      ).to.changeEtherBalance(creator, ethers.utils.parseUnits("10", "ether"));
    });
    it("Contributors cannot call", async () => {
      await expect(
        hardhatProject
          .connect(addr1)
          .withdraw(ethers.utils.parseUnits("10", "ether"))
      ).to.be.revertedWith("must be project creator");
    });
  });
});
