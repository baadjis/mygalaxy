var DataStorage = artifacts.require("./DataStorage.sol");

contract('DataStorage', function (accounts) {

    it("...should store the value yas!.", function () {
        return DataStorage.deployed().then(function (instance) {
            DataStorageInstance = instance;

            return DataStorageInstance.set("yas!", { from: accounts[0] });
        }).then(function () {
            return DataStorageInstance.get.call();
        }).then(function (storedData) {
            assert.equal(storedData, "yas!", "The value yas! was not stored.");
        });
    });

});