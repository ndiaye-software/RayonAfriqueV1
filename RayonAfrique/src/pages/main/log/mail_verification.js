import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Navbar from "../../../components/main/navbar";
import Footer from "../../../components/main/footer";
import hostname from "../../../hostname";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet";

export default function VerificationMail() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    code: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `${hostname}/api/v1/epicerie/auth/verification`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...formData }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.message) {
          toast.success(data.message);
        }
        navigate("validation");
      } else {
        const data = await response.json();
        if (data.message) {
          toast.error(data.message);
        } else {
          toast("Erreur d'authentification");
        }
      }
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
    }
  };

  return (
    <div>
      <Helmet>
        <meta name="description" content="RayonAfrique - verification mail" />
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
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Mail - Vérification
            </Typography>
            <Box
              component="form"
              onSubmit={handleLogin}
              noValidate
              sx={{ mt: 1 }}
            >
              <Grid item xs={12}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="code"
                  label="Code"
                  name="code"
                  placeholder="1234"
                  autoFocus
                  value={formData.code}
                  onChange={handleChange}
                />
              </Grid>
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
                Valider
              </Button>
            </Box>
          </Box>
        </Container>
      </Grid>
      <Footer />
    </div>
  );
}
