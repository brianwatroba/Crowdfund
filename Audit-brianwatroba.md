## **CrowdFunding Audit**

By Frank

Comments: Great job I really like how you implemented the badge award contribution, I did it a bit different, so it's good to see a different way. Small considerations below.

## **Nitpicks**

- Consider using OpenZeppelin's `Ownable` contract for restricting `onlyOwner` functions
- Consider adding Events to your contract. Enabling you to communicate with your front end Dapp.
