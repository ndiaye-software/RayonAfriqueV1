import React from "react";
import Navbar from "../../../components/main/navbar";
import Footer from "../../../components/main/footer";
import { Box, Typography } from "@material-ui/core";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import useStyles from "../../../styles/pages/main/terms/termsAndConditions";

const TermsAndConditions = () => {
  const classes = useStyles();
  function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
    }
  }

  return (
    <div>
      
      <Helmet>
        <meta
          name="description"
          content="Termes de confidentialité de RayonAfrique - Découvrez comment nous protégeons vos informations personnelles et respectons votre vie privée lors de votre utilisation de notre plateforme."
        />
        <meta
          name="keywords"
          content="RayonAfrique, termes de confidentialité, protection des données, vie privée, informations personnelles, sécurité des données"
        />
        <meta name="author" content="RayonAfrique" />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/dpodybbfe/image/upload/v1719949488/rayonafrique_wsbbxn.png"
        />
      </Helmet>

      <Navbar />

      <section className={classes.section}>
        <Box className={classes.textBox}>
          <Box className={classes.text}>
            <Typography variant="h3">
              Conditions générales d'utilisations
            </Typography>
          </Box>
          <Grid>
            <Box className={classes.text}>
              <Typography variant="h4">Sommaire</Typography>
              <ul style={{ listStyleType: "none" }}>
                <li>
                  <Typography
                    style={{ color: "black" }}
                    component={Link}
                    to="#introduction"
                    variant="body2"
                    onClick={() => scrollToSection("introduction")}
                  >
                    Introduction
                  </Typography>
                </li>
                <li>
                  <Typography
                    style={{ color: "black" }}
                    component={Link}
                    to="#utilisation"
                    variant="body2"
                    onClick={() => scrollToSection("utilisation")}
                  >
                    Utilisation de la plateforme
                  </Typography>
                </li>
                <li>
                  <Typography
                    style={{ color: "black" }}
                    component={Link}
                    to="#user"
                    variant="body2"
                    onClick={() => scrollToSection("user")}
                  >
                    Comptes utilisateurs
                  </Typography>
                </li>
                <li>
                  <Typography
                    style={{ color: "black" }}
                    component={Link}
                    to="#content"
                    variant="body2"
                    onClick={() => scrollToSection("content")}
                  >
                    Contenu utilisateur
                  </Typography>
                </li>
                <li>
                  <Typography
                    style={{ color: "black" }}
                    component={Link}
                    to="#responsability"
                    variant="body2"
                    onClick={() => scrollToSection("responsability")}
                  >
                    Responsabilités et Limitations
                  </Typography>
                </li>
                <li>
                  <Typography
                    style={{ color: "black" }}
                    component={Link}
                    to="#resiliation"
                    variant="body2"
                    onClick={() => scrollToSection("resiliation")}
                  >
                    Résiliation
                  </Typography>
                </li>
                <li>
                  <Typography
                    style={{ color: "black" }}
                    component={Link}
                    to="#modification"
                    variant="body2"
                    onClick={() => scrollToSection("modification")}
                  >
                    Modification des conditions
                  </Typography>
                </li>
                <li>
                  <Typography
                    style={{ color: "black" }}
                    component={Link}
                    to={"#litiges"}
                    variant="body2"
                    onClick={() => scrollToSection("litiges")}
                  >
                    Litiges
                  </Typography>
                </li>
                <li>
                  <Typography
                    style={{ color: "black" }}
                    component={Link}
                    to="#propriété"
                    variant="body2"
                    onClick={() => scrollToSection("propriété")}
                  >
                    Droits de Propriété Intellectuelle
                  </Typography>
                </li>
                <li>
                  <Typography
                    style={{ color: "black" }}
                    component={Link}
                    to="#contact"
                    variant="body2"
                    onClick={() => scrollToSection("contact")}
                  >
                    Contact
                  </Typography>
                </li>
              </ul>
            </Box>
          </Grid>
          <Grid>
            <Box id="introduction" className={classes.text}>
              <Typography variant="h5">1. Introduction</Typography>
            </Box>
            <Box className={classes.text}>
              <Typography variant="body2">
                Nous sommes témoins d'une remarquable effervescence
                entrepreneuriale dans le domaine des produits africains, qu'il
                s'agisse d'épiceries spécialisées ou de marques de qualité.
                Notre objectif est de faciliter l'accès à ces produits pour nos
                clients via notre marketplace tout en offrant aux entrepreneurs
                la possibilité de présenter leurs articles en ligne et de les
                promouvoir. Ensemble, créons un espace où la richesse des
                produits africains est est à portée de main, sans compromis sur
                la qualité !
              </Typography>
            </Box>
            <Box id="utilisation" className={classes.text}>
              <Typography variant="h5">
                2. Utilisation de la plateforme
              </Typography>
            </Box>
            <Box className={classes.text}>
              <Typography variant="h6">2.1 Utilisateurs Clients</Typography>
            </Box>
            <Box className={classes.text}>
              <Typography variant="body2">
                Les utilisateurs clients peuvent rechercher des produits
                disponibles dans les magasins locaux partenaires. Ils ne peuvent
                pas effectuer de paiements ou de commandes directement sur la
                plateforme.
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6" className={classes.text}>
                2.2 Epiceries
              </Typography>
            </Box>
            <Box className={classes.text}>
              <Typography variant="body2">
                Les épiceries peuvent créer un compte et publier leurs produits
                sur la plateforme. Elles sont responsables de l'exactitude et de
                la mise à jour des informations sur leurs produits. Les
                épiceries sont autorisées à contacter les fournisseurs pour des
                partenariats.
              </Typography>
            </Box>
            {/*<Box className={classes.text}>
              <Typography variant="h6">2.3 Fournisseurs</Typography>
            </Box>
            <Box className={classes.text}>
              <Typography variant="body2">
                Les fournisseurs peuvent publier et gérer leurs produits sur la
                plateforme. Ils peuvent également contacter les épiceries pour
                des partenariats. Les informations fournies par les fournisseurs
                doivent être précises et à jour.
              </Typography>
            </Box>*/}
            <Box id="user" className={classes.text}>
              <Typography variant="h5">3. Compte Utilisateur</Typography>
            </Box>
            <Box>
              <Typography variant="h6">3.1 Inscription</Typography>
            </Box>
            <Box className={classes.text}>
              <Typography variant="body2">
                Vous devez créer un compte pour accéder à certaines
                fonctionnalités de la plateforme. Les informations fournies lors
                de l'inscription doivent être exactes et complètes.
              </Typography>
            </Box>
            <Box className={classes.text}>
              <Typography variant="h6">3.2 Mot de passe</Typography>
            </Box>
            <Box className={classes.text}>
              <Typography variant="body2">
                Vous êtes responsable de la confidentialité de votre mot de
                passe et de votre compte. Vous êtes également responsable de
                toutes les activités qui se produisent sous votre compte.
              </Typography>
            </Box>
            <Box id="content" className={classes.text}>
              <Typography variant="h5">4. Contenu Utilisateur</Typography>
            </Box>
            <Box>
              <Typography variant="h6">4.1 Responsabilité</Typography>
            </Box>
            <Box className={classes.text}>
              <Typography variant="body2">
                En publiant du contenu sur la plateforme, vous garantissez que
                vous avez le droit de le faire et que le contenu est conforme à
                toutes les lois applicables. Vous consentez à ce que le contenu
                soit accessible aux autres utilisateurs de la plateforme.
              </Typography>
            </Box>
            <Box id="responsability" className={classes.text}>
              <Typography variant="h5">
                5. Responsabilités et Limitations
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6">
                5.1 Exclusion de Responsabilité
              </Typography>
            </Box>
            <Box className={classes.text}>
              <Typography variant="body2">
                Nous ne sommes pas responsables des transactions, des produits
                ou des services proposés par les épiceries ou les fournisseurs
                sur la plateforme. Nous ne garantissons pas l'exactitude, la
                qualité ou la disponibilité des produits.
              </Typography>
            </Box>
            <Box id="resiliation">
              <Typography variant="h5" className={classes.text}>
                6. Résiliation
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6">6.1 Résiliation</Typography>
            </Box>
            <Box className={classes.text}>
              <Typography variant="body2">
                Nous nous réservons le droit de résilier ou de suspendre votre
                compte en cas de violation des présentes conditions ou de
                comportement inapproprié.
              </Typography>
            </Box>
            <Box id="modification" className={classes.text}>
              <Typography variant="h5">
                7. Modification des Conditions
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6">7.1 Modification</Typography>
            </Box>
            <Box className={classes.text}>
              <Typography variant="body2">
                Nous pouvons modifier ces conditions à tout moment. Les
                modifications seront publiées sur la plateforme et entreront en
                vigueur dès leur publication.
              </Typography>
            </Box>
            <Box id="litiges" className={classes.text}>
              <Typography variant="h5">8. Litiges et Arbitrage</Typography>
            </Box>
            <Box>
              <Typography variant="h6">8.1 Litiges</Typography>
            </Box>
            <Box className={classes.text}>
              <Typography variant="body2">
                Tout litige découlant de l'utilisation de la plateforme sera
                régi par les lois en vigueur. Tout différend non résolu sera
                soumis à un arbitrage conformément aux règles d'arbitrage en
                vigueur.
              </Typography>
            </Box>
            <Box id="propriété" className={classes.text}>
              <Typography variant="h5">
                9. Droits de Propriété Intellectuelle
              </Typography>
            </Box>
            <Box className={classes.text}>
              <Typography variant="body2">
                Tous les contenus présents sur la plateforme RayonAfrique, y
                compris, mais sans s'y limiter, les textes, les images, les
                logos, les vidéos, les graphiques, les éléments interactifs et
                tout autre contenu, sont la propriété intellectuelle de
                RayonAfrique ou sont utilisés avec les autorisations
                nécessaires. Ces contenus sont protégés par les lois sur les
                droits d'auteur, les marques déposées et d'autres lois relatives
                à la propriété intellectuelle.
              </Typography>
            </Box>
            <Box className={classes.text}>
              <Typography variant="body2">
                Les utilisateurs de la plateforme s'engagent à respecter ces
                droits de propriété intellectuelle. Il est strictement interdit
                de copier, de reproduire, de distribuer, de modifier, de publier
                ou de transmettre tout contenu de la plateforme sans une
                autorisation écrite préalable de RayonAfrique.
              </Typography>
            </Box>
            <Box className={classes.text}>
              <Typography variant="body2">
                Les utilisateurs peuvent utiliser les contenus présents sur la
                plateforme uniquement à des fins personnelles et non
                commerciales. Toute utilisation non autorisée de ces contenus
                peut entraîner des poursuites légales.
              </Typography>
            </Box>
            <Box className={classes.text}>
              <Typography variant="body2">
                Si vous estimez que vos droits de propriété intellectuelle ont
                été violés sur la plateforme RayonAfrique, veuillez nous
                contacter immédiatement pour que nous puissions prendre les
                mesures appropriées.
              </Typography>
            </Box>
            <Box id="contact" className={classes.text}>
              <Typography variant="h5">10. Contact</Typography>
            </Box>
            <Box>
              <Typography variant="h6">10.1 Coordonnées</Typography>
            </Box>
            <Box className={classes.text}>
              <Typography variant="body2">
                Si vous avez des questions ou des préoccupations concernant les
                présentes conditions, veuillez nous contacter à l'adresse
                suivante : rayon.afrique.shop@gmail.com.
              </Typography>
            </Box>
          </Grid>
        </Box>
      </section>

      <Footer />
    </div>
  );
};

export default TermsAndConditions;
