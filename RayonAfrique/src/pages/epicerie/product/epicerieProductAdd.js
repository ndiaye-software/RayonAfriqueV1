import React from "react";
import { Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Navbar from "../../components/epicerie/navbarEpicerie";
import Footer from "../../components/main/footer";
import { InsertPhoto, Save } from "@material-ui/icons";
import { TextField, Button, Grid } from "@material-ui/core";
import { FormControl, InputLabel, Select } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { MenuItem } from "@mui/material";
import InsertImage from "../../images/insertimage.png";

const useStyles = makeStyles(() => ({
  ButtonInsert: {
    fontWeight: "bolder",
    color: "white",
    backgroundColor: "#922B21",
    width: "250px",
    minWidth: "250px",
    marginTop: "20px",
    padding: "20px",
    fontSize: "12px",

    "&:hover": {
      backgroundColor: "#A63F35",
    },
  },
}));

const options = [{ label: "oui" }, { label: "non" }];

function EpicerieProductAdd() {
  const [disponibilité, setDispo] = React.useState("");

  const handleChangeDispo = (event) => {
    setDispo(event.target.value);
  };

  const classes = useStyles();

  return (
    <>
      <div>
        <Navbar />
        <Box sx={{ backgroundColor: "#f9fafb" }}>
          <Stack direction="row" justifyContent="space-between">
            <Box flex={4} p={{ xs: 0, md: 2 }} sx={{ marginBottom: "60px" }}>
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
                    <Box>
                      <img
                        src={InsertImage}
                        alt="insérée"
                        height="300px"
                        width="350px"
                      />
                    </Box>
                    <Box justifyContent="center" display="flex" width="350px">
                      {" "}
                      <input
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        id="contained-button-file"
                      />
                      <label htmlFor="contained-button-file">
                        <Button
                          fullWidth
                          className={classes.ButtonInsert}
                          component="span"
                          endIcon={<InsertPhoto />}
                        >
                          Insérer une photo
                        </Button>
                      </label>
                    </Box>
                  </div>
                </Box>

                <Box
                  padding="20px"
                  maxWidth="600px"
                  flexDirection="column"
                  display="flex"
                  gap={2}
                >
                  <Grid item xs={12} fullWidth>
                    <TextField
                      label="Nom du produit"
                      variant="outlined"
                      fullWidth
                      name="name"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Marque du produit"
                      variant="outlined"
                      fullWidth
                      name="label"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Prix"
                      variant="outlined"
                      fullWidth
                      name="price"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel>Disponibilité</InputLabel>
                      <Select
                        value={disponibilité}
                        label="Disponibilité"
                        onChange={handleChangeDispo}
                        required
                      >
                        {options?.map((option) => {
                          return (
                            <MenuItem key={option.label} value={option.label}>
                              {option.label ?? option.label}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </Grid>
                </Box>
              </Box>

              <Box justifyContent="center" display="flex">
                <Box
                  sx={{
                    textAlign: "center",
                    width: { xs: "250px", sm: "500px" },
                  }}
                >
                  <TextField
                    label="Description"
                    variant="outlined"
                    fullWidth
                    name="Description"
                    multiline
                    minRows={5}
                  />
                </Box>
              </Box>

              <Box justifyContent="center" display="flex" marginTop="30px">
                <Button className={classes.ButtonRDV} endIcon={<Save />}>
                  Enregistrer
                </Button>
              </Box>
            </Box>
          </Stack>
        </Box>
        <Footer />
      </div>
    </>
  );
}

export default EpicerieProductAdd;
