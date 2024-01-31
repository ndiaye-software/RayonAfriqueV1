import React, { useState, useEffect } from "react";
import { Stack, Tooltip, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Navbar from "../../../components/epicerie/navbarEpicerie";
import Footer from "../../../components/main/footer";
import { Add } from "@material-ui/icons";
import { TextField, Button, Grid } from "@material-ui/core";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import hostname from "../../../hostname";
import { useParams } from "react-router-dom";
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

const options = [
  { label: "oui", value: true },
  { label: "non", value: false },
];

function EpicerieProductAdd() {
  const navigate = useNavigate();

  const [data, setData] = useState([]);

  const { idProduct } = useParams();
  const { idEpicerie } = useParams();

  useEffect(() => {
    fetch(`${hostname}/api/v1/epicerie/product/read/${idProduct}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
      .catch((err) => console.log(err));
  }, [idProduct]);

  const [disponibilité, setDispo] = React.useState(options[0]?.label || "");

  

  const [formData, setFormData] = useState({
    idProduct: idProduct,
    price: "",
    available: disponibilité === "oui",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const updateFormData = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleChangeDispo = (event) => {
    const value = event.target.value;
    setDispo(value);
  
    // Utilisez la valeur de l'option "value"
    const booleanValue = options.find(option => option.label === value)?.value || false;
  
    // Appel de la fonction pour mettre à jour formData
    updateFormData("available", booleanValue);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `${hostname}/api/v1/epicerie/productEpicerie/create/${idEpicerie}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );      

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        navigate(`/success`);
      } else {
        const data = await response.json();
        if (data.message) {
          setErrorMessage(data.message);
        } else {
          setErrorMessage("Erreur lors de la création du produit");
        }
      }
    } catch (error) {
      console.error("Erreur lors de la création du produit :", error);
    }
  };

  const classes = useStyles();

  return (
    <>
      <div>
        <Navbar />
        <Box sx={{ backgroundColor: "#f9fafb" }}>
          <Stack direction="column" justifyContent="center">
            <Box flex={4} p={{ xs: 0, md: 2 }} sx={{ marginBottom: "60px" }}>
              <Box
                flexWrap="wrap"
                justifyContent="center"
                display="flex"
                flexDirection="column"
                alignContent="center"
                marginBottom="35px"
                marginTop="35px"
                component="form"
                onSubmit={handleSubmit}
                noValidate
              >
                <Box>
                  <div>
                    <Box>
                      <img
                        src={data.image}
                        alt={data.name}
                        height="300px"
                        width="350px"
                      />
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
                  <Box textAlign="center">
                    <Typography variant="h6">
                      {data.name} - {data.labelName}
                    </Typography>
                  </Box>

                  <Grid item xs={12}>
                    <TextField
                      label="Prix"
                      variant="outlined"
                      fullWidth
                      name="price"
                      placeholder="ex : 1.11"
                      id="price"
                      value={formData.price}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Tooltip title="Marquez comme disponible sur votre épicerie">
                      <FormControl fullWidth variant="outlined">
                        <InputLabel>Disponibilité</InputLabel>
                        <Select
                          value={disponibilité}
                          label="Disponibilité"
                          onChange={handleChangeDispo}
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
                    </Tooltip>
                  </Grid>
                </Box>
              </Box>
              {errorMessage && (
                <Typography variant="body1" color="error" gutterBottom>
                  {errorMessage}
                </Typography>
              )}
              <Box
                justifyContent="space-evenly"
                display="flex"
                marginTop="30px"
              >
                <Button
                  type="submit"
                  className={classes.Button}
                  endIcon={<Add />}
                >
                  Ajouter ce produit
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

export default EpicerieProductAdd;
