import React, { useEffect, useState } from "react";
import { IconButton, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Navbar from "../../../components/epicerie/navbarEpicerie";
import Footer from "../../../components/main/footer";
import { InsertPhoto, Save } from "@material-ui/icons";
import { TextField, Button, Grid, Typography } from "@material-ui/core";
import { FormControl, InputLabel, Select } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { MenuItem } from "@mui/material";
import InsertImage from "../../../images/insertimage.png";
import hostname from "../../../hostname";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

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

function EpicerieProductCreate() {
  const [countryInput, setCountryInput] = useState("");
  const [isCountryClicked, setIsCountryClicked] = useState(false);
  const handleToggleCountry = () => {
    setIsCountryClicked((prevIsCountryClicked) => !prevIsCountryClicked);
  };

  const [labelInput, setLabelInput] = useState("");
  const [isLabelClicked, setIsLabelClicked] = useState(false);
  const handleToggleLabel = () => {
    setIsLabelClicked((prevIsLabelClicked) => !prevIsLabelClicked);
  };

  const [categoryInput, setCategoryInput] = useState("");
  const [isCategoryClicked, setIsCategoryClicked] = useState(false);
  const handleToggleCategory = () => {
    setIsCategoryClicked((prevIsCategoryClicked) => !prevIsCategoryClicked);
  };
  const [country, setCountry] = useState([]);
  useEffect(() => {
    fetch(`${hostname}/api/v1/user/country/read`)
      .then((res) => res.json())
      .then((data) => setCountry(data.map((item) => item.countryName)))
      .catch((err) => console.log(err));
  }, []);

  const [marque, setMarque] = useState([]);
  useEffect(() => {
    fetch(`${hostname}/api/v1/user/label/read`)
      .then((res) => res.json())
      .then((data) => setMarque(data.map((item) => item.labelName)))
      .catch((err) => console.log(err));
  }, []);

  const [category, setCategory] = useState([]);
  useEffect(() => {
    fetch(`${hostname}/api/v1/user/category/read`)
      .then((res) => res.json())
      .then((data) => setCategory(data.map((item) => item.categoryName)))
      .catch((err) => console.log(err));
  }, []);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedMarque, setSelectedMarque] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleChangeCountry = (event) => {
    const { value } = event.target;
    setSelectedCountry(value); // Mise à jour du state
    setFormData({        // Mise à jour de formData
      ...formData,
      country: value,
    });
  };

  const handleChangeMarque = (event) => {
    const { value } = event.target;
    setSelectedMarque(value); // Mise à jour du state
    setFormData({        // Mise à jour de formData
      ...formData,
      label: value,
    });
  };

  const handleChangeCategory = (event) => {
    const { value } = event.target;
    setSelectedCategory(value); // Mise à jour du state
    setFormData({        // Mise à jour de formData
      ...formData,
      category: value,
    });
  };

  const [imageSrc, setImageSrc] = useState(""); // State pour stocker l'URL de l'image

  // Fonction pour gérer le changement de fichier
  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Récupérer le fichier sélectionné
    const reader = new FileReader(); // Créer un lecteur de fichier
  
    reader.onloadend = () => {
      setImageSrc(reader.result);
    };
  
    if (file) {
      reader.readAsDataURL(file); // Commencer à lire le fichier en tant que données URL
      setFormData({        // Mise à jour de formData
        ...formData,
        image: file,
      });
    }
  }

  const [formData, setFormData] = useState({
    name: "",
    reference: "",
    ingredients: "",
    description: "",
    image: "",
    category: "",
    country: "",
    label: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      setError("Access token is missing");
      return;
    }

    try {
      console.log(formData)
      /* const response = await fetch(
        `${hostname}/api/v1/epicerie/product/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(formData),
        }
      );

      console.log(formData);

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        navigate(`/epicerie/produit`);
      } else {
        const data = await response.json();
        if (data.message) {
          setErrorMessage(data.message);
        } else {
          setErrorMessage("Erreur lors de la création du produit");
        }
      } */
    } catch (error) {
      console.error("Erreur lors de la création du produit :", error);
    }
  };

  const classes = useStyles();

  return (
    <>
      <div>
        <Navbar />
        <Box
          sx={{ backgroundColor: "#f9fafb" }}
          component="form"
          onSubmit={handleSubmit}
        >
          <Stack direction="row" justifyContent="space-between">
            <Box
              container
              flex={4}
              p={{ xs: 0, md: 2 }}
              sx={{ marginBottom: "60px" }}
            >
              <Box
                marginBottom="35px"
                marginTop="35px"
                paddingLeft="50px"
                paddingRight="50px"
              >
                <Grid container wrap spacing="30px">
                  <Grid
                    md={7}
                    xs={12}
                    justifyContent="center"
                    display="flex"
                    flexDirection="column"
                  >
                    <Box>
                      <img
                        src={imageSrc || InsertImage}
                        alt="insérée"
                        height="300px"
                        width="350px"
                      />
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
                  </Grid>

                  <Grid
                    md={5}
                    xs={12}
                    padding="20px"
                    maxWidth="600px"
                    flexDirection="column"
                    display="flex"
                    spacing={2}
                    container
                  >
                    <Grid item xs={12} fullWidth>
                      <TextField
                        label="Nom du produit"
                        variant="outlined"
                        fullWidth
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Autre nom"
                        variant="outlined"
                        fullWidth
                        name="reference"
                        value={formData.reference}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Ingredients"
                        variant="outlined"
                        fullWidth
                        name="ingredients"
                        value={formData.ingredients}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl
                        fullWidth
                        variant="outlined"
                        sx={{
                          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                            {
                              borderColor: "black", // Change this to your desired color
                            },
                          "& .MuiInputLabel-outlined.Mui-focused": {
                            color: "black", // Change this to your desired color
                          },
                        }}
                      >
                        <InputLabel style={{ fontSize: "12px" }}>
                          Pays
                        </InputLabel>
                        <Select
                          value={selectedCountry}
                          name="country"
                          label="Pays"
                          onChange={handleChangeCountry}
                          required
                          style={{ fontSize: "12px", color: "black" }}
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
                    <Grid item xs={12}>
                      {/* Render TextField for "Autre" if button is clicked */}
                      {isCountryClicked && (
                        <TextField
                          label="Autre"
                          variant="outlined"
                          fullWidth
                          name="autreInput"
                          value={countryInput}
                          onChange={(event) =>
                            setCountryInput(event.target.value)
                          }
                        />
                      )}
                      <Grid container>
                        <Grid
                          item
                          xs={2}
                          variant="body2"
                          color="inherit"
                          sx={{ display: "flex", alignItems: "center" }}
                        >
                          <IconButton fullWidth onClick={handleToggleCountry}>
                            <Add
                              sx={{
                                backgroundColor: "#922B21",
                                borderRadius: "50%",
                                padding: "5px",
                                fontSize: "20px",
                                color: "white",
                              }}
                            />
                          </IconButton>
                        </Grid>
                        <Grid
                          item
                          xs={10}
                          variant="body2"
                          color="inherit"
                          sx={{ display: "flex", alignItems: "center" }}
                        >
                          <Typography variant="body2">
                            Ajouter un nouveau pays
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl
                        fullWidth
                        variant="outlined"
                        sx={{
                          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                            {
                              borderColor: "black", // Change this to your desired color
                            },
                          "& .MuiInputLabel-outlined.Mui-focused": {
                            color: "black", // Change this to your desired color
                          },
                        }}
                      >
                        <InputLabel style={{ fontSize: "12px" }}>
                          Catégorie
                        </InputLabel>
                        <Select
                          value={selectedCategory}
                          label="Catégorie"
                          name="category"
                          onChange={handleChangeCategory}
                          required
                          style={{ fontSize: "12px" }}
                        >
                          {category?.map((categoryName) => {
                            return (
                              <MenuItem
                                sx={{ fontSize: "12px" }}
                                key={categoryName}
                                value={categoryName}
                              >
                                {categoryName}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      {/* Render TextField for "Autre" if button is clicked */}
                      {isCategoryClicked && (
                        <TextField
                          label="Autre"
                          variant="outlined"
                          fullWidth
                          name="autreInput"
                          value={categoryInput}
                          onChange={(event) =>
                            setCategoryInput(event.target.value)
                          }
                        />
                      )}
                      <Grid container>
                        <Grid
                          item
                          xs={2}
                          sx={{ display: "flex", alignItems: "center" }}
                        >
                          <IconButton fullWidth onClick={handleToggleCategory}>
                            <Add
                              sx={{
                                backgroundColor: "#922B21",
                                borderRadius: "50%",
                                padding: "5px",
                                fontSize: "20px",
                                color: "white",
                              }}
                            />
                          </IconButton>
                        </Grid>
                        <Grid
                          item
                          xs={10}
                          sx={{ display: "flex", alignItems: "center" }}
                        >
                          <Typography variant="body2">
                            Ajouter une nouvelle catégorie
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl
                        fullWidth
                        variant="outlined"
                        sx={{
                          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                            {
                              borderColor: "black", // Change this to your desired color
                            },
                          "& .MuiInputLabel-outlined.Mui-focused": {
                            color: "black", // Change this to your desired color
                          },
                        }}
                      >
                        <InputLabel style={{ fontSize: "12px" }}>
                          Marque
                        </InputLabel>
                        <Select
                          value={selectedMarque}
                          label="Marque"
                          name="label"
                          onChange={handleChangeMarque}
                          required
                          style={{ fontSize: "12px" }}
                        >
                          {marque?.map((nameCompany) => {
                            return (
                              <MenuItem
                                sx={{ fontSize: "12px" }}
                                key={nameCompany}
                                value={nameCompany}
                              >
                                {nameCompany}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      {isLabelClicked && (
                        <TextField
                          label="Autre"
                          variant="outlined"
                          fullWidth
                          name="autreInput"
                          value={labelInput}
                          onChange={(event) =>
                            setLabelInput(event.target.value)
                          }
                        />
                      )}
                      <Grid container>
                        <Grid
                          item
                          xs={2}
                          sx={{ display: "flex", alignItems: "center" }}
                        >
                          <IconButton fullWidth onClick={handleToggleLabel}>
                            <Add
                              sx={{
                                backgroundColor: "#922B21",
                                borderRadius: "50%",
                                padding: "5px",
                                fontSize: "20px",
                                color: "white",
                              }}
                            />
                          </IconButton>
                        </Grid>
                        <Grid
                          item
                          xs={10}
                          sx={{ display: "flex", alignItems: "center" }}
                        >
                          <Typography variant="body2">
                            Ajouter une nouvelle marque
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
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
                    value={formData.description}
                    onChange={handleChange}
                    label="Description"
                    variant="outlined"
                    fullWidth
                    name="description"
                    multiline
                    minRows={5}
                  />
                </Box>
              </Box>
            </Box>
          </Stack>
          <Box justifyContent="center" display="flex" marginBottom="30px">
            <Button type="submit" className={classes.Button} endIcon={<Save />}>
              Enregistrer
            </Button>
          </Box>
        </Box>
        <Footer />
      </div>
    </>
  );
}

export default EpicerieProductCreate;
