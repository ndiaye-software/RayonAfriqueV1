import React, { useState } from "react";
import { Box, List, Typography, IconButton, Drawer } from "@mui/material";
import Grid from "@mui/material/Grid";
import FilterListIcon from "@mui/icons-material/FilterList";
import CloseIcon from "@mui/icons-material/Close";
import { Slider } from "@mui/material";

const SidebarDetail = () => {
  const [distance, setDistance] = React.useState([0, 100]);

  const handleDistanceChange = (event, newValue) => {
    setDistance(newValue);
  };

  const [price, setPrice] = React.useState([0, 100]);

  const handlePriceChange = (event, newValue) => {
    setPrice(newValue);
  };

  const rangeDistance = [
    { value: 0, label: "0" },
    { value: 100, label: "100" },
  ];

  const rangePrice = [
    { value: 0, label: "0" },
    { value: 100, label: "100" },
  ];

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const handleFilterToggle = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <Box
      sx={{
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <IconButton
        onClick={handleFilterToggle}
        sx={{ display: { xs: "flex", sm: "none" } }}
      >
        {" "}
        Filtrer :{isFilterOpen ? <CloseIcon /> : <FilterListIcon />}
      </IconButton>
      <Drawer
        anchor="left"
        open={isFilterOpen}
        onClose={handleFilterToggle}
        sx={{
          display: { xs: "flex", sm: "none" },
        }}
      >
        <Box p={2}>
          <List
            sx={{
              display: "flex",
              gap: "15px",
              flexDirection: "column",
              width: "250px",
              padding: "10px",
            }}
          >
            <Typography variant="h5" style={{ fontSize: "15px" }}>
              Filtres
            </Typography>
            <Grid item xs={12}>
              <Typography variant="h6" style={{ fontSize: "12px" }}>
                Distance en km
              </Typography>
              <Slider
                sx={{
                  color: "#922B21",
                  "&.Mui-checked": {
                    color: "#922B21",
                  },
                }}
                value={distance}
                onChange={handleDistanceChange}
                valueLabelDisplay="auto"
                min={0}
                max={100}
                marks={rangeDistance}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" style={{ fontSize: "12px" }}>
                Prix en €
              </Typography>
              <Slider
                sx={{
                  color: "#922B21",
                  "&.Mui-checked": {
                    color: "#922B21",
                  },
                }}
                value={price}
                onChange={handlePriceChange}
                valueLabelDisplay="auto"
                min={0}
                max={100}
                marks={rangePrice}
              />
            </Grid>
          </List>
        </Box>
      </Drawer>
      <Box
        sx={{
          flex: { sm: 1, xs: "none" },
          backgroundColor: "white",
          display: { xs: "none", sm: "flex" },
          p: 2,
        }}
      >
        <Box position="relative" sx={{ display: { xs: "none", sm: "flex" } }}>
          <List
            sx={{
              display: "flex",
              gap: "15px",
              flexDirection: "column",
              maxWidth: "250px",
              width: "250px",
              padding: "10px",
            }}
          >
            <Typography variant="h5" style={{ fontSize: "15px" }}>
              Filtres
            </Typography>
            <Grid item xs={12}>
              <Typography variant="h6" style={{ fontSize: "12px" }}>
                Distance en km
              </Typography>
              <Slider
                sx={{
                  color: "#922B21",
                  "&.Mui-checked": {
                    color: "#922B21",
                  },
                }}
                value={distance}
                onChange={handleDistanceChange}
                valueLabelDisplay="auto"
                min={0}
                max={100}
                marks={rangeDistance}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" style={{ fontSize: "12px" }}>
                Prix en €
              </Typography>
              <Slider
                sx={{
                  color: "#922B21",
                  "&.Mui-checked": {
                    color: "#922B21",
                  },
                }}
                value={price}
                onChange={handlePriceChange}
                valueLabelDisplay="auto"
                min={0}
                max={100}
                marks={rangePrice}
              />
            </Grid>
          </List>
        </Box>
      </Box>
    </Box>
  );
};

export default SidebarDetail;
