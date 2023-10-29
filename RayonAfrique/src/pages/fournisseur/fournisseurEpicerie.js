import React, { useState, useEffect } from "react";
import Navbar from "../../components/fournisseur/navbarFournisseur";
import Footer from "../../components/main/footer";
import backgroundImage from "../../images/background.jpg";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Typography } from "@material-ui/core";
import { Stack } from "@mui/material";
import Box from "@mui/material/Box";
import CardEpicerie from "../../components/fournisseur/cardEpicerie";
import { Grid } from "@mui/material";
import hostname from "../../hostname";

const useStyles = makeStyles((theme) => ({
  section1: {
    width: "auto",
    height: "auto",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    textAlign: "left",
    padding: "100px",
    flexWrap: "wrap",
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    filter: "blur(2px)",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    [theme.breakpoints.down("sm")]: { justifyContent: "center" },
    zIndex: 1,
  },

  section1_div_h1: {
    fontSize: "3.5vw",
    background: "white",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    fontWeight: "bolder",
    marginBottom: "20px",
    zIndex: 2,
    [theme.breakpoints.down("sm")]: {
      display: "none",
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
      display: "none",
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
    transform: "translate(-50%, -50%)",
    zIndex: 2,
    textAlign: "left",
    color: "white",
    [theme.breakpoints.down("sm")]: {
      top: "50%",
      left: "50%",
      justifyContent: "center",
    },
  },

}));

const FournisseurEpicerie = () => {
  const classes = useStyles();

  const [data, setData] = useState([])
  useEffect(()=> {
    fetch(`${hostname}/api/v1/fournisseur/readEpicerie`)
    .then(res => res.json())
    .then(data => setData(data))
    .catch(err => console.log(err))
  }, [])

  const productsPerPage = 9;
  const totalPages = Math.ceil(data.length / productsPerPage);

  const [currentPage, setCurrentPage] = useState(1);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const startIndex = (currentPage - 1) * productsPerPage;
  const visibleProducts = data.slice(startIndex, startIndex + productsPerPage);

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
            Lier de nouveaux partenariats !
          </Typography>
        </div>
      </section>

      <Box sx={{ backgroundColor: "#f9fafb" }} paddingTop="35px" paddingBottom="35px" textAlign="center">
        <Typography variant="h5">Nos magasins partenaires !</Typography>
      </Box>

      <Stack direction="row" justifyContent="space-between">
        <Box
          flex={4}
          p={{ xs: 0, md: 2 }}
          sx={{ backgroundColor: "#f9fafb" }}
        >
          <Grid container spacing={3}>
            {visibleProducts.map((product, index) => (
              <Grid display="flex" flexDirection="column" alignItems="center" item xs={12} sm={6} md={4} key={index}>
              <CardEpicerie
                key={index}
                image={product.image}
                name={product.nameCompany}
                address={product.address}
              />
              </Grid>
            ))}
          </Grid>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <Button disabled={currentPage === 1} onClick={handlePreviousPage}>
              Previous
            </Button>
            <Button
              disabled={currentPage === totalPages}
              onClick={handleNextPage}
            >
              Next
            </Button>
          </Box>
        </Box>
      </Stack>

      <Footer />
    </div>
  );
};

export default FournisseurEpicerie;
