import React, { useState, useEffect } from "react";
import Sidebar from "../../components/main/SidebarShop";
import Navbar from "../../components/epicerie/navbarEpicerie";
import Footer from "../../components/main/footer";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Stack} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import { Button } from "@material-ui/core";
import CardFournisseurProductMarket from "../../components/epicerie/cardFournisseurProductMarket";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from '@mui/material/TextField';
import hostname from "../../hostname";

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

  ButtonSearch: {
    fontWeight: "bolder",
    color: "white",
    backgroundColor: "#922B21",
    minWidth: "100px",
    padding: "15px",
    fontSize: "12px",
    borderTopRightRadius: "20px 20px",
    borderBottomRightRadius: "20px 20px",
    border: "solid",
    boxShadow: "0 0.4rem #dfd9d9",
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

function EpicerieMarket() {
  const [data, setData] = useState([]);
  const [productNames, setProductNames] = useState([]);
  useEffect(() => {
    fetch(`${hostname}/api/v1/market/readMarket`)
      .then((res) => res.json())
      .then((data) => {
        setData(data); 
        const names = data.map(product => product.name); 
        setProductNames(names);
      })
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

  const classes = useStyles();

  return (
    <>
      <div>
        <Box>
          <Navbar />
          <Stack
            direction="row"
            justifyContent="space-between"
            container
            sx={{ flexDirection: { xs: "column", sm: "row" } }}
          >
            <Sidebar />
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
                          <TextField {...params} label="Produits" />
                        )}
                      />
                    </Box>
                  </Grid>
                  <Grid className={classes.buttonContainer}>
                    {" "}
                    <Button
                      className={classes.ButtonSearch}
                      href="/patient"
                      variant="contained"
                      endIcon={<SearchIcon />}
                    >
                      Rechercher
                    </Button>{" "}
                  </Grid>
                </Box>
              </Box>
              <Grid xs={12} container spacing={3}>
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
                    <CardFournisseurProductMarket
                      key={index}
                      image={product.image}
                      name={product.name}
                      nomFournisseur={product.nomFournisseur}
                      id={product.id}
                      description={product.description}
                      price={product.price}
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

export default EpicerieMarket;
