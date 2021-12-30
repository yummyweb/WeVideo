const Contract = artifacts.require("Contract");
const NFT = artifacts.require("NFT");

module.exports = function(deployer) {
  deployer.deploy(Contract);
  deployer.deploy(NFT);
};
