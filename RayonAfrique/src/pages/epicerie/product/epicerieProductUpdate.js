import React, { useState, useEffect } from "react";
import { Stack, Tooltip, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Navbar from "../../../components/epicerie/navbarEpicerie";
import Footer from "../../../components/main/footer";
import Save from "@mui/icons-material/Save";
import { TextField, Button } from "@material-ui/core";
import { Grid } from "@mui/material";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import hostname from "../../../hostname";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Close } from "@material-ui/icons";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import SaveIcon from "@mui/icons-material/Save";
import IconButton from "@mui/material/IconButton";
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

function EpicerieProductUpdate() {
  const navigate = useNavigate();

  const { idEpicerieProduct } = useParams();
  const [openDialog, setOpenDialog] = useState(false);
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleUpdate = () => {
    setOpenDialog(true);
  };

  const [formData, setFormData] = useState({
    idEpicerieProduct: idEpicerieProduct,
    price: "",
    available: false,
    label: "",
    image: "",
    name: "",
  });

  const redirectToLogin = () => {
    localStorage.removeItem("accessToken");
    window.location.href = "/connexion";
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      redirectToLogin();
      return;
    }
    fetch(
      `${hostname}/api/v1/epicerie/productEpicerie/read/${idEpicerieProduct}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setFormData({
          idEpicerieProduct: idEpicerieProduct,
          price: data[0]?.price || "",
          available: data[0]?.available || false,
          label: data[0]?.label || "",
          image: data[0]?.image || "",
          name: data[0]?.name || "",
        });
      })
      .catch((err) => console.log(err));
  }, [idEpicerieProduct]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleChangeDispo = (event) => {
    const value = event.target.value;

    // Utilisez la valeur de l'option "value"
    const booleanValue =
      options.find((option) => option.label === value)?.value || false;

    // Appel de la fonction pour mettre à jour formData
    setFormData({
      ...formData,
      available: booleanValue,
    });
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
        `${hostname}/api/v1/epicerie/productEpicerie/update/${idEpicerieProduct}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);
        setTimeout(() => {
          navigate(`/epicerie/produit`);
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
            content="RayonAfrique - epicerie africaine - modification produit africain"
          />
        </Helmet>
        <Navbar />
        {formData && (
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
                        {formData.image && (
                          <img
                            src={formData.image}
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
                        {formData.name} - {formData.label}
                      </Typography>
                    </Box>

                    <Grid item xs={12}>
                      <TextField
                        label="Prix"
                        variant="outlined"
                        fullWidth
                        name="price"
                        id="price"
                        value={formData.price}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Tooltip
                        title="Marquez comme disponible sur votre épicerie"
                        placement="top"
                      >
                        <FormControl fullWidth variant="outlined">
                          <InputLabel>Disponibilité</InputLabel>
                          <Select
                            value={formData.available ? "oui" : "non"}
                            label="Disponibilité"
                            onChange={handleChangeDispo}
                            required
                          >
                            {options?.map((option) => (
                              <MenuItem key={option.label} value={option.label}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Tooltip>
                    </Grid>
                  </Box>
                </Box>
                <Dialog onClose={handleCloseDialog} open={openDialog}>
                  <DialogTitle>
                    Voulez-vous enregistrer ces modifications ?
                  </DialogTitle>
                  <List>
                    <ListItem>
                      <ListItemText primary={`prix  : ${formData.price} €`} />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary={`disponibilité : ${
                          formData.available ? "oui" : "non"
                        }`}
                      />
                    </ListItem>
                  </List>
                  <Grid
                    display="flex"
                    flexDirection="row"
                    justifyContent="space-evenly"
                    marginBottom="30px"
                  >
                    <Tooltip title="annuler">
                      <IconButton
                        onClick={handleCloseDialog}
                        aria-label="delete"
                      >
                        <Close />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="modifier">
                      <IconButton
                        type="submit"
                        onClick={handleSubmit}
                        aria-label="close"
                        sx={{
                          bgcolor: "#922B21",
                          color: "white",
                          "&:hover": { bgcolor: "white", color: "#922B21" },
                        }}
                      >
                        <SaveIcon />
                      </IconButton>
                    </Tooltip>
                  </Grid>
                </Dialog>
                <div>
                  <ToastContainer theme="colored" />
                </div>
                <Box
                  justifyContent="space-evenly"
                  display="flex"
                  marginTop="30px"
                >
                  <Button
                    onClick={handleUpdate}
                    className={classes.Button}
                    endIcon={<Save />}
                  >
                    Modifier le produit
                  </Button>
                </Box>
              </Box>
            </Stack>
          </Box>
        )}
        <Footer />
      </div>
    </>
  );
}

export default EpicerieProductUpdate;
