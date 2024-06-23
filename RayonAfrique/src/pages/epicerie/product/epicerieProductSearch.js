import React, { useState, useEffect, useCallback } from "react";
import Sidebar from "../../../components/main/SidebarShop";
import Navbar from "../../../components/epicerie/navbarEpicerie";
import Footer from "../../../components/main/footer";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Stack, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import Product from "../../../components/epicerie/product";
import TextField from "@mui/material/TextField";
import hostname from "../../../hostname";
import { Helmet } from "react-helmet";
import { ToastContainer, toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  Box1: {
    display: "flex",
    flexDirection: "row",
    marginBottom: "30px",
  },

  inputWrapperContainer: {
    width: "350px",
    [theme.breakpoints.down("sm")]: {
      width: "200px",
    },
  },

  Button: {
    fontWeight: "bolder",
    color: "white",
    backgroundColor: "#922B21",
    minWidth: "100px",
    alignContent: "center",
    textAlign: "center",
    padding: "15px",
    fontSize: "12px",
    border: "solid",
    borderColor: "#922B21",
    "&:hover": {
      backgroundColor: "#A63F35",
      boxShadow: "0 0.4rem #dfd9d9",
    },
  },

  inputWrapper: {
    "& input": {
      backgroundColor: "white",
      border: "solid",
      fontSize: "1rem",
      padding: "15px",
      width: "100%",
      borderTopLeftRadius: "20px 20px",
      borderBottomLeftRadius: "20px 20px",
      color: "black",
      boxShadow: "0 0.4rem #dfd9d9",
      "&:focus": {
        outlineColor: "black",
      },
    },
  },
}));

function EpicerieProductSearch() {
  const [searchTerm, setSearchTerm] = useState("");

  const [data, setData] = useState([]);

  const [productNames, setProductNames] = useState([]);

  const [order, setOrder] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedMarque, setSelectedMarque] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const redirectToLogin = () => {
    localStorage.removeItem("accessToken");
    
    window.location.href = "/connexion";
  };

  const handleRefreshToken = useCallback(async () => {
    try {
      const response = await fetch(`${hostname}/api/v1/epicerie/auth/refresh`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.ok) {
        const { accessToken } = await response.json();
        localStorage.setItem("accessToken", accessToken);
        return accessToken; // Return the new access token
      } else {
        const data = await response.json();
        if (data.message) {
          toast.error(data.message);
        } else {
          toast("Erreur d'authentification");
        }
        redirectToLogin();
      }
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      redirectToLogin();
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");

        if (!accessToken) {
          redirectToLogin();
          return;
        }
        let response = await fetch(`${hostname}/api/v1/epicerie/product/read`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        if (response.status === 401 || response.status === 403) {
          const newAccessToken = await handleRefreshToken();

          if (newAccessToken) {
            response = await fetch(`${hostname}/api/v1/epicerie/product/read`, {
              headers: { Authorization: `Bearer ${newAccessToken}` },
            });
          } else {
            throw new Error("Failed to refresh token");
          }
        }

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setData(data);
        const names = data.map((product) => product.name);
        setProductNames(names);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [handleRefreshToken]);

  const productsPerPage = 15;
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

  let filteredProducts = visibleProducts;

  if (order) {
    filteredProducts = filteredProducts.sort((a, b) =>
      order === "Nom (A-Z)"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );
  }

  filteredProducts = filteredProducts.filter((val) => {
    if (!selectedCountry) return true;
    return val.countryName === selectedCountry;
  });

  filteredProducts = filteredProducts.filter((val) => {
    if (!selectedMarque) return true;
    return val.labelName === selectedMarque;
  });

  filteredProducts = filteredProducts.filter((val) => {
    if (!selectedCategory) return true;
    return val.categoryName === selectedCategory;
  });

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredAndSearchedProducts = filteredProducts.filter((val) => {
    if (searchTerm === "") {
      return true;
    } else if (val.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return true;
    }
    return false;
  });

  const classes = useStyles();

  return (
    <>
      <div>
        <Helmet>
          <meta
            name="description"
            content="RayonAfrique - epicerie africaine - recherche produit africain"
          />
        </Helmet>
        <Box backgroundColor="#f9fafb">
          <Navbar />
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{ flexDirection: { xs: "column", sm: "row" } }}
          >
            <Sidebar
              onOrderChange={setOrder}
              onCountryChange={setSelectedCountry}
              onMarqueChange={setSelectedMarque}
              onCategoryChange={setSelectedCategory}
            />
            <Box
              flex={4}
              p={{ xs: 0, md: 2 }}
              sx={{ backgroundColor: "#f9fafb" }}
            >
              <Box flexWrap="wrap">
                <Box
                  className={classes.Box1}
                  marginTop="20px"
                  sx={{
                    display: { xs: "flex" },
                    justifyContent: { xs: "center" },
                  }}
                >
                  <Grid>
                    <Box>
                      <Autocomplete
                        onSelect={(event) => setSearchTerm(event.target.value)}
                        disablePortal
                        id="search"
                        options={productNames}
                        sx={{
                          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                            {
                              borderColor: "black",
                            },
                          "& .MuiInputLabel-outlined.Mui-focused": {
                            color: "black",
                          },
                          width: 300,
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Chercher le produit"
                            onChange={handleSearch}
                          />
                        )}
                      />
                    </Box>
                  </Grid>
                </Box>
              </Box>
              <Grid item xs={12} container spacing={3}>
                {filteredAndSearchedProducts.length === 0 ? (
                  <Grid
                    display="flex"
                    xs={12}
                    item
                    padding="50px"
                    justifyContent="center"
                    alignContent="center"
                    alignItems="center"
                  >
                    <Grid xs={6} item>
                      <Typography
                        variant="body2"
                        align="center"
                        fontWeight={700}
                      >
                        Nous n'avons pas trouvé ce produit 😞
                      </Typography>
                      <Button
                        href="search/create"
                        fullWidth
                        variant="contained"
                        sx={{
                          fontWeight: 700,
                          mt: 3,
                          mb: 2,
                          backgroundColor: "#922B21",
                          "&:hover": { backgroundColor: "#A63F35" },
                        }}
                      >
                        Créer un produit
                      </Button>
                    </Grid>
                  </Grid>
                ) : (
                  <Grid xs={12} container spacing={3} item>
                    {filteredAndSearchedProducts.map((val, index) => {
                      return (
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
                          <Product
                            key={index}
                            image={val.image}
                            name={val.name}
                            description={val.description}
                            marque={val.labelName}
                            id={val.id}
                          />
                        </Grid>
                      );
                    })}
                  </Grid>
                )}
              </Grid>
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
              <Box display="flex" justifyContent="center" marginTop="45px">
                <Box maxWidth="800px">
                  <Typography variant="body2" fontWeight={700}>
                    Bienvenue sur la page de découverte de produits de
                    RayonAfrique. Explorez notre vaste sélection de produits
                    africains pour enrichir votre offre et attirer davantage de
                    clients. Nous vous aidons à trouver les meilleurs produits
                    disponibles sur le marché africain, afin que vous puissiez
                    proposer des nouveautés et des classiques à vos clients, et
                    ainsi améliorer votre épicerie. Profitez de notre plateforme
                    pour accéder facilement à des produits authentiques et de
                    qualité, et faire rayonner votre épicerie.
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Stack>
          <div>
            <ToastContainer theme="colored" />
          </div>
          <Footer />
        </Box>
      </div>
    </>
  );
}

export default EpicerieProductSearch;
