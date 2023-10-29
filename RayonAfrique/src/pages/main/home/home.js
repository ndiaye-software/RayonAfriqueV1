import React from "react";
import Navbar from "../../../components/main/navbar";
import Footer from "../../../components/main/footer";
import backgroundImage from "../../../images/background.jpg";
import Caissier from "../../../images/Caissier.jpg";
import Business from "../../../images/business.jpg";
import Searching from "../../../images/market.jpg";
import Madd from "../../../images/five_star.jpg";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Typography } from "@material-ui/core";
import PresentationComponent from "../../../components/main/presentation";
import { Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

const useStyles = makeStyles((theme) => ({
  section1: {
    width: "auto",
    height: "auto",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    textAlign: "left",
    padding: "100px",
    flexWrap: "wrap",
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    filter: "blur(2px)",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    [theme.breakpoints.down("sm")]: { justifyContent: "center" },
    zIndex: 1,
  },

  section1_div_h1: {
    fontSize: "3.5vw",
    background: "white",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    fontWeight: "bolder",
    marginBottom: "20px",
    zIndex: 2,
    [theme.breakpoints.down("sm")]: {
      fontSize: "20px",
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
      fontSize: "15px",
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

  header: {
    fontSize: "3vw",
    fontWeight: "bolder",
    color: "black",
    textAlign: "center",
    backgroundColor: "#f9fafb",
    paddingTop: "20px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "20px",
    },
  },

  ButtonBusiness: {
    fontWeight: "bolder",
    color: "white",
    backgroundColor: "#922B21",
    width: "300px",
    marginTop: "20px",
    padding: "20px",
    fontSize: "12px",

    "&:hover": {
      backgroundColor: "#A63F35",
    },
  },

  ButtonRDV: {
    fontWeight: "bolder",
    color: "white",
    backgroundColor: "#922B21",
    width: "80%",
    minWidth: "300px",
    marginTop: "20px",
    padding: "20px",
    fontSize: "12px",

    "&:hover": {
      backgroundColor: "#A63F35",
    },
  },

  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    gap: "10px",
  },
  banner: {
    position: "relative",
    width: "100%",
    height: "80vh",
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
    left: "20%",
    transform: "translate(-50%, -50%)",
    zIndex: 2,
    textAlign: "left",
    color: "white",
    [theme.breakpoints.down("sm")]: {
      top: "50%",
      left: "50%",
      justifyContent: "center",
    },
  },

  Button: {
    fontWeight: "bolder",
    color: "white",
    backgroundColor: "#922B21",
    width: "80%",
    marginTop: "20px",
    padding: "20px",
    fontSize: "12px",

    "&:hover": {
      backgroundColor: "#088A85",
    },
  },

  buttonBusinessContainer: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#f9fafb",
    paddingBottom: "60px",
  },

  section2: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    backgroundColor: "#f9fafb",
    padding: "30px",
    gap: "35px",
  },
}));

const Home = () => {
  const classes = useStyles();

  return (
    <div>
      <Navbar />

      <section className={classes.banner}>
        <div className={classes.bannerImg}></div>
        <div className={classes.bannerText}>
          <Typography variant="h1" className={classes.section1_div_h1}>
            RayonAfrique
          </Typography>
          <Typography variant="h3" className={classes.section1_div_h3}>
            Trouvez les produits africains
          </Typography>
          <Typography variant="h3" className={classes.section1_div_h3}>
            {" "}
            proche de chez vous en un clic !
          </Typography>
          <Grid className={classes.buttonContainer}>
            <Button
              className={classes.ButtonRDV}
              href="/produit"
              variant="contained"
            >
              Découvrez les produits
            </Button>
          </Grid>
        </div>
      </section>

      <div>
        <Typography variant="h1" className={classes.header}>
          Services
        </Typography>

        <div className={classes.section2}>
          <Card
            sx={{
              maxWidth: 345,
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "translateY(-10px)",
                boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.1)",
              },
            }}
          >
            <CardMedia component="img" height="200" image={`${Searching}`} />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Variété
              </Typography>
              <Typography variant="body2" color="inherit">
                Découvrez une variété authentique de produits africains,
                provenant des 4 coins de l'Afrique.
              </Typography>
            </CardContent>
          </Card>

          <Card
            sx={{
              maxWidth: 345,
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "translateY(-10px)",
                boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.1)",
              },
            }}
          >
            <CardMedia component="img" height="200" image={`${Madd}`} />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Qualité
              </Typography>
              <Typography variant="body2" color="inherit">
                Profitez de produits avec une qualité exceptionnelle.
              </Typography>
            </CardContent>
          </Card>

          <Card
            sx={{
              maxWidth: 345,
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "translateY(-10px)",
                boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.1)",
              },
            }}
          >
            <CardMedia component="img" height="200" image={`${Caissier}`} />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Accessibilité
              </Typography>
              <Typography variant="body2" color="inherit">
                Achetez vos produits plus aisément chez nos magasins
                partenaires.
              </Typography>
            </CardContent>
          </Card>
        </div>
      </div>

      <PresentationComponent />

      <div>
        <Typography variant="h1" className={classes.header}>
          Business
        </Typography>
        <div className={classes.section2}>
          <Card sx={{ maxWidth: 425 }}>
            <CardMedia component="img" height="400" image={`${Business}`} />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Fournisseur
              </Typography>
              <Typography variant="body2" color="inherit">
                Vous avez votre marque de produits alimentaires ? Partagez-la
                sur notre plateforme et trouvez également des partenaires pour
                développer votre entreprise !
              </Typography>
            </CardContent>
          </Card>

          <Card sx={{ maxWidth: 425 }}>
            <CardMedia component="img" height="400" image={`${Caissier}`} />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Epicerie
              </Typography>
              <Typography variant="body2" color="inherit">
                Vous êtes une épicerie spécialisée sur la vente produits
                alimentaires d'origines africains ? Faites-vous connaître et
                attirez de nouveaux clients grâce à notre plateforme !
              </Typography>
            </CardContent>
          </Card>
        </div>

        <Grid className={classes.buttonBusinessContainer}>
          {" "}
          <Button
            className={classes.ButtonBusiness}
            href="/business"
            variant="contained"
          >
            Découvrir RayonAfrique+
          </Button>{" "}
        </Grid>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
