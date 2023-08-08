import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import axios from "axios";

const EditProduct = () => {
  const [productId, setProductId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleGetProduct = () => {
    // Send a request to fetch the product details based on the entered product ID
    axios
      .get(`http://localhost:4000/seller/products/${productId}`)
      .then((response) => {
        const productData = response.data;
        setName(productData.name);
        setDescription(productData.description);
        setError("");
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        setName("");
        setDescription("");
        setError("Product with this ID not found.");
      });
  };

  const handleEditProduct = () => {
    // Send the updated product data to the backend for editing
    const updatedProduct = { name, description };
    axios
      .put(`http://localhost:4000/seller/products/${productId}`, updatedProduct)
      .then(() => {
        setIsSuccess(true);
        setError("");
      })
      .catch((error) => {
        console.error("Error editing product:", error);
        setIsSuccess(false);
        setError("Failed to edit product.");
      });
  };

  return (
    <div>
      <h2>Edit Product</h2>
      <TextField
        label="Product ID"
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
        variant="outlined"
      />
      <Button variant="contained" color="primary" onClick={handleGetProduct}>
        Get Product Details
      </Button>
      {name && (
        <div>
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            variant="outlined"
          />
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            variant="outlined"
          />
          <Button variant="contained" color="primary" onClick={handleEditProduct}>
            Edit Product
          </Button>
        </div>
      )}
      {isSuccess && <div>Product edited successfully!</div>}
      {error && <div>{error}</div>}
    </div>
  );
};

export default EditProduct;
