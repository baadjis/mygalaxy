pragma solidity ^ 0.5.7;
// We have to specify what version of compiler this code will compile with

contract Seller {

  /* Events */
  event ProductAdded(uint ProductId);
  event ProcessedOrder(uint CustomerId, uint OrderId, bool status);

  struct Product {
    uint ProductId;
    bytes32 ProductName;
    uint price;
  }

  struct Order{
    uint CustomerId;
    uint OrderId;
    bool status;
  }

  // STATE Variables.
  uint numberOfProductsAvailableForSale;
  uint numberOfOrdersProcessed;

  // Mappings 
  mapping (uint => Product) Products;
  mapping (uint => Order) Orders;


  /* TRANSACTIONS */
  function AddProduct(bytes32 ProductName, uint price) public {
    uint ProductId = numberOfProductsAvailableForSale++;
    Products[ProductId] = Product(ProductId, ProductName, price);
    emit ProductAdded(ProductId);
  }

  function processOrder(uint OrderId, uint idCustomer) public {
    Orders[OrderId] = Order(idCustomer, OrderId, true);
    numberOfOrdersProcessed ++;
    emit ProcessedOrder(idCustomer, OrderId, true);
  }

  /* GETTERS */
  function getProduct(uint ProductId) view public returns(bytes32, uint){
    /*returns ProductName and its price*/
    return (Products[ProductId].ProductName, Products[ProductId].price);
  }

  function getStatus(uint OrderId) view public returns(bool) {
    /*returns completion status*/
    return (Orders[OrderId].status);
  }

  function getTotalNumberOfAvailableProducts() view public returns (uint) {
    return numberOfProductsAvailableForSale;
  }

  function getTotalNumberOfOrdersProcessed() view public returns (uint){
    return numberOfOrdersProcessed;
  }

}