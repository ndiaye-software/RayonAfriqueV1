import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    fetch(`${hostname}/api/v1/epicerie/product/read`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
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
              <Grid xs={12} container spacing={3}>
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
                            image={require(`../../../images/${val.image}`)}
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
            </Box>
          </Stack>
          <Footer />
        </Box>
      </div>
    </>
  );
}

export default EpicerieProductSearch;
