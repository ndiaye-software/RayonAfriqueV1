import React from "react";
import Navbar from "../../../components/main/navbar";
import Footer from "../../../components/main/footer";
import SecurityImage from "../../../images/security.svg";
import { Helmet } from "react-helmet";
import useStyles from "../../../styles/pages/main/log/reinitialisation_validation";

const ValidationReinitialisation = () => {
  const classes = useStyles();

  return (
    <div>
      <div sx={{ minHeight: "100vh" }}>
        <Helmet>
          <meta
            name="description"
            content="Validation de réinitialisation de mot de passe sur RayonAfrique - Votre mot de passe a été réinitialisé avec succès. Vous pouvez maintenant vous connecter avec votre nouveau mot de passe."
          />
          <meta
            name="keywords"
            content="RayonAfrique, réinitialisation mot de passe, mot de passe réinitialisé, validation réinitialisation, sécurité compte, connexion"
          />
          <meta name="author" content="RayonAfrique" />
          <meta
            property="og:image"
            content="https://res.cloudinary.com/dpodybbfe/image/upload/v1719949488/rayonafrique_wsbbxn.png"
          />
        </Helmet>

        <Navbar />
        <div className={classes.section1}>
          <img
            src={`${SecurityImage}`}
            height="300px"
            width="350px"
            alt="svg medecin"
          />

          <div>
            <h1 className={classes.section1_div_h1}>RayonAfrique ! </h1>

            <h3 className={classes.section1_div_h3}>
              Un lien de réinitialisation vous a été envoyé dans votre boîte
              mail
            </h3>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ValidationReinitialisation;
