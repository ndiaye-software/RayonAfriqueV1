import * as React from 'react';
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
} from '@mui/material';




const addresses = ['1 MUI Drive', 'Reactville', 'Anytown', '99999', 'USA'];
const payments = [
  { name: 'Card type', detail: 'Visa' },
  { name: 'Card holder', detail: 'Mr John Smith' },
  { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
  { name: 'Expiry date', detail: '04/2024' },
];

export default function Review() {
  const [cartItems] = useState([
    { id: 1, name: 'Product 1', quantity: 2, price: 19.99 },
    { id: 2, name: 'Product 2', quantity: 1, price: 29.99 },
    // ... more cart items
  ]);

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Résumé
      </Typography>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Produits</TableCell>
              <TableCell align="center">Quantité</TableCell>
              <TableCell align="center">Prix</TableCell>
              <TableCell align="center">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell align="center">
                  <Box display="flex" justifyContent="center">
                  <Box mx={2}>{item.quantity}</Box>
                  </Box>
                </TableCell>
                <TableCell align="center">{item.price} €</TableCell>
                <TableCell align="center">{item.price * item.quantity} €</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box padding="20px" display="flex" justifyContent="center">
        <h3>Total Price: {getTotalPrice()} €</h3>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          <Typography gutterBottom>John Smith</Typography>
          <Typography gutterBottom>{addresses.join(', ')}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment details
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}