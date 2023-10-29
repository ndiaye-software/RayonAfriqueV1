import React, { useEffect, useState } from "react";
import { Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Navbar from "../../components/fournisseur/navbarFournisseur";
import Footer from "../../components/main/footer";
import { InsertPhoto, Save } from "@material-ui/icons";
import { TextField, Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import InsertImage from "../../images/insertimage.png";
import backgroundImage from "../../images/background.jpg";
import { Typography } from "@material-ui/core";
import { useParams } from "react-router-dom";
import hostname from "../../hostname";

const useStyles = makeStyles((theme) => ({
  section1_div_h1: {
    fontSize: "3.5vw",
    background: "white",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    fontWeight: "bolder",
    marginBottom: "20px",
    zIndex: 2,
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },

  section1_div_h3: {
    fontSize: "2vw",
    background: "white",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    marginBottom: "20px",
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
    whiteSpace: "nowrap",
    overflow: "hidden",
    animation: "$typing 3s, $cursor .4s step-end infinite alternate",
  },
  "@keyframes typing": {
    "0%": {
      width: 0,
    },
    "100%": {
      width: "100%",
    },
  },
  "@keyframes cursor": {
    "0%": {
      borderBottomWidth: 2,
    },
    "100%": {
      borderBottomWidth: 0,
    },
  },

  Button: {
    fontWeight: "bolder",
    color: "white",
    backgroundColor: "#922B21",
    width: "250px",
    minWidth: "250px",
    marginTop: "20px",
    padding: "20px",
    fontSize: "12px",

    "&:hover": {
      backgroundColor: "#A63F35",
    },
  },
  banner: {
    position: "relative",
    width: "100%",
    height: "60vh",
    overflow: "hidden",
    [theme.breakpoints.down("sm")]: {
      height: "50vh",
    },
  },
  bannerImg: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    filter: "blur(2px)",
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: 1,
  },
  bannerText: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 2,
    color: "white",
    [theme.breakpoints.down("sm")]: {
      top: "50%",
      left: "50%",
      justifyContent: "center",
    },
  },
}));

function FournisseurProfile() {
  const classes = useStyles();

  const { idUser } = useParams();

  const [errorMessage, setErrorMessage] = useState("");

  const [response, setResponse] = useState(false);

  const [formData, setFormData] = useState({
    nameCompany: "",
    nameUser: "",
    phone: "",
    mail: "",
    address: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    fetch(`${hostname}/api/v1/user/readUser/${idUser}`)
      .then((res) => res.json())
      .then((userData) => {
        setFormData(userData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [idUser]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `${hostname}/api/v1/user/update/${idUser}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...formData }),
        }
      );

      if (response.ok) {
        setResponse(true);
      } else {
        const data = await response.json();
        if (data.message) {
          // Si le backend renvoie un message d'erreur, l'afficher sur le frontend
          setErrorMessage(data.message);
        } else {
          // Si le message d'erreur n'est pas disponible, afficher un message générique
          setErrorMessage("Erreur lors de la mise à jour du profil else");
        }
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi de la requête :", error);
      setErrorMessage("Erreur lors de la mise à jour du profil error");
    }
  };

  if (response) {
    return <div> Modifications enregistrées </div>;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // L'utilisateur a choisi un fichier, mettez à jour l'état du formulaire
      setFormData({ ...formData, image: URL.createObjectURL(file) });
    }
  };

  const imageExists = formData && formData.image;

  return (
    <>
      <div>
        <Navbar />
        <section className={classes.banner}>
          <div className={classes.bannerImg}></div>
          <div className={classes.bannerText}>
            <Typography variant="h1" className={classes.section1_div_h1}>
              RayonAfrique+
            </Typography>
            <Typography variant="h3" className={classes.section1_div_h3}>
              Gérez votre profil !
            </Typography>
          </div>
        </section>
        <Box sx={{ backgroundColor: "#f9fafb" }}>
          <Stack direction="row" justifyContent="space-between">
            <Box
              flex={4}
              p={{ xs: 0, md: 2 }}
              sx={{ marginBottom: "60px" }}
              onSubmit={handleSubmit}
              component="form"
              noValidate
            >
              <Box
                flexWrap="wrap"
                justifyContent="space-evenly"
                display="flex"
                flexDirection="row"
                marginBottom="35px"
                marginTop="35px"
              >
                <Box>
                  <div>
                    <Box>
                      {imageExists ? (
                        <img
                          src={formData.image}
                          alt="insérée"
                          height="300px"
                          width="350px"
                          name="image"
                        />
                      ) : (
                        <img
                          src={InsertImage}
                          alt="insérée"
                          height="300px"
                          width="350px"
                        />
                      )}
                    </Box>
                    <Box justifyContent="center" display="flex" width="350px">
                      {" "}
                      <input
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        id="contained-button-file"
                        onChange={handleFileChange}
                      />
                      <label htmlFor="contained-button-file">
                        <Button
                          fullWidth
                          className={classes.Button}
                          component="span"
                          endIcon={<InsertPhoto />}
                        >
                          Insérer une photo
                        </Button>
                      </label>
                    </Box>
                  </div>
                </Box>

                <Box
                  padding="20px"
                  maxWidth="600px"
                  flexDirection="column"
                  display="flex"
                  gap={2}
                >
                  <Grid item xs={12} fullWidth>
                    <TextField
                      label="Nom de l'épicerie"
                      variant="outlined"
                      fullWidth
                      name="nameCompany"
                      value={formData.nameCompany}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Nom du gérant"
                      variant="outlined"
                      fullWidth
                      name="nameUser"
                      value={formData.nameUser}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Téléphone"
                      variant="outlined"
                      fullWidth
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Mail"
                      variant="outlined"
                      fullWidth
                      name="mail"
                      value={formData.mail}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Adresse"
                      variant="outlined"
                      fullWidth
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                    />
                  </Grid>
                </Box>
              </Box>

              <Box justifyContent="center" display="flex">
                <Box
                  sx={{
                    textAlign: "center",
                    width: { xs: "250px", sm: "500px" },
                  }}
                >
                  <TextField
                    label="Description"
                    variant="outlined"
                    fullWidth
                    name="description"
                    multiline
                    minRows={5}
                    value={formData.description}
                    onChange={handleChange}
                  />
                </Box>
              </Box>
              {errorMessage && (
                <Typography variant="body1" color="error" gutterBottom>
                  {errorMessage}
                </Typography>
              )}
              <Box justifyContent="center" display="flex" marginTop="30px">
                <Button
                  type="submit"
                  className={classes.Button}
                  endIcon={<Save />}
                >
                  Enregistrer
                </Button>
              </Box>
            </Box>
          </Stack>
        </Box>
        <Footer />
      </div>
    </>
  );
}

export default FournisseurProfile;
