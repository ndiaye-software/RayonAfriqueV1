import * as React from 'react';
import { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddressForm from './addressForm';
import PaymentForm from './paymentForm';
import CardForm from '../buy/card';
import Review from './review';
import Navbar from "../../../components/main/navbar";
import Footer from "../../../components/main/footer";

const steps = ['Votre panier','Adresse', 'Détail paiement', 'Résumé'];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <CardForm />;
    case 1:
      return <AddressForm />;
    case 2:
      return <PaymentForm />;
    case 3:
      return <Review />;
    default:
      throw new Error('Unknown step');
  }
}

export default function Checkout() {

    const [cartItems] = useState([
    { id: 1, name: 'Product 1', quantity: 2, price: 19.99 },
    { id: 2, name: 'Product 2', quantity: 1, price: 29.99 },
    // ... more cart items
  ]);

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <React.Fragment>
      <CssBaseline/>
        <Navbar/>
        <Box variant="outlined" padding="50px">
          <Box marginBottom="50px">
          <Typography component="h1" variant="h4" align="center" marginBottom="20px">
            Paiement
          </Typography>
            <Stepper activeStep={activeStep}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Box display="flex" justifyContent="center">
                <Box width="500px">
                  <Typography textAlign="center" variant="h5" gutterBottom>
                    Thank you for your order.
                  </Typography>
                  <Typography variant="subtitle1">
                    Your order number is #2001539. We have emailed your order
                    confirmation, and will send you an update when your order has
                    shipped.
                  </Typography>
                </Box>
                </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Box display="flex" alignContent="center" alignItems="center" justifyContent="center" flexDirection="column">
                {getStepContent(activeStep)}
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}

                {cartItems.length > 0 && (
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                  </Button>
                )}
              </Box>
            </React.Fragment>
          )}
        </Box>

      <Footer/>
    </React.Fragment>
  );
}