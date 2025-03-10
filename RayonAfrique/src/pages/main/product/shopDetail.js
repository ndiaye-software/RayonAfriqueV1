import React, { useState, useEffect } from "react";
import Navbar from "../../../components/main/navbar";
import Footer from "../../../components/main/footer";
import { Grid, Stack, Typography, Box, Button } from "@mui/material";
import ProductShop from "../../../components/main/ProductShop";
import { useParams } from "react-router-dom";
import hostname from "../../../hostname";
import { LocationOn } from "@material-ui/icons";
import { Helmet } from "react-helmet";
import useStyles from "../../../styles/pages/main/product/shopDetail";

function ShopDetail() {
  const { name } = useParams();
  useStyles();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userPosition, setUserPosition] = useState(null);

  // Utiliser useEffect pour appeler getUserPosition lors du montage
  useEffect(() => {
    getUserPosition();
  }, []);

  const getUserPosition = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserPosition({ latitude, longitude });
        },
        (error) => {
          console.error("Erreur de géolocalisation :", error);
        }
      );
    } else {
      console.log("La géolocalisation n'est pas prise en charge.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${hostname}/api/v1/user/shop/grocery/${name}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userPosition }),
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setData(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [name, userPosition]);

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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>No data available</div>;
  }

  return (
    <>
      <div>
        <Helmet>
          <meta
            name="description"
            content="Détails du produit - Découvrez où trouver ce produit parmi les épiceries et marques africaines proposées par RayonAfrique. Achetez des produits authentiques africains."
          />
          <meta
            name="keywords"
            content="RayonAfrique, détails du produit, épicerie africaine, marques africaines, produits africains, acheter en ligne, produits authentiques africains"
          />
          <meta name="author" content="RayonAfrique" />
          <meta
            property="og:image"
            content="https://res.cloudinary.com/dpodybbfe/image/upload/v1719949488/rayonafrique_wsbbxn.png"
          />
        </Helmet>

        <Box>
          <Navbar />
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{ flexDirection: { xs: "column", sm: "row" } }}
          >
            <Box
              flex={4}
              p={{ xs: 0, md: 2 }}
              sx={{ backgroundColor: "#f9fafb" }}
            >
              <Box>
                <Box sx={{ textAlign: "center" }}>
                  <Typography variant="h5" paddingBottom="30px">
                    Disponible dans <span>{data.length}</span> épicerie(s)
                  </Typography>
                </Box>

                <Box justifyContent="center" display="flex">
                  <Button
                    onClick={getUserPosition}
                    variant="contained"
                    sx={{
                      mt: 3,
                      mb: 2,
                      bgcolor: "#922B21",
                      "&:hover": { backgroundColor: "#A63F35" },
                    }}
                    endIcon={<LocationOn />}
                  >
                    Mettre ma position
                  </Button>
                </Box>

                <Grid item xs={12} container spacing={3}>
                  {visibleProducts.map((product, index) => (
                    <Grid
                      display="flex"
                      padding="0px"
                      flexDirection="column"
                      alignItems="center"
                      item
                      xs={12}
                      sm={12}
                      md={6}
                      lg={4}
                      key={index}
                    >
                      <ProductShop
                        key={index}
                        image={product.image || null}
                        nomProduit={product.nomProduit}
                        adresse={product.adresse}
                        nomEpicerie={product.nomEpicerie}
                        prix={product.prix}
                        distance={product.distance}
                        storeLongitude={product.longitude}
                        storeLatitude={product.latitude}
                        clientLatitude={userPosition?.latitude}
                        clientLongitude={userPosition?.longitude}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Box>
              <Box display="flex" justifyContent="center" marginTop="45px">
                <Box maxWidth="1000px">
                  <Typography variant="body2" fontWeight={700}>
                    Chez RayonAfrique, nous sommes fiers de vous présenter notre
                    vaste réseau d'épiceries partenaires, dédiées à vous offrir
                    les meilleurs produits africains. Grâce à notre plateforme,
                    trouver les épiceries vendant le produit que vous recherchez
                    n'a jamais été aussi simple. Que vous cherchiez du bissap,
                    du café touba ou tout autre délice africain, nos épiceries
                    partenaires vous garantissent des produits authentiques et
                    de qualité. Explorez facilement notre réseau et découvrez de
                    nouvelles épiceries près de chez vous, toutes engagées à
                    vous fournir une expérience de shopping unique. Avec
                    RayonAfrique, accédez à un monde de saveurs africaines en
                    quelques clics seulement, tout en soutenant nos épiceries
                    locales.
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "20px",
                }}
              >
                <Button
                  disabled={currentPage === 1}
                  onClick={handlePreviousPage}
                >
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
        </Box>
      </div>
    </>
  );
}

export default ShopDetail;
