import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Navbar from "../../../components/main/navbar";
import Footer from "../../../components/main/footer";

export default function Connexion() {
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
    <Grid container sx={{ minHeight:"100vh"}}> 
      <Container container maxWidth="sm" sx={{paddingTop:5, paddingLeft:3, paddingRight:3, paddingBottom:5}}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding:5,
            borderRadius:"15px"
          }}
        >
          <Avatar sx={{ m: 1, backgroundColor:"#922B21" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Connexion
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Adresse mail"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Mot de passe"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2,  backgroundColor:"#922B21", '&:hover': { backgroundColor: "#A63F35"}}}
            >
              Se connecter
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/connexion/reinitialisation-mdp" variant="body2">
                  Mot de passe oublié?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/inscription/client" variant="body2">
                  {"Pas de compte ? Inscrivez vous"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
</Grid>
<Footer/>
</div>
  );
}