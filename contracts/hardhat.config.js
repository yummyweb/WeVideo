require('dotenv').config();
require('@nomiclabs/hardhat-ethers');
require('@nomiclabs/hardhat-waffle');
require('@metis.io/hardhat-mvm');
require('hardhat-deploy');

module.exports = {
	networks: {
		hardhat: {
			accounts: {
				mnemonic:
					'test test test test test test test test test test test junk',
			},
		},
		metis: {
			url: process.env.METIS_DEPLOY_URL,
			accounts: [`0x${process.env.PRIVATE_KEY}`],
			gasPrice: 1000000000,
		},
	},

	solidity: {
		version: '0.8.0',
	},
	namedAccounts: {
		deployer: 0,
	},
};