import React from "react";
import Navbar from "../../../components/main/navbar";
import Footer from "../../../components/main/footer";
import mission from "../../../images/mission.jpg";
import team from "../../../images/teamabout.svg";
import { Box, Typography } from "@material-ui/core";
import { Helmet } from "react-helmet";
import useStyles from "../../../styles/pages/main/about/about";

const About = () => {
  const classes = useStyles();

  return (
    <div>
      <Helmet>
        <meta name="description" content="RayonAfrique - A propos" />
      </Helmet>
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
            Notre équipe, composée de professionnels passionnés et dévoués, est
            déterminée à mettre en avant la richesse des produits africains.
            Originaires du continent africain, nous comprenons les défis liés à
            la promotion et aux coûts de fabrication de ces produits, ainsi que
            l'enthousiasme des entrepreneurs africains dans ce domaine. En tant
            que jeunes ingénieurs informaticiens dynamiques, notre objectif est
            de concevoir une plateforme qui permet à chaque épicerie et marque
            de mettre en valeur leurs produits uniques. Nous travaillons
            ensemble pour vous offrir la meilleure expérience possible en vous
            connectant avec des produits de qualité et en facilitant la
            découverte de produits africains innovants par nos clients.
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
