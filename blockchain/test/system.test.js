const { 
    etherlime,
    test_settings
} = require("./testing.settings.js");

describe("System wide test", async () => {
    let deployerInsecure = accounts[1];
    let deployer = new etherlime.EtherlimeGanacheDeployer(deployerInsecure.secretKey);
    
    beforeEach('', async () => {
        
    });

    describe("Deploying functionality", async () => {
        it("Can deploy a utility", async () => {

        });
    });
});