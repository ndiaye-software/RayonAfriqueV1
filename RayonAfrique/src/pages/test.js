import { Box, Grid, Stack } from "@mui/material";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

function PhoneField() {
  return (
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
            <Grid item xs={12}>
              <PhoneInput country={"fr"} disableDropdown name="phone" placeholder="33 6 12 34 56 78 00" onlyCountries={["fr"]} inputStyle={{height:"55px"}}/>{" "}
            </Grid>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
}

export default PhoneField;
