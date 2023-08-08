import React from "react";
import GetProducts from "./Purchaser/GetProductsPurchaser";

function Purchaser() {
    // Your Seller component logic here
    
    return (
      <div>
        {/* Your Seller component UI */}
        <h1>Seller Dashboard</h1>
        {/* Use the GetOrders component here */}
        <p>Get Products</p>
        <GetProducts/>
        {/* Add other components or content as needed */}
      </div>
    );
  }

export default Purchaser;