import React from "react";
import Navbar from "../../../components/main/navbar";
import Footer from "../../../components/main/footer";
import backgroundImage from "../../../images/background.jpg";
import manage from "../../../images/manage.jpg";
import popularity from "../../../images/popularity.jpg";
import partnership from "../../../images/partnership.jpg";
import contact from "../../../images/contact.svg";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Typography } from "@material-ui/core";
import { Grid, Box } from "@mui/material";
import Card from "@mui/material/Card";
import StartOutlinedIcon from "@mui/icons-material/StartOutlined";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Caissier from "../../../images/Caissier.jpg";
import Business from "../../../images/business.jpg";
import {
  Accessibility,
  Handshake,
  KeyboardDoubleArrowDown,
  ShareLocation,
  Visibility,
} from "@mui/icons-material";

const useStyles = makeStyles((theme) => ({
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
    backgroundColor: "#f9fafb",
    paddingTop: "20px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "20px",
    },
  },

  header2: {
    fontSize: "2vw",
    backgroundColor:"#f9fafb",
    fontWeight: "bolder",
    color: "black",
    textAlign: "center",
    paddingTop: "20px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "20px",
    },
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
    width: "300px",
    marginTop: "20px",
    padding: "20px",
    fontSize: "12px",

    "&:hover": {
      backgroundColor: "#A63F35",
    },
  },

  InscriptionButton: {
    fontWeight: "bolder",
    color: "white",
    backgroundColor: "#922B21",
    width: "200px",
    marginTop: "20px",
    padding: "20px",
    fontSize: "12px",

    "&:hover": {
      backgroundColor: "#A63F35",
    },
  },

  ButtonBusiness: {
    fontWeight: "bolder",
    color: "#922B21",
    backgroundColor: "white",
    width: "80%",
    minWidth: "300px",
    maxWidth: "450px",
    marginTop: "20px",
    padding: "20px",
    fontSize: "12px",

    "&:hover": {
      backgroundColor: "#A63F35",
      color: "white",
    },
  },

  buttonContainer: {
    display: "flex",
    justifyContent: "flex-start",
  },

  section: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    backgroundColor: "#f9fafb",
    padding: "65px",
    gap: "15px",
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

  section3: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    backgroundColor: "#f9fafb",
    padding: "65px",
    gap: "65px",
  },
}));

