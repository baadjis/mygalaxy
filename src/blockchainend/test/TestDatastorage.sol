pragma solidity ^0.5.7;
import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/DataStorage.sol";

contract TestDataStorage {

  function testItStoresAValue() public {
    DataStorage dataStorage = DataStorage(DeployedAddresses.DataStorage());

    dataStorage.set("yas!");

   string memory expected = "yas!";

    Assert.equal(dataStorage.get(), expected, "It should store the value yas!.");
  }

}