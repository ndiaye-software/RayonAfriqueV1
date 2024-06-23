import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/main/SidebarShop";
import Navbar from "../../../components/main/navbar";
import Footer from "../../../components/main/footer";
import { Grid, Stack, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import Product from "../../../components/main/product";
import TextField from "@mui/material/TextField";
import hostname from "../../../hostname";
import { Helmet } from "react-helmet";
import useStyles from "../../../styles/pages/main/product/shop";

function Shop() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [productNames, setProductNames] = useState([]);

  const [order, setOrder] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedMarque, setSelectedMarque] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    fetch(`${hostname}/api/v1/user/shop/read`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        const names = data.map((product) => product.name);
        setProductNames(names);
      })
      .catch((err) => console.log(err));
  }, []);

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
            content="RayonAfrique - Recherche de produits africains"
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
                        noOptionsText="Pas de produits disponible"
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
                            label="Produits"
                            onChange={handleSearch}
                          />
                        )}
                      />
                    </Box>
                  </Grid>
                </Box>
              </Box>
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
                    <Typography variant="body2" align="center" fontWeight={700}>
                      Nous n'avons pas trouvé ce produit 😞
                    </Typography>
                    <Button
                      href="produit/suggestion"
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
                      Suggérer un produit
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
                    Découvrez RayonAfrique, votre destination en ligne pour des
                    produits africains uniques et authentiques. Sur notre page
                    de découverte de produits, trouvez tous les produits
                    disponibles sur le marché africain, avec une multitude
                    d'offres telles que le bissap rafraîchissant, le café touba
                    aromatique, le lakh, le dégué crémeux, la pâte d'arachide
                    savoureuse, le bâton de manioc, le zanban ... Nos
                    épiceries partenaires vous offrent une richesse de saveurs
                    et de produits que vous ne trouverez pas dans les grandes
                    surfaces. Avec RayonAfrique, soyez plus proche de vos produits préférés !
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Stack>
          <Footer />
        </Box>
      </div>
    </>
  );
}

export default Shop;
