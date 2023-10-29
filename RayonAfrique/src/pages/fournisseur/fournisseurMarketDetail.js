import React, {useEffect, useState}  from "react";
import Navbar from "../../components/fournisseur/navbarFournisseur";
import Footer from "../../components/main/footer";
import { Stack, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useParams } from "react-router-dom";
import hostname from "../../hostname";

function FournisseurMarketDetail() {
  
  const { idproductUser} = useParams();
  const [data, setData] = useState([])

  useEffect(()=> {
    fetch(`${hostname}/api/v1/market/readMarketDetailFournisseur/${idproductUser}`)
    .then(res => res.json())
    .then(data => setData(data))
    .catch(err => console.log(err))
  }, [idproductUser]);

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
                        src={data.image}
                        alt={data.nomProduit}
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
                    <Typography variant="h6">
                      {data.nomFournisseur}
                    </Typography>
                      <Typography variant="h6">
                        {data.nomProduit}
                      </Typography>
                  </Box>
                  <Box>
                      <span>
                        {data.description}
                      </span>
                  </Box>
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

export default FournisseurMarketDetail;
