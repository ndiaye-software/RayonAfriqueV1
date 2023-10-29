import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Plat from "../../images/plat.jpg";
import Diversité from "../../images/diversité.jpg";
import Localisation from "../../images/localisation.jpg";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: "#922B21",
    padding: "50px",
  },

  testimonialContainer: {
    backgroundColor: "#922B21",
    color: "#FFF",
    borderRadius: "15px",
    margin: "auto",
    padding: "35px",
    maxWidth: "768px",
    text: "relative",
    [theme.breakpoints.down("sm")]: {
      padding: "20px 30px",
    },
  },

  testimonial: {
    lineHeight: "28px",
    textAlign: "justify",
  },
  user: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    gap: "50px",
    [theme.breakpoints.down("sm")]: {
      flexWrap: "wrap",
      justifyContent: "center",
      textAlign: "center",
      display: "flex",
    },
  },
  userImage: {
    height: "235px",
    width: "275px",
    objectFit: "cover",
    borderRadius: "25px",
  },
  userDetails: {
    marginLeft: "100px",
    [theme.breakpoints.down("sm")]: {
      flexWrap: "wrap",
      justifyContent: "center",
      textAlign: "center",
      marginLeft: "0px",
    },
  },
  username: {
    margin: "0",
  },
  role: {
    fontWeight: "normal",
    margin: "8px 0",
  },
  progressBar: {
    backgroundColor: "#FFF",
    height: "6px",
    borderRadius: "50%",
    width: "100%",
    margin: "15px",
    animation: "$grow 10s linear infinite",
    transformOrigin: "left",
  },
  "@keyframes grow": {
    "0%": {
      transform: "scaleX(0)",
    },
  },

  header: {
    fontSize: "3vw",
    fontWeight: "bolder",
    color: "white",
    textAlign: "center",
    paddingTop: "20px",
  },
}));

const testimonials = [
  {
    title: "Recréez fidèlement vos plats d'origine",
    text:
      "Notre plateforme vous offre la possibilité de recréer vos plats d'origine de manière plus fidèle que jamais. Grâce à notre vaste sélection de produits de qualité, directement importés des pays d'origine, vous pouvez retrouver les ingrédients, les épices et les saveurs authentiques qui ont fait la renommée de la cuisine de votre région. ",
    photo: Plat,
  },
  {
    title: "Trouvez vos produits plus facilement",
    text:
      "Nous comprenons à quel point il peut être difficile de trouver des produits rare et de qualité provenant de l'Afrique. C'est pourquoi notre plateforme facilite la recherche et l'accès à ces produits, grâce à notre réseau d'épiceries partenaires.",
    photo: Localisation,
  },
  {
    title: "Découvrez de nouveaux produits",
    text:
      "Notre plateforme est conçue pour vous permettre d'explorer et de découvrir une variété infinie de produits authentiques et passionnants provenant du continent africain. Que vous soyez un amateur de cuisine africaine ou simplement curieux de découvrir de nouvelles saveurs, notre marketplace vous ouvre les portes vers un monde de possibilités.",
    photo: Diversité,
  },
];

export default function PresentationComponent() {
  const classes = useStyles();

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const { title, text, photo } = testimonials[currentIndex];

  return (
    <div className={classes.container}>
      <Typography variant="h1" className={classes.header}>
        Avec RayonAfrique...
      </Typography>
      <div className={classes.testimonialContainer}>
        <div className={classes.user}>
          <img className={classes.userImage} src={photo} alt="sliderImage" />
          <div className={classes.userDetails}>
            <h3 className={classes.username}>{title}</h3>
            <p className={classes.role}>{text}</p>
          </div>
        </div>
        <div className={classes.progressBar} />
      </div>
    </div>
  );
}
