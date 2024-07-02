import React from "react";
import Navbar from "../../../components/main/navbar";
import Footer from "../../../components/main/footer";
import MailNotSent from "../../../images/error.svg";
import { Helmet } from "react-helmet";
import useStyles from "../../../styles/pages/epicerie/contact/message_not_sent";

const MessageNonEnvoyé = () => {
  const classes = useStyles();

  return (
    <div>
      <Helmet>
        <meta
          name="description"
          content="Échec de l'envoi du message sur RayonAfrique - Votre message n'a pas pu être envoyé. Veuillez réessayer ou contacter notre support pour obtenir de l'aide."
        />
        <meta
          name="keywords"
          content="RayonAfrique, message non envoyé, échec envoi message, problème message, support client"
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
