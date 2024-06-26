import React from "react";
import Navbar from "../../../components/epicerie/navbarEpicerie";
import Footer from "../../../components/main/footer";
import { Button, Typography } from "@material-ui/core";
import TableProduct from "../../../components/epicerie/tableProductEpicerie";
import { Box, Stack } from "@mui/material";
import { Add } from "@material-ui/icons";
import { Helmet } from "react-helmet";
import useStyles from "../../../styles/pages/epicerie/product/epicerieProduct";


const EpicerieProduct = () => {
  const classes = useStyles();

  return (
    <div>
      <Helmet>
        <meta
          name="description"
          content="RayonAfrique - epicerie - produit"
        />
      </Helmet>
      <Navbar />

      <section className={classes.banner}>
        <div className={classes.bannerImg}></div>
        <div className={classes.bannerText}>
          <Typography variant="h1" className={classes.section1_div_h1}>
            RayonAfrique
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
              href="/epicerie/produit/search"
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
