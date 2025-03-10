import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Navbar from "../../../components/main/navbar";
import Footer from "../../../components/main/footer";
import hostname from "../../../hostname";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet";

export default function Connexion() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    mail: "",
    password: "",
  });

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
      const response = await fetch(`${hostname}/api/v1/epicerie/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();

        const accessToken = data.accessToken;
        localStorage.setItem("accessToken", accessToken);

        if (data.status === "actif") {
          navigate(`/epicerie`);
        }
        if (data.status === "inactif" || data.status === null) {
          navigate(`/connexion/verification`);
        }
      } else {
        const data = await response.json();
        if (data.message) {
          toast.error(data.message);
        } else {
          toast("Erreur d'authentification");
        }
      }
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
    }
  };

  return (
    <div>
      <Helmet>
        <meta
          name="description"
          content="Connexion à RayonAfrique - Accédez à votre compte pour découvrir et acheter des produits africains authentiques, ou gérer vos ventes si vous êtes un vendeur."
        />
        <meta
          name="keywords"
          content="RayonAfrique, connexion, se connecter, compte utilisateur, produits africains, épicerie africaine, marques africaines"
        />
        <meta name="author" content="RayonAfrique" />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/dpodybbfe/image/upload/v1719949488/rayonafrique_wsbbxn.png"
        />
      </Helmet>

      <Navbar />
      <Grid container sx={{ minHeight: "100vh" }}>
        <Container
          container="true"
          maxWidth="sm"
          sx={{
            paddingTop: 5,
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
              padding: 5,
              borderRadius: "15px",
            }}
          >
            <Avatar sx={{ m: 1, backgroundColor: "#922B21" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Connexion - Epicerie
            </Typography>
            <Box
              component="form"
              onSubmit={handleLogin}
              noValidate
              sx={{ mt: 1 }}
            >
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
              <div>
                <ToastContainer theme="colored" />
              </div>
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
                Se connecter
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="/connexion/reinitialisation-mdp" variant="body2">
                    Mot de passe oublié?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/inscription/epicerie" variant="body2">
                    {"Pas de compte ? Inscrivez vous"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </Grid>
      <Footer />
    </div>
  );
}
