# CrowdFund 🌍

Decentralized implementation of [Kickstarter.com](https://www.kickstarter.com/). Core functionality: project creation, contribution, and funds management all reproduced via smart contracts. Deployed to Ethereum testnet (Rinkeby).

<br>
<div style="display: flex;">
   <img src="https://img.shields.io/badge/Solidity-e6e6e6?style=for-the-badge&logo=solidity&logoColor=black" height="20" />
      <img src="https://img.shields.io/badge/Ethereum-3C3C3D?style=for-the-badge&logo=Ethereum&logoColor=white" height="20" />
      <img src="https://img.shields.io/badge/Hardhat-181a1f?style=for-the-badge&logo=data:image/png;base64,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" height="20" />
      <img src="https://img.shields.io/badge/OpenZeppelin-f4f4f4?style=for-the-badge&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAA5CAYAAAB0+HhyAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAULSURBVHgB5ZlbTBxVGID//+zMLiAQiUJsxWiUekmwpIppm6gxmmhMlYvVF0m0wNKCirdUQWphUxqrNfJCE1tZhFCpKVp0oeD1wQc10RSTYsCqtTVWXjQFUovszOzM778YGgoIu2dmt45+LzvXnfnmP5f/nINFj/z6KAJeD25G4KCCiCVEVAIuhQAm0KO2C3A5Qojdfe05x90tgvDNmqtW7I5uulnEAsT6QACt6I5rRbhud4U6Vn46u+9OEaJIRESaWYZmD7lShBCbBjquPDH3mPtEEIYzzdQ98w+7ToRQberuvuTM/OOuEuEM5EBfR05osXOuEeFaHfZEItvnVvC5uEaEX7Sl98D5FXzeeReAeCyTTr+01CUKx+x7DtwR+BcjyNO4f3/BFPwfQEgSPFRAf592DVi0njPWfCLIJgR16ZuATPI+2VmKk8v9f8JFHuohb6ZPuxNR1HGat5bfLTXWe7l96g2W+jbGcq0CCaT6sJZvGPpb3IsVcEQgTiYV0mtivTghrdZMMXpfLzciOMQxLwAJLKKGvQ9k/Bbr9QkRqew3nuCf11nJCxJwpzei+3zdcd0DDlPdT3cYpjHAEmkghykUcXvbfeqX8dzkaET8g5RrmFq3DYkoB+OViOKoCBnGVg7ySpCE24PTKKwXQQLHRCpCeiG3+36wgQDaHixKPQkSONb8cpvPgx26CCRBhJ9yi337QBJHIlIVmi5jibUgCX8EAyzhD+DfMyIy2Bap7aFsi8QusIElrPeCpepnYAPbRWvaa0TT6ytAEm7/J1Qv1IFNbEWkMqSv4dzpYbABITXuvTf1Z7CJLRH+mtHKKd1noMDvzHFfEBxAWqQiFC7inOoWkIcssJ7uLMcwOICUyKaBs5ch4R6wg4CuN4tSPgaHkBJRdKUBbFRw7jT+4G58JzhI3CIVH9B1PGW5GWwgBAbai1OOg4PEJVL7I/lQMzp50wfyDOEKpRUcJi6R6WM6L9HROpCFwEKgxjcK0QCHiVnk+c8pwzLhNbCDwJ5gScogJICYRcZ/N17hfuNykAbHhWI1QYKISaSql67lclEFNuAi1dK2IeUHSBDLigSIBAktyHNQ0nkZz5+M5hZ7bSWWy7Hsy431m6UEeBvIY3I06uem6DXDk1kGpm7gEeFdHKurOVyXIpF0S8id8+ElJx9quilLT9e/4k+6CmQfgvh2W5FaFl0OeGyE0jVLq+aJumf4hPSQeMEzeN1kyYhEMoyd/FBpCS5Suuo1GxC9VH1Uy9cieg8L3JCI+c1/FKn8MJxnhmmLnWdyBWyKpuj+o/o67jg+4TKQDgli0coeCJCCGrayhAck4TH48MWp3lb/t9pqC61QIiWiLCpyarVRZhHcA7JwmfIIzwvpd8M0b3ZxGc6BBLNApHaQssFD29DGLCRH4+C++5XBX4b1epaSmvuNlwUi04ZRZ6eVYqYwAs1bRsOrOMvdCkniPJHyQ1M38TjhKbABT+20tD3oG4mYuINHkFmQJM4Vn81HSKUx/V2uG0UgDY6aE+rNakHkVku1PuLIJmWxNdqPnHsQS2y0JxFdKBPb1t8IJim0K1kSs8w8jKORxhLNYAMO7aEzhqf/6xSjio0KIcnMiFhj2g7+yQNJWEIzwXw2My+cy0tNL8MFQFT0ny3gpPBxsAEvdL7aUZJ2ChQR4N0MuAAoYHlVsKznQBaPMNK9f76z6SSlwJTxBf/XECQbk07Af4W/AI+CygKI3mZ1AAAAAElFTkSuQmCC" height="20" />
      <img src="https://img.shields.io/badge/Alchemy-f4f4f4?style=for-the-badge&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAVCAYAAACzK0UYAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAHJSURBVHgBpVXdUcJAEN49SeCRDkwJOCM8icQO6MBYAVoBsQLoAKxERJ/AGezA0IG+mURuvU1MJn+Dl/g95fY2+93t7rcHUAOD0ZfXt4Me1ITQdRxc+i4AngLJGdQE6jj1bLIMCnbKuctrknizfTaXoAmtmxgycBOC+C+aKeIuaEIvXQjj/BK6pgxuQRNaJEgwryCechpBA0dJBkN/zGnZrNuuqsS+uG+Qv4D/kHBwErAwZOjyWh5OnKIPAtp8EGhKooo959wj0oS18fpirIjoqRyB/mzpShIOigjXqeFXG6FoO2VvtGIN1SQBKXOF5rT0h4HztkIPCO6L7oQwOdYEJRIOhoijUiBSBAqBMOfFJohamoKZFkkksIocE8ED14S/1W0+SAq3Itb4/CK0K+zQyi4igSHklEwAn6Ew3ayNR4oK6BWDfbdaJRsDM7ew1JXfSx6qBrFOmiO9iSH9JWBxXtJ+s+64nEY1IB/VrsaYJy/A9hmnNbFENWFBVRU7ESALUo+AgRZrLGeJSNRjFL0V2fMo4W3XHTvSDNEOakIexFXSLCJ9jApIhVfQjC7w5DBNvoUasU7pFJLuWHix8stp1CJhATd4qhvjB3LwvmsBYBzSAAAAAElFTkSuQmCC" height="20" />
</div>

---

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
