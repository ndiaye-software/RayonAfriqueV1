import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Navbar from "../../../components/main/navbar";
import Footer from "../../../components/main/footer";


export default function Reinitialisation() {

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
        email: data.get('email'),
        password: data.get('password'),
        });
    };

  return (
    <div>
    <Navbar/>
    <Grid container> 
      <Container  maxWidth="sm" sx={{paddingTop:15, paddingLeft:3, paddingRight:3, paddingBottom:5 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding:2,
            borderRadius:"15px"
          }}
        >
          <Avatar sx={{ m: 2, backgroundColor:"#922B21"}}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Réinitialisation
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                />
              </Grid>
              
              <Grid item xs={12} textAlign="center">
                <Typography sx={{fontWeight: 'light', fontStyle:"italic"}}>
                Nous vous enverrons un mail avec les instructions nécessaires pour réinitialiser votre mot de passe
                </Typography>
            </Grid>

            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor:"#922B21", '&:hover': { backgroundColor: "#A63F35"}}}
            >
              Réinitialiser
            </Button>
        
          </Box>
        </Box>
      </Container>
    </Grid>

    <Footer/>
    </div>
  );
}