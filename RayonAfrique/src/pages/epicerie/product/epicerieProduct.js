import React from "react";
import Navbar from "../../../components/epicerie/navbarEpicerie";
import Footer from "../../../components/main/footer";
import backgroundImage from "../../../images/background.jpg";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Typography } from "@material-ui/core";
import TableProduct from "../../../components/epicerie/tableProductEpicerie";
import { Box, Stack } from "@mui/material";
import { Add } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  section1_div_h1: {
    fontSize: "3.5vw",
    background: "white",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    fontWeight: "bolder",
    marginBottom: "20px",
    zIndex: 2,
    [theme.breakpoints.down("sm")]: {
      fontSize: "20px",
    },
  },

  section1_div_h3: {
    fontSize: "2vw",
    background: "white",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    marginBottom: "20px",
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      fontSize: "15px",
    },
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

  AddButton: {
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

  banner: {
    position: "relative",
    width: "100%",
    height: "60vh",
    overflow: "hidden",
    [theme.breakpoints.down("sm")]: {
      height: "50vh",
    },
  },
  bannerImg: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    filter: "blur(2px)",
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: 1,
  },
  bannerText: {
    position: "absolute",
    top: "50%",
    left: "50%",
    textAlign: "center",
    transform: "translate(-50%, -50%)",
    zIndex: 2,
    color: "white",
    [theme.breakpoints.down("sm")]: {
      top: "50%",
      left: "50%",
      justifyContent: "center",
    },
  },
}));

const EpicerieProduct = () => {
  const classes = useStyles();

  return (
    <div>
      <Navbar />

      <section className={classes.banner}>
        <div className={classes.bannerImg}></div>
        <div className={classes.bannerText}>
          <Typography variant="h1" className={classes.section1_div_h1}>
            RayonAfrique+
          </Typography>
          <Typography variant="h3" className={classes.section1_div_h3}>
            Gérez vos produits !{" "}
          </Typography>
        </div>
      </section>

      <div>
        <Stack backgroundColor="#f9fafb">
          <Box width="300px" marginTop="30px" marginLeft="15px">
            <Button
              href="add"
              className={classes.AddButton}
              endIcon={<Add />}
            >
              Ajouter un produit
            </Button>
          </Box>
          <TableProduct />
        </Stack>
      </div>

      <Footer />
    </div>
  );
};

export default EpicerieProduct;
