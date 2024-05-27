const SpaceBear = artifacts.require("SpaceBear");

module.exports = (deployer, network, accounts) => {
  console.log("Network: ", network);
  console.log("Accounts: ", accounts);
  deployer.deploy(SpaceBear);
};
