import React, { useEffect, useState, useCallback } from "react";
import { Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Navbar from "../../../components/epicerie/navbarEpicerie";
import Footer from "../../../components/main/footer";
import { InsertPhoto, Save } from "@material-ui/icons";
import { TextField, Button, Grid } from "@material-ui/core";
import { FormControl, InputLabel, Select } from "@material-ui/core";
import { MenuItem } from "@mui/material";
import InsertImage from "../../../images/insertimage.png";
import hostname from "../../../hostname";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet";
import { v4 as uuidv4 } from "uuid";
import useStyles from "../../../styles/pages/epicerie/product/epicerieProductCreate";

function EpicerieProductCreate() {
  const [isCountryClicked, setIsCountryClicked] = useState(false);
  const [isLabelClicked, setIsLabelClicked] = useState(false);
  const [isCategoryClicked, setIsCategoryClicked] = useState(false);

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
    setSelectedCountry(value);
    if (value === "Autre") {
      setIsCountryClicked(true);
      setFormData({
        ...formData,
        country: "",
      });
    } else {
      setIsCountryClicked(false);
      setFormData({
        ...formData,
        country: value,
      });
    }
  };

  const handleChangeMarque = (event) => {
    const { value } = event.target;
    setSelectedMarque(value);
    if (value === "Autre") {
      setIsLabelClicked(true);
      setFormData({
        ...formData,
        label: "",
      });
    } else {
      setIsLabelClicked(false);
      setFormData({
        ...formData,
        label: value,
      });
    }
  };

  const handleChangeCategory = (event) => {
    const { value } = event.target;
    setSelectedCategory(value);
    if (value === "Autre") {
      setIsCategoryClicked(true);
      setFormData({
        ...formData,
        category: "",
      });
    } else {
      setIsCategoryClicked(false);
      setFormData({
        ...formData,
        category: value,
      });
    }
  };

  const [imageSrc, setImageSrc] = useState(""); // State pour stocker l'URL de l'image

  // Fonction pour gérer le changement de fichier
  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Get the selected file
    const reader = new FileReader();

    reader.onloadend = () => {
      setImageSrc(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
      setFormData((prevFormData) => ({
        ...prevFormData,
        image: file,
      }));
    }
  };

  const [formData, setFormData] = useState({
    name: "",
    reference: "",
    ingredients: "",
    description: "",
    image: "",
    category: "",
    country: "",
    label: "",
    autreCountry: "",
    autreCategory: "",
    autreLabel: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const redirectToLogin = () => {
    localStorage.removeItem("accessToken");

    window.location.href = "/connexion";
  };

  const handleRefreshToken = useCallback(async () => {
    try {
      const response = await fetch(`${hostname}/api/v1/epicerie/auth/refresh`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.ok) {
        const { accessToken } = await response.json();
        localStorage.setItem("accessToken", accessToken);
        return accessToken;
      } else {
        const data = await response.json();
        if (data.message) {
          toast.error(data.message);
        } else {
          toast("Erreur d'authentification");
        }
        redirectToLogin();
      }
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      redirectToLogin();
    }
  }, []);

  useEffect(() => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        redirectToLogin();
        return;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [handleRefreshToken]);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      toast("Access token is missing");
      return;
    }

    try {
      // 1. Upload image to Cloudinary
      const formDataImage = new FormData();
      formDataImage.append("file", formData.image);
      formDataImage.append(
        "upload_preset",
        process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
      );
      formDataImage.append("public_id", uuidv4());

      const cloudinaryResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formDataImage,
          credentials: "omit",
        }
      );

      if (!cloudinaryResponse.ok) {
        throw new Error("Failed to upload image");
      }

      const cloudinaryData = await cloudinaryResponse.json();
      const imageUrl = cloudinaryData.secure_url;

      const dataToSend = {
        image: imageUrl,
        name: formData.name,
        reference: formData.reference,
        ingredients: formData.ingredients,
        description: formData.description,
        category: formData.category,
        country: formData.country,
        label: formData.label,
        autreCategory: formData.autreCategory,
        autreCountry: formData.autreCountry,
        autreLabel: formData.autreLabel,
      };

      console.log(dataToSend);

      const response = await fetch(
        `${hostname}/api/v1/epicerie/product/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(dataToSend),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setTimeout(() => {
          navigate(`/epicerie/produit/search/${data.id}/add`);
        }, 1500);
      } else {
        const data = await response.json();
        if (data.message) {
          toast.error(data.message);
        } else {
          toast.error("Erreur lors de la création du produit");
        }
      }
    } catch (error) {
      console.log("Erreur lors de la création du produit :", error);
    }
  };

  const classes = useStyles();

  return (
    <>
      <div>
        <Helmet>
          <meta
            name="description"
            content="Création de produit pour l'épicerie sur RayonAfrique - Créez de nouveaux produits authentiques africains à vendre sur notre plateforme et atteignez un large public."
          />
          <meta
            name="keywords"
            content="RayonAfrique, créer produit, épicerie africaine, produits authentiques africains, vendre en ligne, création catalogue, vendre produits africains"
          />
          <meta name="author" content="RayonAfrique" />
          <meta
            property="og:image"
            content="https://res.cloudinary.com/dpodybbfe/image/upload/v1719949488/rayonafrique_wsbbxn.png"
          />
        </Helmet>

        <Navbar />
        <Box
          sx={{ backgroundColor: "#f9fafb" }}
          component="form"
          onSubmit={handleSubmit}
        >
          <Stack direction="row" justifyContent="space-between">
            <Box flex={4} p={{ xs: 0, md: 2 }} sx={{ marginBottom: "60px" }}>
              <Box
                marginBottom="35px"
                marginTop="35px"
                paddingLeft="50px"
                paddingRight="50px"
              >
                <Grid container wrap="wrap" spacing={5}>
                  <Grid
                    item
                    md={7}
                    xs={12}
                    display="flex"
                    flexdirection="column"
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
                    item
                    md={5}
                    xs={12}
                    padding="20px"
                    spacing={2}
                    container
                  >
                    <Grid item xs={12}>
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
                          style={{ fontSize: "12px", color: "black" }}
                        >
                          <MenuItem
                            sx={{ fontSize: "12px" }}
                            key="autre"
                            value="Autre"
                          >
                            Autre
                          </MenuItem>
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
                          name="autreCountry"
                          value={formData.autreCountry}
                          onChange={handleChange}
                        />
                      )}
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
                          style={{ fontSize: "12px" }}
                        >
                          <MenuItem
                            sx={{ fontSize: "12px" }}
                            key="autre"
                            value="Autre"
                          >
                            Autre
                          </MenuItem>
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
                          name="autreCategory"
                          value={formData.autreCategory}
                          onChange={handleChange}
                        />
                      )}
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
                          style={{ fontSize: "12px" }}
                        >
                          <MenuItem
                            sx={{ fontSize: "12px" }}
                            key="autre"
                            value="Autre"
                          >
                            Autre
                          </MenuItem>
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
                          name="autreLabel"
                          value={formData.autreLabel}
                          onChange={handleChange}
                        />
                      )}
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
        <div>
          <ToastContainer theme="colored" />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default EpicerieProductCreate;
