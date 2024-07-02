import React from "react";
import Navbar from "../../../components/main/navbar";
import Footer from "../../../components/main/footer";
import SuccessImage from "../../../images/success.svg";
import { Helmet } from "react-helmet";
import useStyles from "../../../styles/pages/main/log/validation_marque";

const ValidationMarque = () => {
  const classes = useStyles();

  return (
    <div>
      <Helmet>
        <meta
          name="description"
          content="Validation de marque sur RayonAfrique - Votre marque a été validée avec succès. Vous pouvez maintenant commencer à vendre vos produits africains sur notre plateforme."
        />
        <meta
          name="keywords"
          content="RayonAfrique, validation marque, marques africaines, vente produits africains, confirmation marque, démarrer vente"
        />
        <meta name="author" content="RayonAfrique" />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/dpodybbfe/image/upload/v1719949488/rayonafrique_wsbbxn.png"
        />
      </Helmet>

      <div sx={{ minHeight: "100vh" }}>
        <Navbar />
        <div className={classes.section1}>
          <img
            src={`${SuccessImage}`}
            height="300px"
            width="350px"
            alt="svg medecin"
          />

          <div>
            <h1 className={classes.section1_div_h1}>
              Bienvenue sur RayonAfrique !{" "}
            </h1>

            <h3 className={classes.section1_div_h3}>
              Vous êtes bien enregistré chez RayonAfrique
            </h3>

            <h3 className={classes.section1_div_h3}>
              Vous serez informé dès la sortie de nos
            </h3>

            <h3 className={classes.section1_div_h3}>
              fonctionnalités pour les marques de produits africains !
            </h3>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ValidationMarque;
