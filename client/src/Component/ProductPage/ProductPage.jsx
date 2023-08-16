import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Button, Card, Grid } from "@mui/material";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProductCard from "../ProductCard/ProductCard";
import "./ProductPage.css"; // Import the CSS file
import axios from "axios";

const ProductPage = () => {
  const [productData, setProductData] = useState([]);
  useEffect(() => {
    axios
      .get("/seller/myProducts")
      .then((response) => {
        // Handle the response data here
        console.log(response.data);
        setProductData(response.data);
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        console.error(error);
      });
  }, []);

  const productsPerRow = 4; // Number of products per row

  const rows = [];
  for (let i = 0; i < productData.length; i += productsPerRow) {
    rows.push(productData.slice(i, i + productsPerRow));
  }

  return (
    <>
      <AppBar position="static" className="appBar">
        <Toolbar>
          <Typography variant="h6" className="title">
            E-Commerce
          </Typography>
          <Button color="inherit" className="button">
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Login
            </Link>
          </Button>
        </Toolbar>
      </AppBar>
      <div className="product-card-container">
        {rows.map((row, rowIndex) => (
          <Grid key={rowIndex} container spacing={2}>
            {row.map((product, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <ProductCard {...product} />
              </Grid>
            ))}
          </Grid>
        ))}
      </div>
    </>
  );
};

export default ProductPage;
