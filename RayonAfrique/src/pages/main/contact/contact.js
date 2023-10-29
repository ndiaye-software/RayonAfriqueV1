import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Navbar from "../../../components/main/navbar";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import Typography from "@mui/material/Typography";
import contact from "../../../images/contact.jpg";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Footer from "../../../components/main/footer";
import { useNavigate } from 'react-router-dom';
import hostname from "../../../hostname";

const defaultTheme = createTheme();

export default function Contact() {

  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name:"",
    mail: "",
    message : ""
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await fetch(`${hostname}/api/v1/contact/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        navigate('sent'); 
      } else {
        navigate('notsent');
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi de la requête :', error);
    }
  };
  

  return (
    <ThemeProvider theme={defaultTheme}>
      <Navbar />
      <Grid container component="main">
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${contact})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
          boxShadow="none"
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "#922B21" }}>
              <SendOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Contact
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                name="name"
                label="Votre nom"
                type="name"
                id="name"
                onChange={handleChange}
                value={formData.name}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="mail"
                value={formData.mail}
                label="Adresse mail"
                name="mail"
                autoComplete="email"
                autoFocus
                onChange={handleChange}
              />
              <TextField
                required
                id="message"
                name = "message"
                margin="normal"
                label="Votre message"
                value={formData.message}
                autoFocus
                fullWidth
                multiline
                onChange={handleChange}
                minRows={8}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  bgcolor: "#922B21",
                  "&:hover": { backgroundColor: "#A63F35" },
                }}
              >
                Envoyez
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Footer />
    </ThemeProvider>
  );
}
