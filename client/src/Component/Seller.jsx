import React from "react";
import GetOrders from "./Seller/GetOrdersSeller";
import GetProducts from "./Seller/GetProductsSeller";
import CreateProduct from "./Seller/CreateProductSeller";
import EditProduct from "./Seller/EditProductSeller";
import DeleteProduct from "./Seller/DeleteProductSeller";

function Seller() {
  // Your Seller component logic here
  
  return (
    <div>
      {/* Your Seller component UI */}
      <h1>Seller Dashboard</h1>
      {/* Use the GetOrders component here */}
      <p>Get Orders</p>
      <GetOrders />
      <p>Get Products</p>
      <GetProducts/>
      <p>Create Products</p>
      <CreateProduct/>
      <EditProduct/>
      <DeleteProduct/>
      {/* Add other components or content as needed */}
    </div>
  );
}

export default Seller;