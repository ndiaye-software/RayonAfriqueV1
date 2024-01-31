import React from "react";
import Navbar from "../../../components/main/navbar";
import Footer from "../../../components/main/footer";
import backgroundImage from "../../../images/background.jpg";
import Caissier from "../../../images/Caissier.jpg";
import Business from "../../../images/business.jpg";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Typography } from "@material-ui/core";
import PresentationComponent from "../../../components/main/presentation";
import { Grid, Box } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import maps from "../../../images/map.jpg";
import professionnal from "../../../images/professionnal.jpg";
import produits from "../../../images/produits.jpg";
import {
  Accessibility,
  Handshake,
  KeyboardDoubleArrowDown,
  ShareLocation,
  Visibility,
} from "@mui/icons-material";
import map from "../../../images/map.svg";
import shopping from "../../../images/shopping.svg";

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
    fontSize: "35px",
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
    backgroundColor: "white",
    display: "flex",
    justifyContent: "space-evenly",
    flexDirection: "row",
    [theme.breakpoints.down("sm")]: {
      height: "50vh",
    },
  },
  bannerImg: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    filter: "blur(3px)",
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: 1,
  },
  bannerText: {
    position: "absolute",
    top: "50%",
    left: "27%",
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

  section: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: "30px",
    backgroundColor: "#f9fafb",
    flexWrap: "wrap",
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
    maxWidth: "300px",
    maxHeight: "200px",
    borderRadius: "10px",
  },
  imagePresentation: {
    maxWidth: "430px",
    maxHeight: "300px",
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
}));

const Home = () => {
  const classes = useStyles();

  return (
    <div>
      <Navbar />

      <Box className={classes.banner}>
        <div className={classes.bannerImg}></div>
        <div className={classes.bannerText}>
          <Box>
            <Typography variant="body2" className={classes.section1_div_h1}>
              Trouvez les produits africains
            </Typography>
            <Typography variant="body2" className={classes.section1_div_h1}>
              {" "}
              proche de chez vous !
            </Typography>

            <Box maxWidth="500px" sx={{ fontWeight: "700", color: "white" }}>
              <Typography variant="body1">
                Avec RayonAfrique, trouvez aisément les emplacements où les
                produits du marché africain sont disponibles, vous offrant une
                expérience de shopping unique et pratique.
              </Typography>
            </Box>
            <Grid
              className={classes.buttonContainer}
              justifyContent="space-evenly"
            >
              <Button
                className={classes.ButtonRDV}
                href="/produit"
                variant="contained"
              >
                Découvrez les produits
              </Button>
            </Grid>
          </Box>
        </div>
      </Box>

      <div>
        <Typography variant="h1" className={classes.header}>
          Services
        </Typography>

        <div className={classes.section2}>
        <Card
            sx={{
              maxWidth: 325,
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "translateY(-10px)",
                boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.1)",
              },
            }}
          >
            <CardMedia component="img" height="180" image={`${maps}`} />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Recherche géolocalisée
              </Typography>
              <Typography variant="body2" color="inherit">
                Vous voulez acheter un produit africain, mais vous ne savez pas
                où le trouver ? Essayer la recherche géolocalisée de
                RayonAfrique qui vous montre les épiceries vendant votre produit
                actuellement.
              </Typography>
            </CardContent>
          </Card>

          <Card
            sx={{
              maxWidth: 325,
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "translateY(-10px)",
                boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.1)",
              },
            }}
          >
            <CardMedia component="img" height="180" image={`${produits}`} />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Hub Produits africains
              </Typography>
              <Typography variant="body2" color="inherit">
                Découvrez en un seul lieu la diversité des produits africains
                disponibles sur le marché. RayonAfrique simplifie votre
                recherche, regroupant une gamme complète d'articles authentiques
                et innovants pour une expérience de shopping pratique et
                agréable.
              </Typography>
            </CardContent>
          </Card>

          <Card
            sx={{
              maxWidth: 325,
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "translateY(-10px)",
                boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.1)",
              },
            }}
          >
            <CardMedia
              component="img"
              height="180"
              image={`${professionnal}`}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Espace Professionnel
              </Typography>
              <Typography variant="body2" color="inherit">
                Que vous soyez une épicerie ou une marque de produits africains,
                intégrez rayonafrique pour poster et promouvoir vos produits et
                nouez de nouveaux partenariats.
              </Typography>
            </CardContent>
          </Card>
        </div>
      </div>

      <PresentationComponent />

      
      <section>
        <Typography variant="h1" className={classes.header}>
          Pourquoi RayonAfrique ?
        </Typography>
        <Box className={classes.section}>
          <Box className={classes.textBox}>
            <Typography sx={{ marginTop: "20px" }} variant="h3">
              Accessibilté
            </Typography>
            <Typography variant="body1">
              Avec notre puissante fonction de recherche géolocalisée, notre
              plateforme innovante vous offre une expérience inégalée. En un
              instant, découvrez précisément les épiceries situées à proximité
              qui proposent votre produit préféré. Grâce à notre site, vous
              pouvez localiser votre produit en quelques clics, le trouvant à
              seulement quelques mètres de l'endroit où vous vous trouvez. Ne
              perdez plus de temps à parcourir de longues distances à la
              recherche de ce que vous désirez !
            </Typography>
          </Box>
          <Box className={classes.imageBox}>
            <img src={`${map}`} alt="Equipe" className={classes.image} />
          </Box>
        </Box>
      </section>

      <section>
        <Box className={classes.section}>
          <Box className={classes.imageBox}>
            <img src={`${shopping}`} alt="Equipe" className={classes.image} />
          </Box>
          <Box className={classes.textBox}>
            <Typography sx={{ marginTop: "20px" }} variant="h3">
              Diversité
            </Typography>
            <Typography variant="body1">
              Explorez une riche variété de produits africains indispensables à
              votre quotidien sur la plateforme RayonAfrique. En quelques clics,
              accédez à l'ensemble des produits disponibles sur le marché, en
              provenance du continent africain. Plongez également dans l'univers
              des marques innovantes émergentes, découvrant ainsi leurs nouveaux
              produits qui révolutionnent le marché
            </Typography>
          </Box>
        </Box>
      </section>

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
                href="/inscription/epicerie"
                variant="contained"
              >
                S'inscrire
              </Button>{" "}
            </Grid>
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

      <Footer />
    </div>
  );
};

export default Home;
