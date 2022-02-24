async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const contractFactory = await ethers.getContractFactory("ProjectFactory");
  const ProjectFactory = await contractFactory.deploy();
  await ProjectFactory.deployed();

  // [creator, addr1] = await ethers.getSigners();
  // const fundingGoal = ethers.utils.parseUnits("10", "ether");

  // await ProjectFactory.connect(creator).createProject(fundingGoal);
  // const ProjectAddress = await ProjectFactory.deployedProjects(0);
  // const hardhatProject = await ethers.getContractAt("Project", ProjectAddress);

  console.log("ProjectFactory address:", ProjectFactory.address);
  // console.log("Project address:", hardhatProject.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
