import React from "react";
import Navbar from "../../../components/main/navbar";
import Footer from "../../../components/main/footer";
import manage from "../../../images/manage.jpg";
import popularity from "../../../images/popularity.jpg";
import partnership from "../../../images/partnership.jpg";
import contact from "../../../images/contact.svg";
import { Button, Typography } from "@material-ui/core";
import { Grid, Box } from "@mui/material";
import Card from "@mui/material/Card";
import StartOutlinedIcon from "@mui/icons-material/StartOutlined";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Caissier from "../../../images/Caissier.jpg";
import Business from "../../../images/business.jpg";
import { Helmet } from "react-helmet";
import useStyles from "../../../styles/pages/main/business/business";
import {
  Accessibility,
  Handshake,
  KeyboardDoubleArrowDown,
  ShareLocation,
  LiveTv,
} from "@mui/icons-material";

const Professionnel = () => {
  const classes = useStyles();

  return (
    <div>
      <Helmet>
        <meta
          name="description"
          content="RayonAfrique - Votre plateforme idéale pour les marques et épiceries africaines. Rejoignez-nous pour exposer vos produits à un large public et développer votre activité. Profitez d'une visibilité accrue et d'une clientèle passionnée par les produits authentiques africains."
        />
        <meta
          name="keywords"
          content="marché africain, épicerie africaine, produits africains, nourriture africaine, vente en ligne Afrique, marques africaines, produits authentiques africains, commerce africain, exposition de produits africains"
        />
        <meta name="author" content="RayonAfrique" />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/dpodybbfe/image/upload/v1719949488/rayonafrique_wsbbxn.png"
        />
      </Helmet>
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
                d'origines africains ? Faites-vous connaître et attirez de
                nouveaux clients grâce à notre plateforme !
              </Typography>
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
                      Exposer votre épicerie aux amateurs de produits africains
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
                <strong>
                  Inscrivez-vous pour pouvoir être alerté en premier de nos
                  services
                </strong>{" "}
                pour partager votre marque sur notre plateforme et attirer une
                toute nouvelle clientèle !
              </Typography>
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
                      Rendez l'achat de vos produits plus facile en les rendant
                      plus accessibles
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
                    <LiveTv
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
                      Créer des publicités et faÎtes gagner votre marque en
                      visibilité
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
