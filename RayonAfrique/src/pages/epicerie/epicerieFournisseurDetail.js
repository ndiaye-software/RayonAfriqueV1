import React, { useState, useEffect } from "react";
import Navbar from "../../components/epicerie/navbarEpicerie";
import Footer from "../../components/main/footer";
import { Stack, Typography } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@mui/material/Box";
import { Button } from "@material-ui/core";
import { Grid } from "@mui/material";
import CardFournisseurProduct from "../../components/epicerie/cardFournisseurProduct";
import { Phone } from "@material-ui/icons";
import { useParams } from "react-router-dom";
import hostname from "../../hostname";

const useStyles = makeStyles(() => ({
  ButtonContact: {
    fontWeight: "bolder",
    color: "white",
    backgroundColor: "#922B21",
    width: "80%",
    minWidth: "300px",
    marginTop: "20px",
    padding: "20px",
    fontSize: "12px",

    "&:hover": {
      backgroundColor: "#A63F35",
    },
  },

  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    gap: "10px",
  },
}));
function EpicerieFournisseurDetail() {
  const { nameCompany } = useParams();
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(`${hostname}/api/v1/epicerie/readFournisseurDetail/${nameCompany}`)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  }, [nameCompany]);

  const classes = useStyles();

  // Extract "produit" and "user" sections from data
  const produits = data.produit || [];
  const user = data.user || [];

  const productsPerPage = 6;
  const totalPages = Math.ceil(produits.length / productsPerPage);

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
  const visibleProducts = produits.slice(
    startIndex,
    startIndex + productsPerPage
  );

  // Check if produit data is available
  const produitsDataAvailable = produits.length > 0;
  const produitsSection = produitsDataAvailable && (
    <Box>
      <Box sx={{ textAlign: "center" }}>
        <Typography paddingBottom="30px">Nos produits</Typography>
      </Box>

      <Grid container spacing={3}>
        {visibleProducts.map((product, index) => (
          <Grid
            display="flex"
            flexDirection="column"
            alignItems="center"
            item
            xs={12}
            sm={6}
            md={4}
            key={index}
          >
            <CardFournisseurProduct
              image={product.imageProduct}
              nom={product.name}
              nomFournisseur={product.nomFournisseur}
              prix={product.prix}
              description={product.descriptionProduct}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );

  const userSection = (
    <Box
      flexWrap="wrap"
      justifyContent="space-evenly"
      display="flex"
      flexDirection="row"
      marginBottom="35px"
      marginTop="35px"
    >
      <Box>
        <div>
          <img
            src={user.imageUser}
            alt={user.nomFournisseur}
            height="300px"
            width="350px"
          />
        </div>
      </Box>

      <Box
        padding="20px"
        maxWidth="500px"
        flexDirection="column"
        display="flex"
        gap={2}
      >
        <Box>
          <Typography variant="h5">{user.nomFournisseur}</Typography>
        </Box>
        <Box>
          {user.descriptionUser}
          <Grid className={classes.buttonContainer}>
            <Button
              className={classes.ButtonContact}
              href={`mailto:${user.mail}`}
              variant="contained"
              startIcon={<Phone />}
            >
              Contactez-Nous !
            </Button>
          </Grid>
        </Box>
      </Box>
    </Box>
  );

  return (
    <>
      <div>
        <Box>
          <Navbar />
          <Stack direction="row" justifyContent="space-between">
            <Box
              flex={4}
              p={{ xs: 0, md: 2 }}
              sx={{ backgroundColor: "#f9fafb" }}
            >
              {/* User Section */}
              {userSection}

              {/* Produit Section */}
              {produitsSection}

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
                <Button disabled={currentPage === totalPages} onClick={handleNextPage}>
                  Next
                </Button>
              </Box>
            </Box>
          </Stack>
          <Footer />
        </Box>
      </div>
    </>
  );
}

export default EpicerieFournisseurDetail;
