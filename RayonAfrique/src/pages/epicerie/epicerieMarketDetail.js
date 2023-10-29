import React, { useEffect, useState } from "react";
import Navbar from "../../components/epicerie/navbarEpicerie";
import Footer from "../../components/main/footer";
import { Stack, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { Button } from "@material-ui/core";
import { Grid } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { Phone, ZoomIn } from "@material-ui/icons";
import { useParams } from "react-router-dom";
import hostname from "../../hostname";

const useStyles = makeStyles(() => ({
  ButtonContact: {
    fontWeight: "bolder",
    color: "white",
    backgroundColor: "#922B21",
    width: "80%",
    minWidth: "300px",
    marginTop: "20px",
    padding: "20px",
    fontSize: "12px",

    "&:hover": {
      backgroundColor: "#A63F35",
    },
  },

  ButtonView: {
    fontWeight: "bolder",
    color: "#922B21",
    backgroundColor: "white",
    width: "80%",
    minWidth: "300px",
    marginTop: "20px",
    padding: "20px",
    fontSize: "12px",

    "&:hover": {
      backgroundColor: "#A63F35",
      color: "white",
    },
  },

  buttonContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    flexDirection: "column",
    gap: "10px",
  },
}));

function EpicerieMarketDetail() {
  const { idproductUser } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(
      `${hostname}/api/v1/market/readMarketDetailEpicerie/${idproductUser}`
    )
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  }, [idproductUser]);

  const classes = useStyles();

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
                    <Typography variant="h6">{data.nomFournisseur}</Typography>
                    <Typography variant="h6" key={data.name}>
                      {data.name} - {data.prix} €
                    </Typography>
                  </Box>
                  <Box>
                    <span>{data.description}</span>
                    <Grid className={classes.buttonContainer}>
                      <Button
                        className={classes.ButtonContact}
                        href={`mailto:${data.mailFournisseur}`}
                        variant="contained"
                        startIcon={<Phone />}
                      >
                        Contactez-Nous !
                      </Button>
                      <Button
                        className={classes.ButtonView}
                        href={`/business/epicerie/fournisseur/${data.nomFournisseur}`}
                        variant="contained"
                        startIcon={<ZoomIn />}
                      >
                        Découvrez plus de produits !
                      </Button>
                    </Grid>
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

export default EpicerieMarketDetail;
