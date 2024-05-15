import React, { useEffect, useState } from "react";
import { FormControl, InputLabel, MenuItem, Select, Grid } from "@mui/material";
import {
  Box,
  List,
  Typography,
  IconButton,
  Drawer,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import CloseIcon from "@mui/icons-material/Close";
import hostname from "../../hostname";

const orderedList = [{ label: "Nom (A-Z)" }, { label: "Nom (Z-A)" }];

const SidebarShop = ({ onOrderChange, onCountryChange, onMarqueChange, onCategoryChange }) => {
  const [order, setOrder] = useState("");

  const [country, setCountry] = useState([]);
  useEffect(() => {
    fetch(`${hostname}/api/v1/user/country/read`)
      .then((res) => res.json())
      .then((data) => setCountry(data.map((item) => item.countryName)))
      .catch((err) => console.log(err));
  }, []);

  const [marque, setMarque] = useState([]);
  useEffect(() => {
    fetch(`${hostname}/api/v1/user/label/read`)
      .then((res) => res.json())
      .then((data) => setMarque(data.map((item) => item.labelName)))
      .catch((err) => console.log(err));
  }, []);

  const [category, setCategory] = useState([]);
  useEffect(() => {
    fetch(`${hostname}/api/v1/user/category/read`)
      .then((res) => res.json())
      .then((data) => setCategory(data.map((item) => item.categoryName)))
      .catch((err) => console.log(err));
  }, []);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedMarque, setSelectedMarque] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleChangeCountry = (event) => {
    setSelectedCountry(event.target.value);
    onCountryChange(event.target.value);
  };
  
  const handleChangeMarque = (event) => {
    setSelectedMarque(event.target.value);
    onMarqueChange(event.target.value);
  };
  
  const handleChangeCategory = (event) => {
    setSelectedCategory(event.target.value);
    onCategoryChange(event.target.value);
  };

  const handleChangeOrder = (event) => {
    setOrder(event.target.value);
    onOrderChange(event.target.value);
  };

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleFilterToggle = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <IconButton
        onClick={handleFilterToggle}
        sx={{ display: { xs: "flex", sm: "none" } }}
      >
        Filtrer : {isFilterOpen ? <CloseIcon /> : <FilterListIcon />}
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
            <Typography variant="h6" style={{ fontSize: "15px" }}>
              Filtres
            </Typography>
            <Grid item xs={12}>
              <FormControl
                fullWidth
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: "black", // Change this to your desired color
                    },
                  "& .MuiInputLabel-outlined.Mui-focused": {
                    color: "black", // Change this to your desired color
                  },
                }}
              >
                <InputLabel style={{ fontSize: "12px" }}>Trier</InputLabel>
                <Select
                  value={order}
                  label="Trier"
                  onChange={handleChangeOrder}
                  required
                  style={{ fontSize: "12px" }}
                >
                  {orderedList?.map((order) => {
                    return (
                      <MenuItem
                        sx={{ fontSize: "12px" }}
                        key={order.label}
                        value={order.label}
                      >
                        {order.label ?? order.label}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl
                fullWidth
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: "black", // Change this to your desired color
                    },
                  "& .MuiInputLabel-outlined.Mui-focused": {
                    color: "black", // Change this to your desired color
                  },
                }}
              >
                <InputLabel style={{ fontSize: "12px" }}>Pays</InputLabel>
                <Select
                  value={selectedCountry}
                  label="Pays"
                  onChange={handleChangeCountry}
                  required
                  style={{ fontSize: "12px", color: "black" }}
                >
                  <MenuItem sx={{ fontSize: "12px" }} value="">Sélectionner tout</MenuItem>
                  {country.map((countryName) => {
                    return (
                      <MenuItem
                        sx={{ fontSize: "12px" }}
                        key={countryName}
                        value={countryName}
                      >
                        {countryName}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl
                fullWidth
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: "black", // Change this to your desired color
                    },
                  "& .MuiInputLabel-outlined.Mui-focused": {
                    color: "black", // Change this to your desired color
                  },
                }}
              >
                <InputLabel style={{ fontSize: "12px" }}>Catégorie</InputLabel>
                <Select
                  value={selectedCategory}
                  label="Catégorie"
                  onChange={handleChangeCategory}
                  required
                  style={{ fontSize: "12px" }}
                >
                  <MenuItem sx={{ fontSize: "12px" }} value="">Sélectionner tout</MenuItem>
                  {category?.map((categoryName) => {
                    return (
                      <MenuItem
                        sx={{ fontSize: "12px" }}
                        key={categoryName}
                        value={categoryName}
                      >
                        {categoryName}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
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
            <Typography variant="h6" style={{ fontSize: "20px" }}>
              Filtres
            </Typography>
            <Grid fontSize="13px" item xs={12}>
              <FormControl
                fullWidth
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: "black", // Change this to your desired color
                    },
                  "& .MuiInputLabel-outlined.Mui-focused": {
                    color: "black", // Change this to your desired color
                  },
                }}
              >
                <InputLabel style={{ fontSize: "12px" }}>Trier</InputLabel>
                <Select
                  value={order}
                  label="Trier"
                  onChange={handleChangeOrder}
                  required
                  style={{ fontSize: "12px" }}
                >
                  {orderedList?.map((order) => {
                    return (
                      <MenuItem
                        sx={{ fontSize: "12px" }}
                        key={order.label}
                        value={order.label}
                      >
                        {order.label ?? order.label}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl
                fullWidth
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: "black", // Change this to your desired color
                    },
                  "& .MuiInputLabel-outlined.Mui-focused": {
                    color: "black", // Change this to your desired color
                  },
                }}
              >
                <InputLabel style={{ fontSize: "12px" }}>Pays</InputLabel>
                <Select
                  value={selectedCountry}
                  label="Pays"
                  onChange={handleChangeCountry}
                  required
                  style={{ fontSize: "12px" }}
                >
                  <MenuItem sx={{ fontSize: "12px" }} value="">Sélectionner tout</MenuItem>
                  {country?.map((countryName) => {
                    return (
                      <MenuItem
                        sx={{ fontSize: "12px" }}
                        key={countryName}
                        value={countryName}
                      >
                        {countryName}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl
                fullWidth
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: "black", // Change this to your desired color
                    },
                  "& .MuiInputLabel-outlined.Mui-focused": {
                    color: "black", // Change this to your desired color
                  },
                }}
              >
                <InputLabel style={{ fontSize: "12px" }}>Catégorie</InputLabel>
                <Select
                  value={selectedCategory}
                  label="Catégorie"
                  onChange={handleChangeCategory}
                  required
                  style={{ fontSize: "12px" }}
                >
                  <MenuItem sx={{ fontSize: "12px" }} value="">Sélectionner tout</MenuItem>
                  {category?.map((categoryName) => {
                    return (
                      <MenuItem
                        sx={{ fontSize: "12px" }}
                        key={categoryName}
                        value={categoryName}
                      >
                        {categoryName}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl
                fullWidth
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: "black", // Change this to your desired color
                    },
                  "& .MuiInputLabel-outlined.Mui-focused": {
                    color: "black", // Change this to your desired color
                  },
                }}
              >
                <InputLabel style={{ fontSize: "12px" }}>Marque</InputLabel>
                <Select
                  value={selectedMarque}
                  label="Marque"
                  onChange={handleChangeMarque}
                  required
                  style={{ fontSize: "12px" }}
                >
                  <MenuItem sx={{ fontSize: "12px" }} value="">Sélectionner tout</MenuItem>
                  {marque?.map((nameCompany) => {
                    return (
                      <MenuItem
                        sx={{ fontSize: "12px" }}
                        key={nameCompany}
                        value={nameCompany}
                      >
                        {nameCompany}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
          </List>
        </Box>
      </Box>
    </Box>
  );
};

export default SidebarShop;
