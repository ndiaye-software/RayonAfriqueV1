import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/main/SidebarDetail";
import Navbar from "../../../components/main/navbar";
import Footer from "../../../components/main/footer";
import { Grid, Stack, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { Button } from "@material-ui/core";
import ProductShop from "../../../components/main/ProductShop";
import { useParams } from "react-router-dom";
import hostname from "../../../hostname";

function ShopDetail() {
  const { name } = useParams();

  const [data, setData] = useState([])
  useEffect(()=> {
    fetch(`${hostname}/api/v1/user/shop/grocery/${name}`)
    .then(res => res.json())
    .then((data) => setData(data))
  }, [name])


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
  const visibleProducts = data.slice(
    startIndex,
    startIndex + productsPerPage
  );

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
            <Sidebar />
            <Box
              flex={4}
              p={{ xs: 0, md: 2 }}
              sx={{ backgroundColor: "#f9fafb" }}
            >
              <Box>
                <Box sx={{ textAlign: "center" }}>
                  <Typography variant="h5" paddingBottom="30px">
                    Disponible dans{" "} <span>{data.length}</span> {" "} épicerie(s)
                  </Typography>
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
                      <ProductShop
                        key={index}
                        image={product.image}
                        nomProduit={product.nomProduit}
                        adresse={product.adresse}
                        nomEpicerie={product.nomEpicerie}
                        prix={product.prix}
                      />
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
