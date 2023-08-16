import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'; // Import the DeleteIcon
import './ProductCard.css'; // Import the CSS module
import axios from 'axios';

export default function ProductCard({ id, imageUrl, name, description, price, stock }) {
  const handleDeleteProduct = async (productId) => {
    try {
      const response = await axios.delete(`/seller/product/${productId}`);
      console.log(response.data);
      // You can also update the product list after deletion if needed
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card className="card-container">
      <CardActionArea>
        <CardMedia
          component="img"
          className="card-media"
          image={imageUrl}
          alt="Product Image"
        />
        <CardContent className="card-content">
          <Typography gutterBottom variant="h5" component="div" className="card-title">
            {name}
          </Typography>
          <Typography variant="subtitle1" className="card-description">
            {description}
          </Typography>
          <Typography variant="h6" className="card-price">
            Rs {price}
          </Typography>
          <Typography variant="h6" className="card-stock">
            Stock: {stock}
          </Typography>
          {/* Delete button
          <IconButton
            className="delete-button"
            aria-label="delete"
            onClick={() => handleDeleteProduct(id)}
          >
            <DeleteIcon />
          </IconButton> */}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
