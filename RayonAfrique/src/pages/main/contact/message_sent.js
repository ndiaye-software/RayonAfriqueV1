import React from "react";
import Navbar from "../../../components/main/navbar";
import Footer from "../../../components/main/footer";
import MailSent from "../../../images/mail_sent.svg";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  section1: {
    width: "auto",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    textAlign: "left",
    padding: "100px",
    flexWrap: "wrap",
    backgroundColor: "white",
  },

  section1_div_h1: {
    fontSize: "20px",
    background: "#922B21",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    fontWeight: "bolder",
    marginBottom: "30px",
    marginTop: "30px",
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

  section1_div_h3: {
    fontSize: "17px",
    background: "#922B21",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    whiteSpace: "nowrap",
    overflow: "hidden",
    animation: "$typing1 3s, $cursor1 .4s step-end infinite alternate",
  },
  "@keyframes typing1": {
    "0%": {
      width: 0,
    },
    "100%": {
      width: "100%",
    },
  },
  "@keyframes cursor1": {
    "0%": {
      borderBottomWidth: 2,
    },
    "100%": {
      borderBottomWidth: 0,
    },
  },

}));

const MessageEnvoyé = () => {
  const classes = useStyles();

  return (
    <div>
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
