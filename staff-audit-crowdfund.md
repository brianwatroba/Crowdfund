https://github.com/Hacker-DAO/student.brianwatroba/tree/3cbf58a59f8869ac87c81f732b67990d817b0136/crowdfund

The following is a micro audit by Alex S.


## Design Exercise

This is a well thought through answer.

## General Comments

A great start with good tests.

## issue-1

**[Medium]** NFT minting can fail or be exploited

Project.sol:50 the calculation of the number of NFTs to award is based on the contributor's total contributions to date and the number of NFTs they currently own. If the contributor has bought NFTs from someone else then they will be penalised, and if they have sold previously awarded NFTs they will be awarded replacements. This opens up an exploit whereby a contributor continually transfers NFTs to an associate, or to another account they own, whilst getting replacement NFTs in exchange for minimal subsequent contributions.

## issue-2

**[Low]** ProjectFactory has an unnecessary payable function

ProjectFactory.sol:15 the receive function is not needed and its presence means that anyone mistakenly sending ETH to the factory will lose it. If this function was not implemented then such a transaction would be reverted, which would be more secure.

## issue-3

**[Code quality]** No events

Though they are not a requirement in the spec (or probably in any of the specs to come in this course) events are a good thing to include. Without them there is no easy way to track the history of the projects. Contribution, refund, withdrawal, reaching the funding goal and project failure are all worthy of an event here.

## Score

| Reason | Score |
|-|-|
| Late                       |  - |
| Unfinished features        |  - |
| Extra features             |  - |
| Vulnerability              |  3 |
| Unanswered design exercise |  - |
| Insufficient tests         |  - |
| Technical mistake          |  - |

Total: 3

Good job!
