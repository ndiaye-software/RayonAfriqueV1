import React, { useState, useEffect } from "react";
import Navbar from "../../../components/main/navbar";
import Footer from "../../../components/main/footer";
import { Grid, Stack, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ProductShop from "../../../components/main/ProductShop";
import { useParams } from "react-router-dom";
import hostname from "../../../hostname";
import { LocationOn } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  // ...styles similaires à ceux utilisés dans la première page
}));

function ShopDetail() {
  const { name } = useParams();
  useStyles();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [userPosition, setUserPosition] = useState(null);

  useEffect(() => {
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
  }, []);

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
                      {product.image && (
                        <ProductShop
                          key={index}
                          image={require(`../../../images/${product.image}`)}
                          nomProduit={product.nomProduit}
                          adresse={product.adresse}
                          nomEpicerie={product.nomEpicerie}
                          prix={product.prix}
                          distance={product.distance}
                          longitude={product.longitude}
                          latitude={product.latitude}
                        />
                      )}
                    </Grid>
                  ))}
                </Grid>
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
