import React from "react";
import Navbar from "../../../components/main/navbar";
import Footer from "../../../components/main/footer";
import SuccessImage from "../../../images/success.svg";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Button } from "@mui/material";
import { Login } from "@mui/icons-material";

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

  Button: {
    fontWeight: "bolder",
    color: "white",
    backgroundColor: "#922B21",
    width: "250px",
    minWidth: "250px",
    marginTop: "20px",
    padding: "20px",
    fontSize: "12px",

    "&:hover": {
      backgroundColor: "#A63F35",
    },
  },
}));

const ValidationEpicerie = () => {
  const classes = useStyles();

  return (
    <div>
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
              Accédez à votre compte RayonAfrique
            </h3>

            <Box justifyContent="center" display="flex" marginBottom="30px">
              <Button
                href="/connexion"
                className={classes.Button}
                endIcon={<Login />}
              >
                Se connecter
              </Button>
            </Box>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ValidationEpicerie;
