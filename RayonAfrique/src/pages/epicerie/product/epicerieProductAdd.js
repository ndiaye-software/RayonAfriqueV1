import React, { useState, useEffect, useCallback } from "react";
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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet";

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
        credentials: 'include',
      });
  
      if (response.ok) {
        const { accessToken } = await response.json();
        localStorage.setItem("accessToken", accessToken);
        return accessToken; // Return the new access token
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
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      redirectToLogin();
      return;
    }
  
    const fetchProductData = async () => {
      try {
        const response = await fetch(
          `${hostname}/api/v1/epicerie/product/read/${idProduct}`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
  
        if (response.status === 401 || response.status === 403) {;
          const newAccessToken = await handleRefreshToken();
          if (newAccessToken) {
            const retryResponse = await fetch(
              `${hostname}/api/v1/epicerie/product/read/${idProduct}`,
              {
                headers: { Authorization: `Bearer ${newAccessToken}` },
              }
            );
            if (!retryResponse.ok) {
              throw new Error(`Error ${retryResponse.status}: ${retryResponse.statusText}`);
            }
            const data = await retryResponse.json();
            setData(data);
            return;
          }
        }
  
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
  
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchProductData();
  }, [idProduct, handleRefreshToken]);
  

  const [disponibilité, setDispo] = React.useState(options[0]?.label || "");

  const [formData, setFormData] = useState({
    idProduct: idProduct,
    price: "",
    available: disponibilité === "oui",
  });

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
    const booleanValue =
      options.find((option) => option.label === value)?.value || false;

    // Appel de la fonction pour mettre à jour formData
    updateFormData("available", booleanValue);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      toast.error("Access token is missing");
      return;
    }

    try {
      const response = await fetch(
        `${hostname}/api/v1/epicerie/productEpicerie/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        navigate(`/epicerie/produit`);
      } else {
        const data = await response.json();
        if (data.message) {
          toast.error(data.message);
        } else {
          toast.error("Erreur lors de la création du produit");
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
      <Helmet>
          <meta
            name="description"
            content="RayonAfrique - epicerie africaine - Ajout"
          />
        </Helmet>
        <Navbar />
        <Box sx={{ backgroundColor: "#f9fafb" }}>
          <Stack direction="column" justifyContent="center">
            <Box
              flex={4}
              p={{ xs: 0, md: 2 }}
              sx={{ marginBottom: "60px" }}
              component="form"
              onSubmit={handleSubmit}
            >
              <Box
                flexWrap="wrap"
                justifyContent="center"
                display="flex"
                flexDirection="column"
                alignContent="center"
                marginBottom="35px"
                marginTop="35px"
                noValidate
              >
                <Box>
                  <div>
                    <Box>
                      {data.image && (
                        <img
                          src={data.image}
                          alt="Product"
                          height="300px"
                          width="350px"
                        />
                      )}
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
              <div>
                <ToastContainer theme="colored" />
              </div>
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
