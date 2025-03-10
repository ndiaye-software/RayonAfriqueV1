import React, { useState, useEffect, useCallback } from "react";
import Navbar from "../../../components/epicerie/navbarEpicerie";
import Footer from "../../../components/main/footer";
import { Stack, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import hostname from "../../../hostname";
import { useParams } from "react-router-dom";
import { Button } from "@material-ui/core";
import { Helmet } from "react-helmet";
import { ToastContainer, toast } from "react-toastify";
import useStyles from "../../../styles/pages/epicerie/product/epicerieProductPresentation";

function EpicerieProductPresentation() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { idProduct } = useParams();

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
        let response = await fetch(
          `${hostname}/api/v1/epicerie/product/read/${idProduct}`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );

        if (response.status === 401 || response.status === 403) {
          const newAccessToken = await handleRefreshToken();

          if (newAccessToken) {
            response = await fetch(
              `${hostname}/api/v1/epicerie/product/read/${idProduct}`,
              {
                headers: { Authorization: `Bearer ${newAccessToken}` },
              }
            );
          } else {
            throw new Error("Failed to refresh token");
          }
        }

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setData(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [idProduct, handleRefreshToken]);

  const classes = useStyles();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>No data available</div>;
  }

  return (
    <>
      <div>
        <Helmet>
          <meta
            name="description"
            content="Présentation du produit de l'épicerie sur RayonAfrique - Découvrez les détails et spécificités de ce produit africain proposé par cette épicerie."
          />
          <meta
            name="keywords"
            content="RayonAfrique, présentation produit, épicerie africaine, produits authentiques africains, détails produit, marché africain"
          />
          <meta name="author" content="RayonAfrique" />
          <meta
            property="og:image"
            content="https://res.cloudinary.com/dpodybbfe/image/upload/v1719949488/rayonafrique_wsbbxn.png"
          />
        </Helmet>

        <Box backgroundColor="#f9fafb">
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
                    {data.image && (
                      <img
                        src={data.image}
                        alt="Product"
                        height="300px"
                        width="350px"
                      />
                    )}
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

          <div>
            <ToastContainer theme="colored" />
          </div>
          <Box display="flex" justifyContent="center" marginBottom="30px">
            <Button href={`${idProduct}/add`} className={classes.Button}>
              Ajouter ce produit
            </Button>
          </Box>
          <Footer />
        </Box>
      </div>
    </>
  );
}

export default EpicerieProductPresentation;
