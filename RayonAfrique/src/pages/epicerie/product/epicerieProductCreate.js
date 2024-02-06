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
  // State to track whether "Autre" button is clicked
  const [isAutreClicked, setIsAutreClicked] = useState(false);

  // State to store the input value for "Autre"
  const [autreInput, setAutreInput] = useState("");

  // Event handler for toggling "Autre" button
  const handleToggleAutre = () => {
    setIsAutreClicked((prevIsAutreClicked) => !prevIsAutreClicked);
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
    setSelectedCountry(event.target.value);
  };

  const handleChangeMarque = (event) => {
    setSelectedMarque(event.target.value);
  };

  const handleChangeCategory = (event) => {
    setSelectedCategory(event.target.value);
  };

  const classes = useStyles();

  return (
    <>
      <div>
        <Navbar />
        <Box sx={{ backgroundColor: "#f9fafb" }}>
          <Stack direction="row" justifyContent="space-between">
            <Box
              container
              flex={4}
              p={{ xs: 0, md: 2 }}
              sx={{ marginBottom: "60px" }}
            >
              <Box
                flexWrap="wrap"
                justifyContent="space-evenly"
                display="flex"
                flexDirection="row"
                marginBottom="35px"
                marginTop="35px"
              >
                <Grid container>
                  <Grid xs={7}>
                    <div>
                      <Box>
                        <img
                          src={InsertImage}
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
                  </Grid>

                  <Grid
                    xs={5}
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
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Reference"
                        variant="outlined"
                        fullWidth
                        name="reference"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Ingredients"
                        variant="outlined"
                        fullWidth
                        name="ingredients"
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
                      {isAutreClicked && (
                        <TextField
                          label="Autre"
                          variant="outlined"
                          fullWidth
                          name="autreInput"
                          value={autreInput}
                          onChange={(event) =>
                            setAutreInput(event.target.value)
                          }
                        />
                      )}
                      <Grid container>
                        <Grid
                          item
                          xs={2}
                          sx={{ display: "flex", alignItems: "center" }}
                        >
                          <IconButton fullWidth onClick={handleToggleAutre}>
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
                            Ajouter un nouveau produit
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
                      {isAutreClicked && (
                        <TextField
                          label="Autre"
                          variant="outlined"
                          fullWidth
                          name="autreInput"
                          value={autreInput}
                          onChange={(event) =>
                            setAutreInput(event.target.value)
                          }
                        />
                      )}
                      <Grid container>
                        <Grid
                          item
                          xs={2}
                          sx={{ display: "flex", alignItems: "center" }}
                        >
                          <IconButton fullWidth onClick={handleToggleAutre}>
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
                            Ajouter un nouveau produit
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
                      {/* Render TextField for "Autre" if button is clicked */}
                      {isAutreClicked && (
                        <TextField
                          label="Autre"
                          variant="outlined"
                          fullWidth
                          name="autreInput"
                          value={autreInput}
                          onChange={(event) =>
                            setAutreInput(event.target.value)
                          }
                        />
                      )}
                      <Grid container>
                        <Grid
                          item
                          xs={2}
                          sx={{ display: "flex", alignItems: "center" }}
                        >
                          <IconButton fullWidth onClick={handleToggleAutre}>
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
                            Ajouter un nouveau produit
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
                    label="Description"
                    variant="outlined"
                    fullWidth
                    name="Description"
                    multiline
                    minRows={5}
                  />
                </Box>
              </Box>
            </Box>
          </Stack>
          <Box justifyContent="center" display="flex" marginBottom="30px">
            <Button className={classes.Button} endIcon={<Save />}>
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
