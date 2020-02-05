pragma solidity ^0.5.7;
// We have to specify what version of compiler this code will compile with

contract Buyer {

  /* Events */
  event OrderRaisedOrUpdated(uint OrderID);

  struct AvailableBuyer {
    uint BuyerId;
    bytes32 BuyerName;
  }

  struct Order {
    uint OrderID;
    uint BuyerId;
    bytes32 ProductName;
    uint quantity;
    bool status;
  }

  // STATE Variables.
  uint numberOfProductsPurchased;
  uint numberOfProductsReceived;

  // Mappings 
  mapping (uint => AvailableBuyer) Buyers;
  mapping (uint => Order) Orders;

  /* Constructor */
  constructor() public {
      /* For the case of demo, adding a Buyer in constructor. You can take this idea and extend the contract to contain addBuyer section and hence maintain BuyerDB in the Blockchain! */
      Buyers[0] = AvailableBuyer(1, "John Snow");
  }

  /* TRANSACTIONS */
  function purchaseProduct(bytes32 ProductName, uint quantity) public {
    uint OrderID = numberOfProductsPurchased++;
    Orders[OrderID] = Order(OrderID, 0, ProductName, quantity, false);
    emit OrderRaisedOrUpdated(OrderID);
  }

  function recieveProduct(uint OrderID) public {
      numberOfProductsReceived++;
      Orders[OrderID].status = true;
      emit OrderRaisedOrUpdated(OrderID);
  }

  /* GETTERS */
  function getOrderDetails(uint OrderID) view public returns (bytes32, uint, bool){
    /*returns ProductName, quantity & completionStatus*/
    return (Orders[OrderID].ProductName, Orders[OrderID].quantity, Orders[OrderID].status);
  }

  function getNumberOfProductsPurchased() view public returns (uint) {
    return numberOfProductsPurchased;
  }

  function getNumberOfProductsReceived() view public returns (uint) {
    return numberOfProductsReceived;
  }

}