const Professionnel = () => {
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
            Lier de nouveaux partenariats.
          </Typography>
          <Typography variant="h3" className={classes.section1_div_h3}>
            Et faites croître votre business !
          </Typography>
          <Grid className={classes.buttonContainer}>
            {" "}
            <Button
              className={classes.Button}
              href="connexion"
              variant="contained"
              startIcon={<StartOutlinedIcon />}
            >
              Accédez à votre compte Business
            </Button>{" "}
          </Grid>
          <Grid className={classes.buttonContainer}>
            {" "}
            <Button
              className={classes.ButtonBusiness}
              href="inscription/epicerie"
              variant="contained"
            >
              Devenir partenaire de RayonAfrique
            </Button>{" "}
          </Grid>
        </div>
      </section>

      <div>
        <Typography variant="h1" className={classes.header1}>
          RayonAfrique
        </Typography>

        <div className={classes.section}>
          <Card
            sx={{
              maxWidth: 275,
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "translateY(-10px)",
                boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.1)",
              },
            }}
          >
            <CardMedia component="img" height="150" image={`${popularity}`} />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Gagner en attractivité
              </Typography>
              <Typography variant="body2" color="inherit">
                Gagner en attractivité grâce à notre plateforme innovante,
                centralisant produits et passionnés des 4 coins de l'Afrique.
              </Typography>
            </CardContent>
          </Card>

          <Card
            sx={{
              maxWidth: 275,
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "translateY(-10px)",
                boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.1)",
              },
            }}
          >
            <CardMedia component="img" height="150" image={`${partnership}`} />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Lier de nouveaux partenariats
              </Typography>
              <Typography variant="body2" color="inherit">
                Découvrez de nouveaux partenaires et aggrandissez votre business
                ensemble.
              </Typography>
            </CardContent>
          </Card>

          <Card
            sx={{
              maxWidth: 275,
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "translateY(-10px)",
                boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.1)",
              },
            }}
          >
            <CardMedia component="img" height="150" image={`${manage}`} />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Gérez vos activités
              </Typography>
              <Typography variant="body2" color="inherit">
                Gérez vos activités depuis votre espace personnel.
              </Typography>
            </CardContent>
          </Card>
        </div>
      </div>

      <div>
        <Typography variant="h1" className={classes.header}>
          Professionnels
        </Typography>
        <div className={classes.section2}>
          <Card sx={{ maxWidth: 425 }}>
            <CardMedia component="img" height="250" image={`${Caissier}`} />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Epicerie
              </Typography>
              <Typography variant="body2" color="inherit">
                Vous êtes une épicerie spécialisée sur la vente produits
                alimentaires d'origines africains ? Faites-vous connaître et
                attirez de nouveaux clients grâce à notre plateforme !
                <Box paddingTop="20px" paddingLeft="20px">
                  <Grid container>
                    <Grid
                      item
                      xs={2}
                      variant="body2"
                      color="inherit"
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      <Accessibility
                        sx={{
                          backgroundColor: "#922B21",
                          borderRadius: "50%",
                          padding: "5px",
                          fontSize: "35px",
                          color: "white",
                        }}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={10}
                      variant="body2"
                      color="inherit"
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      <Typography variant="body2" color="inherit">
                        Gagner en clientèle en rendant votre épicerie plus
                        accessible
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container paddingTop="20px">
                    <Grid
                      item
                      xs={2}
                      variant="body2"
                      color="inherit"
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      <ShareLocation
                        sx={{
                          backgroundColor: "#922B21",
                          borderRadius: "50%",
                          padding: "5px",
                          fontSize: "35px",
                          color: "white",
                        }}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={10}
                      variant="body2"
                      color="inherit"
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      <Typography variant="body2" color="inherit">
                        Exposer votre épicerie aux amateurs de produits
                        africains
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container paddingTop="20px">
                    <Grid
                      item
                      xs={2}
                      variant="body2"
                      color="inherit"
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      <Handshake
                        sx={{
                          backgroundColor: "#922B21",
                          borderRadius: "50%",
                          padding: "5px",
                          fontSize: "35px",
                          color: "white",
                        }}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={10}
                      variant="body2"
                      color="inherit"
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      <Typography variant="body2" color="inherit">
                        Nouez de nouveaux partenariats avec les marques de
                        produits africains
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Typography>
              <Grid
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignContent="center"
              alignItems="center"
              paddingBottom="30px"
            >
              {" "}
              <Button
                startIcon={<KeyboardDoubleArrowDown />}
                className={classes.InscriptionButton}
                href="/inscription/epicerie"
                variant="contained"
              >
                S'inscrire
              </Button>{" "}
            </Grid>
            </CardContent>
          </Card>
          <Card sx={{ maxWidth: 425 }}>
            <CardMedia component="img" height="250" image={`${Business}`} />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Marque
              </Typography>
              <Typography variant="body2" color="inherit">
                Prêt à faire briller votre marque de produits africains ?
                Partagez-la sur notre plateforme et attirez une toute nouvelle
                clientèle !
                <Box paddingTop="20px" paddingLeft="20px">
                  <Grid container>
                    <Grid
                      item
                      xs={2}
                      variant="body2"
                      color="inherit"
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      <Accessibility
                        sx={{
                          backgroundColor: "#922B21",
                          borderRadius: "50%",
                          padding: "5px",
                          fontSize: "35px",
                          color: "white",
                        }}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={10}
                      variant="body2"
                      color="inherit"
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      <Typography variant="body2" color="inherit">
                        Rendez l'achat de vos produits plus facile en les
                        rendant plus accessibles
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container paddingTop="20px">
                    <Grid
                      item
                      xs={2}
                      variant="body2"
                      color="inherit"
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      <Visibility
                        sx={{
                          backgroundColor: "#922B21",
                          borderRadius: "50%",
                          padding: "5px",
                          fontSize: "35px",
                          color: "white",
                        }}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={10}
                      variant="body2"
                      color="inherit"
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      <Typography variant="body2" color="inherit">
                        Gangner en visibilité en promouvant vos produits
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container paddingTop="20px">
                    <Grid
                      item
                      xs={2}
                      variant="body2"
                      color="inherit"
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      <Handshake
                        sx={{
                          backgroundColor: "#922B21",
                          borderRadius: "50%",
                          padding: "5px",
                          fontSize: "35px",
                          color: "white",
                        }}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={10}
                      variant="body2"
                      color="inherit"
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      <Typography variant="body2" color="inherit">
                        Nouez des partenariats avec nos épiceries partenaires
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Typography>
            </CardContent>
            <Grid
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignContent="center"
              alignItems="center"
              paddingBottom="30px"
            >
              {" "}
              <Button
                startIcon={<KeyboardDoubleArrowDown />}
                className={classes.InscriptionButton}
                href="/inscription/marque"
                variant="contained"
              >
                S'inscrire
              </Button>{" "}
            </Grid>
          </Card>
        </div>
      </div>

      <div>
        <Typography variant="h1" className={classes.header2}>
          Contactez nous !
        </Typography>
        <div className={classes.section3}>
          <div>
            <img
              src={`${contact}`}
              height="200px"
              width="250px"
              alt="contact"
            />
            <Grid className={classes.buttonContainer}>
              {" "}
              <Button
                className={classes.Button}
                href="/contact"
                variant="contained"
              >
                Contactez nous !
              </Button>{" "}
            </Grid>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Professionnel;
