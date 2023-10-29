import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Button,
  Box,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(() => ({
  table: {
    minWidth: 650,
  },
}));

const Cart = () => {
  const classes = useStyles();
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Product 1', quantity: 2, price: 19.99 },
    { id: 2, name: 'Product 2', quantity: 1, price: 29.99 },
    // ... more cart items
  ]);

  const handleDecrease = (item) => {
  if (item.quantity > 1) {
    const updatedItems = cartItems.map((cartItem) =>
      cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
    );
    setCartItems(updatedItems);
  }
};

const handleIncrease = (item) => {
  const updatedItems = cartItems.map((cartItem) =>
    cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
  );
  setCartItems(updatedItems);
};


  const handleDeleteItem = (itemId) => {
    const updatedCart = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCart);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  if (cartItems.length === 0) {
    return (
      <Typography variant="subtitle1" align="center">
          Vous n'avez pas d'article
      </Typography>
    );
  }
  

  return (
    <>
      <TableContainer>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Produits</TableCell>
              <TableCell align="center">Quantité</TableCell>
              <TableCell align="center">Prix</TableCell>
              <TableCell align="center">Total</TableCell>
              <TableCell align="center">Supprimer</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell align="center">
                  <Box display="flex" justifyContent="center">
                    <Button variant="outlined" onClick={()=>handleDecrease(item)}>
                      -
                    </Button>
                  <Box mx={2}>{item.quantity}</Box>
                    <Button variant="outlined" onClick={()=>handleIncrease(item)}>
                      +
                    </Button>
                  </Box>
                </TableCell>
                <TableCell align="center">{item.price} €</TableCell>
                <TableCell align="center">{item.price * item.quantity} €</TableCell>
                <TableCell align="center">
                  <IconButton onClick={() => handleDeleteItem(item.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box padding="20px" display="flex" justifyContent="center">
        <h3>Total Price: {getTotalPrice()} €</h3>
      </Box>
    </>
  );
};

export default Cart;
