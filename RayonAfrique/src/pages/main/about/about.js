import React from "react";
import Navbar from "../../../components/main/navbar";
import Footer from "../../../components/main/footer";
import mission from "../../../images/mission.jpg";
import team from "../../../images/teamabout.svg";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  section: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    padding: "50px",
    backgroundColor: "#f9fafb",
  },
  imageBox: {
    flex: "1 1 50%", // Adjust the width of the image box as needed
    padding: "20px",
    textAlign: "center",
  },
  textBox: {
    flex: "1 1 50%", // Adjust the width of the text box as needed
    padding: "20px",
  },
  image: {
    maxWidth: "500px",
    maxHeight: "300px",
    borderRadius: "10px",
  },
}));

const About = () => {
  const classes = useStyles();

  return (
    <div>
      <Navbar />

      <section className={classes.section}>
        <Box className={classes.imageBox}>
          <img src={`${mission}`} alt="Mission" className={classes.image} />
        </Box>
        <Box className={classes.textBox}>
          <Typography variant="h3">Notre mission</Typography>
          <Typography variant="body1">
            Nous sommes témoins d'une remarquable effervescence entrepreneuriale
            dans le domaine des produits africains, qu'il s'agisse d'épiceries
            spécialisées ou de marques de qualité. Notre objectif est de
            faciliter l'accès à ces produits pour nos clients via notre réseaux
            d'épicerie partenaire tout en offrant aux entrepreneurs la
            possibilité de présenter leurs articles en ligne et de les
            promouvoir. Ensemble, créons un espace où la richesse des produits
            africains est est à portée de main, sans compromis sur la qualité !
          </Typography>
        </Box>
      </section>
      <section className={classes.section}>
        <Box className={classes.textBox}>
          <Typography sx={{ marginTop: "20px" }} variant="h3">
            Notre Equipe
          </Typography>
          <Typography variant="body1">
            Notre équipe est composée de professionnels passionnés et dévoués à
            mettre en avant la richesse des produits africains. Nous travaillons
            ensemble pour vous offrir la meilleure expérience possible en vous
            connectant avec des produits de qualité.
          </Typography>
        </Box>
        <Box className={classes.imageBox}>
          <img src={`${team}`} alt="Equipe" className={classes.image} />
        </Box>
      </section>

      <Footer />
    </div>
  );
};

export default About;
