import React, { useEffect, useCallback } from "react";
import hostname from "../../../hostname";
import Navbar from "../../../components/epicerie/navbarEpicerie";
import Footer from "../../../components/main/footer";
import Pricing from "../../../components/epicerie/pricing";
import { Typography } from "@material-ui/core";
import profil from "../../../images/profil.jpg";
import productEpicerie from "../../../images/productEpicerie.jpg";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useStyles from "../../../styles/pages/epicerie/home/epicerieHome";

const EpicerieHome = () => {

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

  const classes = useStyles();

  return (
    <div>
      <Helmet>
        <meta
          name="description"
          content="RayonAfrique - epicerie africaine - homepage"
        />
      </Helmet>

      <Navbar />

      <section className={classes.banner}>
        <div className={classes.bannerImg}></div>
        <div className={classes.bannerText}>
          <Typography
            component="span"
            variant="h1"
            className={classes.section1_div_h1}
          >
            RayonAfrique
          </Typography>
        </div>
      </section>

      <div>
        <Typography variant="h1" className={classes.header}>
          Services
        </Typography>

        <div className={classes.section2}>
          <Card
            component={Link}
            to={`produit`}
            sx={{
              width: 275,
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "translateY(-10px)",
                boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.1)",
                cursor: "pointer",
              },
            }}
          >
            <CardMedia
              component="img"
              height="150"
              image={`${productEpicerie}`}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Gérez vos produits
              </Typography>
              <Typography variant="body2" color="inherit">
                Créez et gérez vos produits !
              </Typography>
            </CardContent>
          </Card>

          <Card
            component={Link}
            to={`profil`}
            sx={{
              width: 275,
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "translateY(-10px)",
                boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.1)",
                cursor: "pointer",
              },
            }}
          >
            <CardMedia component="img" height="150" image={`${profil}`} />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Arrangez votre profil
              </Typography>
              <Typography variant="body2" color="inherit">
                Arrangez votre profil pour attirer vos utilisateurs !
              </Typography>
            </CardContent>
          </Card>
        </div>

        <div>
          <ToastContainer theme="colored" />
        </div>

        <Typography variant="h1" className={classes.header1}>
          Pricing
        </Typography>

        <Pricing />
      </div>

      <Footer />
    </div>
  );
};

export default EpicerieHome;
