import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { makeStyles } from "@material-ui/core/styles";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { IconButton } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import Navbar from "../../../components/main/navbar";
import hostname from "../../../hostname";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FormControl } from "@material-ui/core";
import OutlinedInput from "@mui/material/OutlinedInput";
import frontend_name from "../../../frontend_name";
import { Helmet } from "react-helmet";

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

export default function Modification() {
  const { id, token } = useParams();

  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    mail: "",
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

    try {
      const response = await fetch(
        `${hostname}/api/v1/epicerie/auth/modification/${id}/${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...formData }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.message) {
          toast.success(data.message);
        }
        window.location.assign(`${frontend_name}/connexion`);
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

  return (
    <div>
      <Helmet>
        <meta name="description" content="RayonAfrique - modification mot de passe" />
      </Helmet>
      <Navbar />
      <Grid container sx={{ minHeight: "100vh" }}>
        <Container
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
            <Avatar sx={{ m: 1, bgcolor: "#922B21" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Modification mot de passe
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
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

                <Grid item xs={12}>
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
                Modifier
              </Button>
            </Box>

            <div>
              <ToastContainer theme="colored" />
            </div>

            {errorMessage && (
              <Typography variant="body1" color="error" gutterBottom>
                {errorMessage}
              </Typography>
            )}
          </Box>
        </Container>
      </Grid>
    </div>
  );
}
