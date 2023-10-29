import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { FormControl, InputLabel, Select } from "@material-ui/core";
import { MenuItem } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import Navbar from "../../../components/main/navbar";
import Footer from "../../../components/main/footer";
import { LocationOn } from "@mui/icons-material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import OutlinedInput from "@mui/material/OutlinedInput";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import hostname from "../../../hostname";

var zxcvbn = require("zxcvbn");

const useStyles = makeStyles((theme) => ({
  strengthPassword: {
    position: "absolute",
    width: "0%",
    height: "5px",
    bottom: "-8px",
    left: 0,
    background: "transparent",
    transition: "all 300ms ease-in-out",
    '&[data-score="null"]': {
      width: 0,
      background: "red",
    },
    '&[data-score="0"]': {
      width: "5%",
      background: "#f44336",
    },
    '&[data-score="1"]': {
      width: "25%",
      background: "#f44336",
    },
    '&[data-score="2"]': {
      width: "50%",
      background: "#ffeb3b",
    },
    '&[data-score="3"]': {
      width: "75%",
      background: "#4caf50",
    },
    '&[data-score="4"]': {
      width: "100%",
      background: "#4caf50",
    },
  },
}));

const options = [{ label: "Fournisseur" }, { label: "Epicerie" }];

export default function SignUp() {
  const navigate = useNavigate();

  const classes = useStyles();

  const [score, setScore] = useState("null");

  const [showPassword1, setShowPassword1] = React.useState(false);

  const handleClickShowPassword1 = () => setShowPassword1((show) => !show);

  const handleMouseDownPassword1 = (event) => {
    event.preventDefault();
  };

  const [showPassword2, setShowPassword2] = React.useState(false);

  const handleClickShowPassword2 = () => setShowPassword2((show) => !show);

  const handleMouseDownPassword2 = (event) => {
    event.preventDefault();
  };

  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    nameCompany: "",
    mail: "",
    phone: "",
    statut: "",
    address: "",
    password1: "",
    password2: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (event.target.value !== "" && event.target.name === "password1") {
      let pass = zxcvbn(event.target.value);
      setScore(pass.score);
    } else {
      setScore("null");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let processedStatut = formData.statut;
    if (formData.statut === "Epicerie") {
      processedStatut = 1;
    } else if (formData.statut === "Fournisseur") {
      processedStatut = 2;
    }

    try {
      const response = await fetch(
        `${hostname}/api/v1/inscription/SignUp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({...formData, statut : processedStatut}),
        }
      );

      if (response.ok) {
        navigate("validation");
      } else {
         // Gérer les erreurs d'authentification ici
         const data = await response.json(); // Obtenir les détails de l'erreur du backend
         if (data.message) {
           // Si le backend renvoie un message d'erreur, l'afficher sur le frontend
           setErrorMessage(data.message);
         } else {
           // Si le message d'erreur n'est pas disponible, afficher un message générique
           setErrorMessage("Erreur lors de l'inscription");
         }
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi de la requête :", error);
    }
  };

  return (
    <div>
      <Navbar />
      <Grid container sx={{ minHeight: "100vh" }}>
        <Container
          maxWidth="sm"
          sx={{
            paddingTop: 5,
            paddingLeft: 3,
            paddingBottom: 5,
            paddingRight: 3,
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
              Inscription professionnel
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    required
                    fullWidth
                    id="nameCompany"
                    label="Nom de votre entreprise"
                    name="nameCompany"
                    autoComplete="name"
                    value={formData.nameCompany}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    fullWidth
                    id="name"
                    label="Nom du gérant"
                    name="name"
                    autoComplete="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="mail"
                    label="Mail de votre entreprise"
                    name="mail"
                    autoComplete="mail"
                    value={formData.mail}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>Votre business</InputLabel>
                    <Select
                      id="statut"
                      name="statut"
                      value={formData.statut}
                      label="Votre business"
                      onChange={handleChange}
                      required
                    >
                      {options?.map((option) => {
                        return (
                          <MenuItem key={option.label} value={option.label}>
                            {option.label ?? option.label}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="phone"
                    label="Téléphone"
                    type="phone"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    autoComplete="phone"
                    placeholder="ex : 0612345678"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LocalPhoneIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="address"
                    label="Adresse"
                    type="adresse"
                    id="address"
                    placeholder="Adresse"
                    value={formData.address}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LocationOn />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item xs={6}>
                  <FormControl fullWidth variant="outlined">
                    <OutlinedInput
                      id="password1"
                      name="password1"
                      type={showPassword1 ? "text" : "password"}
                      value={formData.password1}
                      placeholder="Mot de passe"
                      onChange={handleChange}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword1}
                            onMouseDown={handleMouseDownPassword1}
                            edge="end"
                          >
                            {showPassword1 ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                    <span
                      className={classes.strengthPassword}
                      data-score={score}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={6}>
                  <FormControl fullWidth variant="outlined">
                    <OutlinedInput
                      id="password2"
                      name="password2"
                      type={showPassword2 ? "text" : "password"}
                      placeholder="Confirmez votre mot de passe"
                      value={formData.password2}
                      onChange={handleChange}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword2}
                            onMouseDown={handleMouseDownPassword2}
                            edge="end"
                          >
                            {showPassword2 ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </Grid>
              </Grid>
              {errorMessage && (
                <Typography variant="body1" color="error" gutterBottom>
                  {errorMessage}
                </Typography>
              )}
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
              <Grid container justifyContent="space-between">
                <Grid item>
                  <Link href="/connexion" variant="body2">
                    Déjà un compte ? Connectez-vous!
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/inscription/client" variant="body2">
                    Vous êtes client ?
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
