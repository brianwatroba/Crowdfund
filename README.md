# CrowdFund 🌍

Decentralized implementation of [Kickstarter.com](https://www.kickstarter.com/). Core functionality: project creation, contribution, and funds management all reproduced via smart contracts. Deployed to Ethereum testnet (Rinkeby).

## Features

- **Project creation:** anyone can create a new Crowdfunding project with a desired funding goal. Uses factory pattern to deploy project contract instances.
- **Contributions:** anyone can contribute ETH to support a project. They're awarded a contributor badge (NFT, standard ERC-721) for each 1 ETH pledged.
- **Funding threshold, project greenlighting:** a project is marked as "funded" if contribution limit is met
- **Funds withdrawal:** creator can withdraw contributed ETH if project funding goal is met
- **Refunds and cancellations:** contributors can retrieve their funds if a project doesn't mean its funding goal by project deadline.

## Contract adddresses (Rinkeby test)

- _ProjectFactory.sol:_ `0xdb41FB3DfF04F1fD05d9648375D8b608c216b438`

## Local setup

1. Clone repository: `git clone https://github.com/brianwatroba/crowdfund.git`
2. Install base project dependencies: cd into root, run `npm install`
3. Add local .env file to project root. Include below env variables (replace keys with your own):

```bash
/.env

ALCHEMY_API_KEY=XXX
RINKEBY_PRIVATE_KEY=xxx
```

## Usage

1. Front end (on localhost): currently does not have a web front end. Contract interaction must happen directly.
2. Local testing: tests written in Chai/Mocha using Hardhat/Ethers.js. Run `npx hardhat test` for test suite.
3. Deployment to Rinkeby: ensure your .env file includes your Rinkeby private key. Then run `npx hardhat run scripts/deploy.js --network rinkeby`. Deploy script only deploys the ProjectFactory.sol contract.
4. Deployment to other test nets: add your desired network to the `networks` object in `hardhat-config.js` using the following format:

```javascript
/hardhat.config.js

rinkeby: {
      url: `https://eth-rinkeby.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`,
      accounts: [`${process.env.RINKEBY_PRIVATE_KEY}`],
    },
```

## Contributing

Pull requests are welcome. Feel free to use this project as reference or for learning! It helped me a lot to better understand how to implement web2 product features in smart contracts. Thanks!

## License

[MIT](https://choosealicense.com/licenses/mit/)
