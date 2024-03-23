import React, { useState, useEffect } from "react";
import { Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Navbar from "../../../components/epicerie/navbarEpicerie";
import Footer from "../../../components/main/footer";
import { InsertPhoto, Save } from "@material-ui/icons";
import { TextField, Button, Grid } from "@material-ui/core";
import { FormControl, InputLabel, Select } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { MenuItem } from "@mui/material";
import { useParams } from "react-router-dom";
import hostname from "../../../hostname";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

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

const options = [{ label: "oui" }, { label: "non" }];

function EpicerieProductUpdate() {
  const classes = useStyles();
  const navigate = useNavigate();
  const { idProduct } = useParams();

  // Initialize state variables outside of conditional blocks
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [disponibilité, setDispo] = useState(options[0]?.label || "");
  const [formData, setFormData] = useState({
    idProduct: idProduct,
    price: "",
    available: disponibilité === "oui",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await fetch(
          `${hostname}/api/v1/epicerie/productEpicerie/read/${idProduct}`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setData(data[0]);
        console.log(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [idProduct]);

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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>No data available</div>;
  }

  return (
    <>
      <div>
        <Navbar />
        <Box sx={{ backgroundColor: "#f9fafb" }}>
          <Stack direction="row" justifyContent="space-between">
            <Box
              flex={4}
              p={{ xs: 0, md: 2 }}
              sx={{ marginBottom: "60px" }}
              onSubmit={handleSubmit}
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
                      <img
                        src={require(`../../../images/${data.image}`)}
                        alt="insérée"
                        height="300px"
                        width="350px"
                        onChange={handleChange}
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
                </Box>

                <Box
                  padding="20px"
                  maxWidth="600px"
                  flexDirection="column"
                  display="flex"
                  gap={2}
                >
                  <Grid item xs={12}>
                    <TextField
                      label="Prix"
                      variant="outlined"
                      fullWidth
                      name="price"
                      value={data.price}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel>Disponibilité</InputLabel>
                      <Select
                        value={data.available}
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
                  </Grid>
                </Box>
              </Box>

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
            <div>
              <ToastContainer theme="colored" />
            </div>
          </Stack>
        </Box>
        <Footer />
      </div>
    </>
  );
}

export default EpicerieProductUpdate;
