import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { IconButton } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import Navbar from "../../../components/main/navbar";
import Footer from "../../../components/main/footer";
import Link from "@mui/material/Link";
import { Helmet } from "react-helmet";

export default function Authentification() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <Helmet>
        <meta
          name="description"
          content="Authentification sur RayonAfrique - Connectez-vous à votre compte pour accéder à vos informations et gérer vos achats ou ventes de produits africains."
        />
        <meta
          name="keywords"
          content="RayonAfrique, authentification, connexion, se connecter, compte utilisateur, produits africains, épicerie africaine, marques africaines"
        />
        <meta name="author" content="RayonAfrique" />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/dpodybbfe/image/upload/v1719949488/rayonafrique_wsbbxn.png"
        />
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
            <Avatar sx={{ m: 2, backgroundColor: "#088A85" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Authentification
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
                    required
                    fullWidth
                    name="password"
                    label="Authentification"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    autoComplete="new-password"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item xs={12} textAlign="center">
                  <Typography sx={{ fontWeight: "light", fontStyle: "italic" }}>
                    Veuillez entrer le code d'authentification envoyé à vos
                    coordonnées.
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
                  backgroundColor: "#088A85",
                  "&:hover": { backgroundColor: "#00BFA6" },
                }}
              >
                Se connecter
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Renvoyer le code
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
