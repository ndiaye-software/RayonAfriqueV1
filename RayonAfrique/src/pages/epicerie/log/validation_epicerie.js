import React from "react";
import Navbar from "../../../components/main/navbar";
import Footer from "../../../components/main/footer";
import SuccessImage from "../../../images/success.svg";
import { Box, Button } from "@mui/material";
import { Login } from "@mui/icons-material";
import { Helmet } from "react-helmet";
import useStyles from "../../../styles/pages/epicerie/log/validation_epicerie";

const ApproveEpicerie = () => {
  const classes = useStyles();

  return (
    <div>
      <Helmet>
        <meta
          name="description"
          content="RayonAfrique - validation inscription épicerie"
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

export default ApproveEpicerie;
