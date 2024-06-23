import React from "react";
import Navbar from "../../../components/main/navbar";
import Footer from "../../../components/main/footer";
import MailNotSent from "../../../images/error.svg";
import { Helmet } from "react-helmet";
import useStyles from "../../../styles/pages/main/contact/message_not_sent";

const MessageNonEnvoyé = () => {
  const classes = useStyles();

  return (
    <div>
      <Helmet>
        <meta
          name="description"
          content="RayonAfrique - Echec envoi message"
        />
      </Helmet>
      <div sx={{ minHeight: "100vh" }}>
        <Navbar />
        <div className={classes.section1}>
          <img
            src={`${MailNotSent}`}
            height="300px"
            width="350px"
            alt="svg medecin"
          />

          <div>
            <h1 className={classes.section1_div_h1}>ERREUR !</h1>

            <h3 className={classes.section1_div_h3}>
              Votre message n'a pas été envoyé
            </h3>

            <h3 className={classes.section1_div_h3}>
              nous nous excusons de ce désagrément !
            </h3>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MessageNonEnvoyé;
