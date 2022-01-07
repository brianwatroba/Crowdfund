# Week 1 Project: Crowdfundr

_Brian Watroba, Block 3_

**DESIGN EXERCISE:**

**_Prompt:_** _Smart contracts have a hard limit of 24kb. Crowdfundr hands out an NFT to everyone who contributes. However, consider how Kickstarter has multiple contribution tiers. How would you design your contract to support this, without creating three separate NFT contracts?_

**Answer:**

- Switch NFT token standard from ERC-721 to ERC-1155
- ERC-1155 is a better fit for donation tiers because: 1) it allows for multiple "types" of NFTs within the same contract, 2) is more gas efficient, and 3) allows for batch minting, which is sometimes needed in CrowdFundr (if someone donates >= 2 ETH at once).

**Pseudocode:**

- Inherit from 1155 (OZ)
- Set storage variables for each tiered NFT type, giving each a specific id (silver = 1, gold = 2, platinum = 3)
- Determine contribution thresholds needed to "earn" each tier (silver = 1 ETH, gold = 10 ETH, Platinum = 25 ETH)
- Change logic in contribute() function to check which NFT type to award based on total contribution. For all 1 ETH increments, give a silver. For all 10 ETH increments, give a gold, etc. Token awarding can overlap. Example: if you donate 10ETH, you get 10 silver awards and 1 gold award.
- Change awardBadge function to use ERC-1155's \_mintBatch function, remove the existing for loop.
