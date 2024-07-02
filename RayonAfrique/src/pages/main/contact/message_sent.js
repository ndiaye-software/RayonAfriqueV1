import React from "react";
import Navbar from "../../../components/main/navbar";
import Footer from "../../../components/main/footer";
import MailSent from "../../../images/mail_sent.svg";
import { Helmet } from "react-helmet";
import useStyles from "../../../styles/pages/main/contact/message_sent";

const MessageEnvoyé = () => {
  const classes = useStyles();

  return (
    <div>
      <Helmet>
        <meta
          name="description"
          content="Message envoyé avec succès sur RayonAfrique - Merci de nous avoir contactés. Nous vous répondrons dans les plus brefs délais."
        />
        <meta
          name="keywords"
          content="RayonAfrique, message envoyé, contact réussi, support client, confirmation message"
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
            src={`${MailSent}`}
            height="300px"
            width="350px"
            alt="svg medecin"
          />

          <div>
            <h1 className={classes.section1_div_h1}>Message envoyé ! </h1>

            <h3 className={classes.section1_div_h3}>
              Votre message a été bien envoyé,
            </h3>

            <h3 className={classes.section1_div_h3}>
              nous vous contacterons au plus tôt !
            </h3>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MessageEnvoyé;
