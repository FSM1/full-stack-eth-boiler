const etherlime = require('etherlime-lib');
const ethers = require('ethers');
const BigNumber = require('bignumber.js');

let simpleStorageAbi = require('../build/BasicPool.json');

const test_settings = {

}

module.exports = { 
    ethers,
    etherlime,
    BigNumber,
    simpleStorageAbi,
    test_settings
}
