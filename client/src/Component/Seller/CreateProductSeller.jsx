import React, { useState } from "react";
import { TextField, Button, Container } from "@mui/material";
import axios from "axios";

function CreateProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  const handleCreateProduct = () => {
    const productData = {
      name: name,
      description: description,
      price: price,
      stock: stock,
    };

    axios.post("/seller/product", productData)
      .then(response => {
        console.log("Product created successfully:", response.data.product);
        // Reset the input fields after successful creation
        setName("");
        setDescription("");
        setPrice("");
        setStock("");
      })
      .catch(error => {
        console.error('Error creating product:', error);
      });
  };

  return (
    <Container>
      <h2>Create New Product</h2>
      <TextField
        label="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br /><br />
      <TextField
        label="Product Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <br /><br />
      <TextField
        label="Price"
        value={price}
        type="number"
        onChange={(e) => setPrice(e.target.value)}
      />
      <br /><br />
      <TextField
        label="Stock"
        value={stock}
        type="number"
        onChange={(e) => setStock(e.target.value)}
      />
      <br /><br />
      <Button variant="contained" color="primary" onClick={handleCreateProduct}>
        Create Product
      </Button>
    </Container>
  );
}

export default CreateProduct;
