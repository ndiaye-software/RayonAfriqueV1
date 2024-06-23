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
            content="RayonAfrique - réinitialisation validation"
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
