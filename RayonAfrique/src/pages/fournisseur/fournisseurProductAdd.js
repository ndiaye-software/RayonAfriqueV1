import React, { useEffect, useState } from "react";
import { Stack, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Navbar from "../../components/fournisseur/navbarFournisseur";
import Footer from "../../components/main/footer";
import { InsertPhoto, Save } from "@material-ui/icons";
import { TextField, Button, Grid } from "@material-ui/core";
import { FormControl, InputLabel, Select } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { MenuItem } from "@mui/material";
import InsertImage from "../../images/insertimage.png";
import { useParams } from "react-router-dom";
import hostname from "../../hostname";

const useStyles = makeStyles(() => ({
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
}));

function FournisseurProductAdd() {
  const classes = useStyles();

  const { idUser } = useParams();

  const [errorMessage, setErrorMessage] = useState("");

  const [response, setResponse] = useState(false);

  const [country, setCountry] = useState([]);
  useEffect(() => {
    fetch(`${hostname}/api/v1/country/read`)
      .then((res) => res.json())
      .then((data) => setCountry(data.map((item) => item.countryName)))
      .catch((err) => console.log(err));
  }, []);

  const [category, setCategory] = useState([]);
  useEffect(() => {
    fetch(`${hostname}/api/v1/category/read`)
      .then((res) => res.json())
      .then((data) => setCategory(data.map((item) => item.nameCategory)))
      .catch((err) => console.log(err));
  }, []);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDispo, setSelectedDispo] = useState("");

  const handleChangeCountry = (event) => {
    setSelectedCountry(event.target.value);
    setFormData({
      ...formData,
      pays: event.target.value,
    });
  };

  const handleChangeCategory = (event) => {
    setSelectedCategory(event.target.value);
    setFormData({
      ...formData,
      categorie: event.target.value,
    });
  };

  const handleChangeDisponibilite = (event) => {
    const disponibiliteValue = event.target.value === "oui"; // ou event.target.value.toLowerCase() === "oui" pour être insensible à la casse
    setSelectedDispo(event.target.value);
    setFormData({
      ...formData,
      disponibilité: disponibiliteValue,
    });
  };
  

  const [formData, setFormData] = useState({
    name: "",
    reference: "",
    prix: "",
    categorie: "",
    pays: "",
    description: "",
    image: "",
    disponibilité: false,
  });

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      console.log(formData);
      const response = await fetch(
        `${hostname}/api/v1/fournisseurProduct/createProductFournisseur/${idUser}`,
        {
          method: "POST",
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
        if (data.error) {
          // Si le backend renvoie un error d'erreur, l'afficher sur le frontend
          setErrorMessage(data.error);
        } else {
          // Si le message d'erreur n'est pas disponible, afficher un message générique
          setErrorMessage("Erreur lors de la création du produit");
        }
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi de la requête :", error);
      setErrorMessage("Erreur lors de la création du produit");
    }
  };

  if (response) {
    return <div> Produit créé </div>;
  }

  const imageExists = formData && formData.image;

  const options = [{ label: "oui" }, { label: "non" }];

  return (
    <>
      <div>
        <Navbar />
        <Box sx={{ backgroundColor: "#f9fafb" }}>
          <Stack direction="column" justifyContent="center" alignItems="center">
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
                justifyContent="center"
                display="flex"
                flexDirection="column"
                marginBottom="35px"
                marginTop="35px"
                alignItems="center"
              >
                <Box marginBottom="30px">
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
                    <Box
                      alignItems="center"
                      justifyContent="center"
                      display="flex"
                      width="350px"
                    >
                      {" "}
                      <input
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        id="contained-button-file"
                        onChange={handleFileChange}
                        name="image"
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

                <Grid
                  padding="20px"
                  flexDirection="column"
                  justifyContent="center"
                  display="flex"
                  alignItems="center"
                  spacing={2}
                  container
                >
                  <Grid item xs={12} sm={6} fullWidth>
                    <TextField
                      label="Nom du produit"
                      variant="outlined"
                      fullWidth
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} fullWidth>
                    <TextField
                      label="Autre nom du produit"
                      variant="outlined"
                      fullWidth
                      name="reference"
                      value={formData.reference}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel>Pays</InputLabel>
                      <Select
                        name="pays"
                        label="Pays"
                        required
                        value={selectedCountry}
                        onChange={handleChangeCountry}
                      >
                        {country.map((countryName) => {
                          return (
                            <MenuItem
                              sx={{ fontSize: "12px" }}
                              key={countryName}
                              value={countryName}
                            >
                              {countryName}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel>Catégorie</InputLabel>
                      <Select
                        required
                        value={selectedCategory}
                        label="Catégorie"
                        onChange={handleChangeCategory}
                        name="categorie"
                      >
                        {category?.map((nameCategory) => {
                          return (
                            <MenuItem
                              sx={{ fontSize: "12px" }}
                              key={nameCategory}
                              value={nameCategory}
                            >
                              {nameCategory}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Prix"
                      variant="outlined"
                      fullWidth
                      name="prix"
                      placeholder="ex : 1.11"
                      value={formData.prix}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel>Disponible</InputLabel>
                      <Select
                        label="Disponible"
                        required
                        name="disponibilité"
                        value={selectedDispo}
                        onChange={handleChangeDisponibilite}
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
                </Grid>
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
                <Button type="submit" className={classes.Button} endIcon={<Save />}>
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

export default FournisseurProductAdd;
