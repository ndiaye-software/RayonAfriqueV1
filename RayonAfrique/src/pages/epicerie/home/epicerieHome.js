import React from "react";
import Navbar from "../../../components/epicerie/navbarEpicerie";
import Footer from "../../../components/main/footer";
import backgroundImage from "../../images/background.jpg";
import Pricing from "../../../components/epicerie/pricing";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import market from "../../images/logoMarket.png";
import profil from "../../images/profil.jpg";
import productEpicerie from "../../images/productEpicerie.jpg";
import partnership from "../../images/partnership.jpg";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Link } from "react-router-dom";

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

  header1: {
    fontSize: "3vw",
    fontWeight: "bolder",
    color: "black",
    textAlign: "center",
    backgroundColor: "white",
    paddingTop: "20px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "20px",
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

  section2: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    backgroundColor: "#f9fafb",
    padding: "30px",
    gap: "15px",
  },
}));

const EpicerieHome = () => {

  const classes = useStyles();

  return (
    <div>
      <Navbar />

      <section className={classes.banner}>
        <div className={classes.bannerImg}></div>
        <div className={classes.bannerText}>
          <Typography variant="h1" className={classes.section1_div_h1}>
            RayonAfrique+
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
            to={`market`}
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
            <CardMedia component="img" height="150" image={`${market}`} />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                MarketPlace
              </Typography>
              <Typography variant="body2" color="inherit">
                Découvrez de nouveaux produits proposez par nos partenaires sur le MarketPlace B2B RayonAfrique !
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

          <Card
            component={Link}
            to={`fournisseur`}
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
            <CardMedia component="img" height="150" image={`${partnership}`} />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Trouvez de nouveaux fournisseurs
              </Typography>
              <Typography variant="body2" color="inherit">
                Découvrez de nouvelles marques pour diversfier vos produits !
              </Typography>
            </CardContent>
          </Card>
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
