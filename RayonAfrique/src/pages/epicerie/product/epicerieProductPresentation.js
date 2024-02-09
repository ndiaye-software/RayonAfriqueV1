import React, { useState, useEffect } from "react";
import Navbar from "../../../components/epicerie/navbarEpicerie";
import Footer from "../../../components/main/footer";
import { makeStyles } from "@material-ui/core/styles";
import { Stack, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import hostname from "../../../hostname";
import { useParams } from "react-router-dom";
import { Button } from "@material-ui/core";

const useStyles = makeStyles(() => ({
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
}));

function EpicerieProductPresentation() {
  const [data, setData] = useState([]);

  const { idProduct } = useParams();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    fetch(`${hostname}/api/v1/epicerie/product/read/${idProduct}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
      .catch((err) => console.log(err));
  }, [idProduct]);

  const classes = useStyles();

  return (
    <>
      <div>
        <Box backgroundColor="#f9fafb">
          <Navbar />
          {data && (
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
                        alt={data.name}
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
                      <Typography variant="h6">Nom : {data.name} </Typography>
                      <Typography variant="h6">
                        Marque : {data.labelName}{" "}
                      </Typography>
                      <Typography variant="body1">
                        Catégorie : {data.categoryName}{" "}
                      </Typography>
                      <Typography variant="body1">
                        Pays : {data.countryName}{" "}
                      </Typography>
                    </Box>
                    <Box>
                      <span>{data.description}</span>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Stack>
          )}
          <Box display="flex" justifyContent="center" marginBottom="30px">
            <Button href={`${idProduct}/add`} className={classes.Button}>Ajouter ce produit</Button>
          </Box>
          <Footer />
        </Box>
      </div>
    </>
  );
}

export default EpicerieProductPresentation;
