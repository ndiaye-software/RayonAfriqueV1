import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { Facebook, Audiotrack, LinkedIn} from "@mui/icons-material";
import { Box } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        color: "white",
        background: "linear-gradient(to bottom, #922B21, black )",
        padding: "100px",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="white" gutterBottom>
              Qui sommes nous ?
            </Typography>
            <Typography variant="body2" color="white">
              Nous sommes une entreprise visant à rendre plus accessible les
              produits africains.
            </Typography>
            <Typography marginTop="3px" variant="body2" color="white">
              <Link color="inherit" href="/terms-and-conditions">
                Conditions générales d'utilisations
              </Link>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="white" gutterBottom>
              Contactez nous !
            </Typography>
            <Typography variant="body2" color="white">
              Paris, France
            </Typography>
            <Typography variant="body2" color="white">
              rayon.afrique.shop@gmail.com
            </Typography>
            <Typography variant="body2" color="white">
              Phone: +33 06 21 56 53 14
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="white" gutterBottom>
              Suivez nous !
            </Typography>
            <Link href="https://www.facebook.com/profile.php?id=61559921465353" color="inherit">
              <Facebook />
            </Link>
            <Link
              href="https://www.tiktok.com/@rayonafrique?lang=fr"
              color="inherit"
              sx={{ pl: 1, pr: 1 }}
            >
              <Audiotrack />
            </Link>
            <Link href="https://www.linkedin.com/company/rayonafrique" color="inherit">
              <LinkedIn />
            </Link>
          </Grid>
        </Grid>
        <Box mt={5}>
          <Typography variant="body2" color="white" align="center">
            {"Copyright © "}
            <Link color="inherit" href="/">
              RayonAfrique
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
