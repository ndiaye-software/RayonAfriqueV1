import React, { useState } from "react";
import Navbar from "../../../components/main/navbar";
import Footer from "../../../components/main/footer";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Business from "../../../images/business.jpg";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { makeStyles } from "@material-ui/core/styles";
import { Accessibility, Handshake, LiveTv, Email } from "@mui/icons-material";
import InputAdornment from "@mui/material/InputAdornment";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import hostname from "../../../hostname";

const useStyles = makeStyles(() => ({
  section2: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    backgroundColor: "#f9fafb",
    padding: "30px",
    gap: "35px",
  },
}));

const defaultTheme = createTheme();

export default function SignInSide() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    nameCompany: "",
    mail: "",
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
      const response = await fetch(`${hostname}/api/v1/marque/auth/SignUp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.message) {
          toast.success(data.message);
        }
        navigate("verification");
      } else {
        // Gérer les erreurs d'authentification ici
        const data = await response.json(); // Obtenir les détails de l'erreur du backend
        if (data.message) {
          // Si le backend renvoie un message d'erreur, l'afficher sur le frontend
          toast.error(data.message);
        } else {
          // Si le message d'erreur n'est pas disponible, afficher un message générique
          toast.error("Erreur lors de l'inscription");
        }
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi de la requête :", error);
    }
  };

  const classes = useStyles();

  return (
    <ThemeProvider theme={defaultTheme}>
      <Navbar />
      <Grid container component="main">
        <CssBaseline />
        <Grid item xs={false} sm={4} md={6}>
          <div className={classes.section2}>
            <Card sx={{ maxWidth: 425 }}>
              <CardMedia component="img" height="250" image={`${Business}`} />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Bientôt sur RayonAfrique
                </Typography>
                <Typography variant="body2" color="inherit">
                  Prêt à faire briller votre marque de produits africains ?
                  <strong>
                    Inscrivez-vous pour pouvoir être alerté en premier de nos
                    services
                  </strong>{" "}
                  pour partager votre marque sur notre plateforme et attirer une
                  toute nouvelle clientèle !
                  <Box paddingTop="20px" paddingLeft="20px">
                    <Grid container>
                      <Grid
                        item
                        xs={2}
                        variant="body2"
                        color="inherit"
                        sx={{ display: "flex", alignItems: "center" }}
                      >
                        <Accessibility
                          sx={{
                            backgroundColor: "#922B21",
                            borderRadius: "50%",
                            padding: "5px",
                            fontSize: "35px",
                            color: "white",
                          }}
                        />
                      </Grid>
                      <Grid
                        item
                        xs={10}
                        variant="body2"
                        color="inherit"
                        sx={{ display: "flex", alignItems: "center" }}
                      >
                        <Typography variant="body2" color="inherit">
                          Rendez l'achat de vos produits plus facile en les
                          rendant plus accessibles
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container paddingTop="20px">
                      <Grid
                        item
                        xs={2}
                        variant="body2"
                        color="inherit"
                        sx={{ display: "flex", alignItems: "center" }}
                      >
                        <LiveTv
                          sx={{
                            backgroundColor: "#922B21",
                            borderRadius: "50%",
                            padding: "5px",
                            fontSize: "35px",
                            color: "white",
                          }}
                        />
                      </Grid>
                      <Grid
                        item
                        xs={10}
                        variant="body2"
                        color="inherit"
                        sx={{ display: "flex", alignItems: "center" }}
                      >
                        <Typography variant="body2" color="inherit">
                          Créer des publicités et faÎtes gagner votre marque en
                          visibilité
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container paddingTop="20px">
                      <Grid
                        item
                        xs={2}
                        variant="body2"
                        color="inherit"
                        sx={{ display: "flex", alignItems: "center" }}
                      >
                        <Handshake
                          sx={{
                            backgroundColor: "#922B21",
                            borderRadius: "50%",
                            padding: "5px",
                            fontSize: "35px",
                            color: "white",
                          }}
                        />
                      </Grid>
                      <Grid
                        item
                        xs={10}
                        variant="body2"
                        color="inherit"
                        sx={{ display: "flex", alignItems: "center" }}
                      >
                        <Typography variant="body2" color="inherit">
                          Contacter nos épiceries partenaires et créer de
                          nouveaux partenariats
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </Typography>
              </CardContent>
              <Grid
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignContent="center"
                alignItems="center"
                paddingBottom="30px"
              >
                {" "}
              </Grid>
            </Card>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={6} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, backgroundColor: "#922B21" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Inscription - Marque
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
                value={formData.name}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="nameCompany"
                label="Nom de votre marque"
                id="nameCompany"
                value={formData.nameCompany}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="mail"
                label="Adresse mail"
                name="mail"
                autoComplete="email"
                autoFocus
                value={formData.mail}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email/>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  padding: 2,
                  backgroundColor: "#922B21",
                  "&:hover": { backgroundColor: "#A63F35" },
                }}
              >
                S'inscrire
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="/inscription/epicerie" variant="body2">
                    {"Vous êtes une épicerie ?"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
            <div>
              <ToastContainer theme="colored" />
            </div>
          </Box>
        </Grid>
      </Grid>
      <Footer />
    </ThemeProvider>
  );
}
