import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/main/SidebarShop";
import Navbar from "../../../components/epicerie/navbarEpicerie";
import Footer from "../../../components/main/footer";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import { Button } from "@material-ui/core";
import Autocomplete from "@mui/material/Autocomplete";
import Product from "../../../components/main/product";
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

  ButtonSearch: {
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
                        noOptionsText="Produit non disponible, Créez le produit"
                        id="search"
                        onChange={(event)=> setSearchTerm(event.target.value)}
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
                          <TextField {...params} label="Chercher le produit" />
                        )}
                      />
                    </Box>
                  </Grid>
                  <Grid className={classes.buttonContainer}>
                    <Button
                      className={classes.ButtonSearch}
                      variant="contained"
                      endIcon={<SearchIcon />}
                    >
                      Rechercher
                    </Button>
                  </Grid>
                </Box>
              </Box>
              <Grid xs={12} container spacing={3}>
                {
                  visibleProducts
                    .filter((val) => {
                    if (searchTerm === "") {                  
                      return val;
                    }else if(val.name.toLowerCase().includes(searchTerm.toLowerCase())){
                    return val;
                  }
                  })
                  .map((val, index) => (
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
                        marque = {val.labelName}
                        id={val.id}
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

export default EpicerieProductSearch;
