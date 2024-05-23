import React, { useEffect, useState } from "react";
import { Box, Stack, Tooltip } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import usePlacesAutocomplete from "use-places-autocomplete";
import Navbar from "../../../components/epicerie/navbarEpicerie";
import Footer from "../../../components/main/footer";
import { InsertPhoto, Save } from "@material-ui/icons";
import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import InsertImage from "../../../images/insertimage.png";
import backgroundImage from "../../../images/background.jpg";
import { Typography } from "@material-ui/core";
import hostname from "../../../hostname";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Close } from "@material-ui/icons";
import { Grid } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import IconButton from "@mui/material/IconButton";
import "react-toastify/dist/ReactToastify.css";

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

function EpicerieProfile() {
  const [imageSrc, setImageSrc] = useState("");

  const {
    setValue,
    suggestions: { data },
  } = usePlacesAutocomplete({ debounce: 300 });

  const classes = useStyles();

  const [openDialog, setOpenDialog] = useState(false);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleUpdate = () => {
    setOpenDialog(true);
  };

  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    nameCompany: "",
    name: "",
    phone: "",
    mail: "",
    adresse: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    // Update Autocomplete value when formData.address changes
    setValue(formData.adresse);
  }, [formData.adresse, setValue]);

  const handleAddressChange = (_, newValue) => {
    setValue(newValue);
    // Update the address in the formData
    setFormData((prevFormData) => ({
      ...prevFormData,
      adresse: newValue.description || "",
    }))

  };

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    fetch(`${hostname}/api/v1/epicerie/profile/read`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setFormData({
          nameCompany: data.nameCompany || "",
          name: data.name || "",
          phone: data.phone || "",
          mail: data.mail || "",
          adresse: data.adresse || "",
          description: data.description || "",
          image: data.image || "",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      toast("Access token is missing");
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("nameCompany", formData.nameCompany);
      formDataToSend.append("name", formData.name);
      formDataToSend.append("mail", formData.mail);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("image", formData.image);
      formDataToSend.append("adresse", formData.adresse);

      const response = await fetch(
        `${hostname}/api/v1/epicerie/profile/update`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: formDataToSend,
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.message) {
          toast.success(data.message);
          window.location.reload();
        }
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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    setFormData((prevFormData) => ({
      ...prevFormData,
      image: file, // Conservez le fichier lui-même
    }));

    const reader = new FileReader();
    reader.onloadend = () => {
      setImageSrc(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };


  return (
    <>
      <div>
        <Navbar />
        <section className={classes.banner}>
          <div className={classes.bannerImg}></div>
          <div className={classes.bannerText}>
            <Typography variant="h1" className={classes.section1_div_h1}>
              RayonAfrique
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
                      {imageSrc ? (
                        <img
                          src={imageSrc}
                          alt="insérée"
                          height="300px"
                          width="350px"
                          name="image"
                        />
                      ) : formData.image instanceof File ? (
                        <img
                          src={URL.createObjectURL(formData.image)}
                          alt="insérée"
                          height="300px"
                          width="350px"
                          name="image"
                        />
                      ) : formData.image ? (
                        <img
                          src={require(`../../../images/${formData.image}`)}
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
                          name="image"
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
                  <Grid item xs={12}>
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
                      name="name"
                      value={formData.name}
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
                    <Autocomplete
                      disablePortal
                      id="adresse"
                      name="adresse"
                      options={data}
                      fullWidth
                      value={formData.adresse}
                      getOptionLabel={(option) =>
                        typeof option === "string" ? option : option.description
                      }
                      filterOptions={(x) => x}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          label="Adresse"
                        />
                      )}
                      onInputChange={(event, newValue) => setValue(newValue)}
                      onChange={handleAddressChange}
                    />
                  </Grid>
                </Box>
              </Box>

              {errorMessage && (
                <Typography variant="body1" color="error" gutterBottom>
                  {errorMessage}
                </Typography>
              )}

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

              <Dialog onClose={handleCloseDialog} open={openDialog}>
                <DialogTitle>
                  Voulez-vous enregistrer ces modifications ?
                </DialogTitle>
                <List sx={{ justifyContent: "space-evenly" }}>
                  <List sx={{ justifyContent: "space-evenly" }}>
                    {formData.image instanceof File &&
                      <ListItem>
                        <img
                          src={URL.createObjectURL(formData.image)}
                          alt="insérée"
                          height="120px"
                          width="150px"
                          name="image"
                        />
                      </ListItem>
                    }
                  </List>

                  <ListItem>
                    <ListItemText
                      primary={`Nom du gérant  : ${formData.name}`}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary={`Nom de l'entreprise : ${formData.nameCompany}`}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary={`Téléphone  : ${formData.phone}`} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary={`Mail  : ${formData.mail}`} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary={`Adresse : ${formData.adresse}`} />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary={`Description  : ${formData.description}`}
                    />
                  </ListItem>
                </List>
                <Grid
                  display="flex"
                  flexDirection="row"
                  justifyContent="space-evenly"
                  marginBottom="30px"
                >
                  <Tooltip title="enregistrer">
                    <IconButton onClick={handleSubmit} aria-label="modifier">
                      <Save />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="annuler">
                    <IconButton
                      onClick={handleCloseDialog}
                      aria-label="close"
                      sx={{
                        bgcolor: "#922B21",
                        color: "white",
                        "&:hover": { bgcolor: "white", color: "#922B21" },
                      }}
                    >
                      <Close />
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

export default EpicerieProfile;
