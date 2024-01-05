import React from "react";
import { Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Navbar from "../../../components/epicerie/navbarEpicerie";
import Footer from "../../../components/main/footer";
import { Save } from "@material-ui/icons";
import { TextField, Button, Grid } from "@material-ui/core";
import { FormControl, InputLabel, Select } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { MenuItem } from "@mui/material";
import InsertImage from "../../../images/insertimage.png";

const useStyles = makeStyles(() => ({
  Button: {
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
          <Stack direction="column" justifyContent="center">
            <Box flex={4} p={{ xs: 0, md: 2 }} sx={{ marginBottom: "60px" }}>
              <Box
                flexWrap="wrap"
                justifyContent="center"
                display="flex"
                flexDirection="column"
                alignContent="center"
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
                  </div>
                </Box>

                <Box
                  padding="20px"
                  maxWidth="600px"
                  flexDirection="column"
                  display="flex"
                  gap={2}
                >
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

              <Box
                justifyContent="space-evenly"
                display="flex"
                marginTop="30px"
              >
                <Button className={classes.Button} endIcon={<Save />}>
                  Ajouter
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
