import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import axios from "axios";

const DeleteProduct = () => {
  const [productId, setProductId] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleDeleteProduct = () => {
    // Send the delete request to the backend
    axios
      .delete(`http://localhost:4000/seller/products/${productId}`)
      .then(() => {
        setIsSuccess(true);
        setError("");
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
        setIsSuccess(false);
        setError("Failed to delete product.");
      });
  };

  return (
    <div>
      <h2>Delete Product</h2>
      <TextField
        label="Product ID"
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
        variant="outlined"
      />
      <Button variant="contained" color="secondary" onClick={handleDeleteProduct}>
        Delete Product
      </Button>
      {isSuccess && <div>Product deleted successfully!</div>}
      {error && <div>{error}</div>}
    </div>
  );
};

export default DeleteProduct;
