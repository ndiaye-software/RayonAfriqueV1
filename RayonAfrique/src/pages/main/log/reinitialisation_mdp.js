import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Navbar from "../../../components/main/navbar";
import Footer from "../../../components/main/footer";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import hostname from "../../../hostname";
import { Helmet } from "react-helmet";

export default function Reinitialisation() {
  const [errorMessage, setErrorMessage] = useState("");

  const [mail, setMail] = useState("");

  const handleChange = (event) => {
    const { value } = event.target;
    setMail(value);
  };

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `${hostname}/api/v1/epicerie/auth/reinitialisation`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ mail }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.message) {
          toast.success(data.message);
        }
        navigate("validation");
      } else {
        const data = await response.json();
        if (data.message) {
          // Si le backend renvoie un message d'erreur, l'afficher sur le frontend
          toast.error(data.message);
        } else {
          // Si le message d'erreur n'est pas disponible, afficher un message générique
          toast.error("Erreur lors de la mise à jour du profil else");
        }
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi de la requête :", error);
      setErrorMessage("Erreur lors de la mise à jour du profil error");
    }
  };

  return (
    <div>
      <Helmet>
        <meta name="description" content="RayonAfrique - réinitialisation mot de passe" />
      </Helmet>
      <Navbar />
      <Grid container>
        <Container
          maxWidth="sm"
          sx={{
            paddingTop: 15,
            paddingLeft: 3,
            paddingRight: 3,
            paddingBottom: 5,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: 2,
              borderRadius: "15px",
            }}
          >
            <Avatar sx={{ m: 2, backgroundColor: "#922B21" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Réinitialisation
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
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
                    value={mail}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12} textAlign="center">
                  <Typography sx={{ fontWeight: "light", fontStyle: "italic" }}>
                    Nous vous enverrons un mail avec les instructions
                    nécessaires pour réinitialiser votre mot de passe
                  </Typography>
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: "#922B21",
                  "&:hover": { backgroundColor: "#A63F35" },
                }}
              >
                Réinitialiser
              </Button>

              <div>
                <ToastContainer theme="colored" />
              </div>

              {errorMessage && (
                <Typography variant="body1" color="error" gutterBottom>
                  {errorMessage}
                </Typography>
              )}
            </Box>
          </Box>
        </Container>
      </Grid>

      <Footer />
    </div>
  );
}
