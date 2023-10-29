import React, { useEffect, useState } from "react";
import Navbar from "../../components/fournisseur/navbarFournisseur";
import Footer from "../../components/main/footer";
import { Stack, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import { Phone } from "@material-ui/icons";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
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

  buttonContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    flexDirection: "column",
    gap: "10px",
  },
}));

function FournisseurEpicerieDetail() {
  const { nameCompany } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(
      `${hostname}/api/v1/fournisseur/readEpicerieDetail/${nameCompany}`
    )
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  }, [nameCompany]);

  const classes = useStyles();

  return (
    <>
      <div>
        <Box>
          <Navbar />
          {/* Produit Section */}
          <Stack direction="row" justifyContent="space-between">
            <Box
              flex={4}
              p={{ xs: 0, md: 2 }}
              sx={{ backgroundColor: "white" }}
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
                    <Typography variant="h5">
                      {data.name}
                      {data.length}
                    </Typography>
                  </Box>
                  <Box>
                    <span>{data.description}</span>
                  </Box>
                  <Grid className={classes.buttonContainer}>
                    <Button
                      className={classes.ButtonContact}
                      href={`mailto:${data.mail}`}
                      variant="contained"
                      startIcon={<Phone />}
                    >
                      Contactez-Nous !
                    </Button>
                  </Grid>
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

export default FournisseurEpicerieDetail;
