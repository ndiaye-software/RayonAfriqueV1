import React, { useState } from "react";
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
import hostname from "../../../hostname";
import { useNavigate } from "react-router-dom";

export default function Connexion() {

  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    mail: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${hostname}/api/v1/user/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        const { id } = data;

        // Do something with the user ID, e.g., store it in a state or context
        // and then redirect to the desired route
        console.log("User ID:", id);

        // Redirect to the "/epicerie/:id" route
        navigate(`/epicerie/${id}`);
      } else {
        const data = await response.json();
        if (data.message) {
          setErrorMessage(data.message);
        } else {
          setErrorMessage("Erreur d'authentification");
        }
      }

    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
    }
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
          <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Adresse mail"
              name="mail"
              value={formData.mail}
              onChange={handleChange}
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
              value={formData.password}
              onChange={handleChange}
              autoComplete="current-password"
            />
             {errorMessage && (
                <Typography variant="body1" color="error" gutterBottom>
                  {errorMessage}
                </Typography>
              )}
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