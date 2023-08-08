import React, { useState,useEffect } from "react";
import { Button, Container, List, ListItem, ListItemText } from "@mui/material";
import axios from "axios";

function GetOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/seller/myOrders')
      .then(response => {
        const ordersData = response.data;
        setOrders(ordersData);
      })
      .catch(error => {
        console.error('Error fetching orders:', error);
      });
  }, []);


  return (
    <Container>
      <Button variant="contained" color="primary" onClick={() => window.location.reload()}>Get Orders</Button>
      <List>
        {orders.length === 0 ? (
          <ListItem>
            <ListItemText primary="No orders found." />
          </ListItem>
        ) : (
          orders.map(order => (
            <ListItem key={order.id}>
              <ListItemText primary={`Order ID: ${order.id}, Customer: ${order.customer}, Total Amount: $${order.total}`} />
            </ListItem>
          ))
        )}
      </List>
    </Container>
  );
}

export default GetOrders;
