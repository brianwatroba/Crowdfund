const { expect } = require("chai");

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
    ProjectAddress = await ProjectFactory.deployedProjects(0);
    hardhatProject = await ethers.getContractAt("Project", ProjectAddress);
  });

  describe("Deployment", () => {
    it("Should set the right creator", async () => {
      expect(await hardhatProject.creator()).to.equal(creator.address);
    });
    it("Factory can create and store multiple Projects", async () => {
      await ProjectFactory.connect(addr1).createProject(fundingGoal);
      const ProjectOne = await ProjectFactory.deployedProjects(0);
      const ProjectTwo = await ProjectFactory.deployedProjects(1);
      expect(ProjectOne).to.be.properAddress;
      expect(ProjectTwo).to.be.properAddress;
      expect(ProjectOne).to.not.equal(ProjectTwo);
    });
  });

  describe("contribute()", () => {
    it("Saves new contribution amount", async () => {
      await hardhatProject
        .connect(addr1)
        .contribute({ value: ethers.utils.parseUnits("0.01", "ether") });
      const total = await hardhatProject.contributors(addr1.address);
    });
    it("Can contribute multiple times", async () => {
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
    it("Cannot contribute if project cancelled", async () => {
      await hardhatProject.connect(creator).cancel();
      await expect(
        hardhatProject
          .connect(addr1)
          .contribute({ value: ethers.utils.parseUnits("1", "ether") })
      ).to.be.revertedWith("project is not active");
    });
    it("Cannot contribute if project funding goal met", async () => {
      await hardhatProject
        .connect(creator)
        .contribute({ value: ethers.utils.parseUnits("10", "ether") });

      await expect(
        hardhatProject
          .connect(addr1)
          .contribute({ value: ethers.utils.parseUnits("1", "ether") })
      ).to.be.revertedWith("project is not active");
    });
    it("Cannot contribue if deadline passed", async () => {
      const currentBlock = await ethers.provider.getBlock();
      await ethers.provider.send("evm_mine", [
        currentBlock.timestamp + 3600 * 24 * 35,
      ]);
      await network.provider.send("evm_mine");

      await expect(
        hardhatProject
          .connect(addr1)
          .contribute({ value: ethers.utils.parseUnits("1", "ether") })
      ).to.be.revertedWith("project is not active");
    });
    it("Creator can contribute", async () => {
      await hardhatProject
        .connect(creator)
        .contribute({ value: ethers.utils.parseUnits("0.01", "ether") });
      const total = await hardhatProject.contributors(creator.address);
    });
    it("Awards NFT if contribution >= 1 ETH", async () => {
      await hardhatProject
        .connect(addr1)
        .contribute({ value: ethers.utils.parseUnits("1.3", "ether") });
      const badgeCount = await hardhatProject.balanceOf(addr1.address);
      expect(badgeCount).to.deep.equal(1);
    });
    it("Awards NFT when contribution total passes 1 ETH", async () => {
      await hardhatProject
        .connect(addr1)
        .contribute({ value: ethers.utils.parseUnits("0.2", "ether") });
      await hardhatProject
        .connect(addr1)
        .contribute({ value: ethers.utils.parseUnits("0.5", "ether") });
      const beforeOneEth = await hardhatProject.balanceOf(addr1.address);
      expect(beforeOneEth).to.deep.equal(0);
      await hardhatProject
        .connect(addr1)
        .contribute({ value: ethers.utils.parseUnits("0.3", "ether") });
      const afterOneEth = await hardhatProject.balanceOf(addr1.address);
      expect(afterOneEth).to.deep.equal(1);
    });
    it("Awards multiple NFTs if single contribution is >= 2 ETH", async () => {
      await hardhatProject
        .connect(addr1)
        .contribute({ value: ethers.utils.parseUnits("3", "ether") });
      const badgeCount = await hardhatProject.balanceOf(addr1.address);
      expect(badgeCount).to.deep.equal(3);
    });
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
        "project is not active"
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
    });
    it("Returns all contributed funds to a given contributor", async () => {
      await hardhatProject.connect(creator).cancel();
      await expect(
        await hardhatProject.connect(addr1).refund()
      ).to.changeEtherBalance(addr1, ethers.utils.parseUnits("0.02", "ether"));
    });
    it("Updates contract ledger", async () => {
      await hardhatProject.connect(creator).cancel();
      await hardhatProject.connect(addr1).refund();
      expect(await hardhatProject.contributors(addr1.address)).to.deep.equal(0);
    });
    it("Cannot use if project funding met", async () => {
      await hardhatProject
        .connect(creator)
        .contribute({ value: ethers.utils.parseUnits("10", "ether") });

      await expect(hardhatProject.connect(addr1).refund()).to.be.revertedWith(
        "project must be failed"
      );
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
