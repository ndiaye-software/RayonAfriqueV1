import * as React from "react";
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
import { Accessibility, Handshake, LiveTv } from "@mui/icons-material";

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
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
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
                  <strong>Inscrivez-vous pour pouvoir être alerté en premier de nos
                  services</strong> pour partager votre marque sur notre plateforme et
                  attirer une toute nouvelle clientèle !
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
                          Créer des publicités et faÎtes votre marque gagner en visibilité
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
                          Contacter nos épiceries partenaires et créer de nouveaux partenariats
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
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="nameCompany"
                label="Nom de votre marque"
                id="nameCompany"
              />
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
          </Box>
        </Grid>
      </Grid>
      <Footer />
    </ThemeProvider>
  );
}
