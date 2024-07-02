import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Navbar from "../../../components/main/navbar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Footer from "../../../components/main/footer";
import { useNavigate } from "react-router-dom";
import hostname from "../../../hostname";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Container from "@mui/material/Container";
import { SendOutlined } from "@material-ui/icons";
import { Helmet } from "react-helmet";

export default function Suggestion() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    mail: "",
    message: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${hostname}/api/v1/user/shop/suggestion`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.message) {
          toast.success(data.message);
          setTimeout(() => {
            window.location.href = "/";
          }, 1000);
        }
      } else {
        const data = await response.json();
        if (data.message) {
          toast.error(data.message);
        } else {
          toast("Erreur lors de l'envoi");
        }
        navigate("notsent");
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi de la requête :", error);
    }
  };

  return (
    <div>
      <Helmet>
        <meta
          name="description"
          content="Suggestions de produits - Aidez-nous à améliorer RayonAfrique en suggérant de nouveaux produits africains que vous aimeriez voir sur notre plateforme."
        />
        <meta
          name="keywords"
          content="RayonAfrique, suggestion de produits, épicerie africaine, marques africaines, produits africains, améliorer la plateforme"
        />
        <meta name="author" content="RayonAfrique" />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/dpodybbfe/image/upload/v1719949488/rayonafrique_wsbbxn.png"
        />
      </Helmet>

      <Navbar />
      <Grid container sx={{ minHeight: "100vh" }}>
        <Container
          container
          maxWidth="sm"
          sx={{
            paddingTop: 5,
            paddingLeft: 3,
            paddingRight: 3,
            paddingBottom: 5,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: 5,
              borderRadius: "15px",
            }}
          >
            <Avatar sx={{ m: 1, backgroundColor: "#922B21" }}>
              <SendOutlined />
            </Avatar>
            <Typography component="h1" variant="h5">
              Suggestion
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Adresse mail"
                name="mail"
                value={formData.mail}
                onChange={handleChange}
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="name"
                label="Nom"
                type="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="message"
                label="Votre suggestion"
                type="message"
                id="message"
                value={formData.message}
                onChange={handleChange}
                multiline
                minRows={8}
              />
              <div>
                <ToastContainer theme="colored" />
              </div>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: "#922B21",
                  "&:hover": { backgroundColor: "#A63F35" },
                }}
              >
                Envoyer
              </Button>
            </Box>
          </Box>
        </Container>
      </Grid>
      <Footer />
    </div>
  );
}
