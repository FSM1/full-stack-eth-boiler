require('dotenv').config();

const simpleStorageABI = require('../build/SimpleStorage.json');

let DEPLOYER_PRIVATE_KEY = process.env.DEPLOYER_PRIVATE_KEY;

const etherlime = require('etherlime-lib');

const defaultConfigs = {
	etherscanApiKey: process.env.ETHERSCAN_API_KEY,
};

const deploy = async (network, secret) => {
	if (!secret) {
		secret = DEPLOYER_PRIVATE_KEY;
	}
	if (!network) {
		network = 'local';
	}
	if (network === 'local') {
		const deployer = new etherlime.JSONRPCPrivateKeyDeployer(
			secret, 
			'http://localhost:8545/', 
			defaultConfigs
		);

		const deploy = (...args) => deployer.deploy(...args);

		await deploy(simpleStorageABI);
	} else if (network === 'rinkeby') {
	    console.log("Script & contracts are not ready for rinkeby deployment")
	} else if (network === 'mainnet') {
	    console.log("Script & contracts are not ready for main net deployment")
	}
};

module.exports = {
	deploy
};
