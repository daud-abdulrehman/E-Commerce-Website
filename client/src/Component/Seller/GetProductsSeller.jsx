import React, { useState, useEffect } from "react";
import { Button, Container, List, ListItem, ListItemText } from "@mui/material";
import axios from "axios";

function GetProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/seller/myProducts')
      .then(response => {
        const productsData = response.data;
        setProducts(productsData);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  return (
    <Container>
      <Button variant="contained" color="primary" onClick={() => window.location.reload()}>Get Products</Button>
      <List>
        {products.length === 0 ? (
          <ListItem>
            <ListItemText primary="No products found." />
          </ListItem>
        ) : (
          products.map(product => (
            <ListItem key={product.id}>
              <ListItemText primary={`Product ID: ${product.id}, Name: ${product.name}, Price: $${product.price}`} />
            </ListItem>
          ))
        )}
      </List>
    </Container>
  );
}

export default GetProducts;
