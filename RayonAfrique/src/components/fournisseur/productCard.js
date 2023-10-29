import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

export default function ProductCard({
  id,
  image,
  nom,
  marque,
  prix,
  disponibilité,
}) {
  return (
    <Card
      sx={{ display: "flex", maxWidth: "450px", height: "100px" }}
      component={Link}
      to={`/business/epicerie/product/${id}`}
    >
      <CardMedia
        component="img"
        sx={{ width: 100 }}
        image={image}
        alt="Live from space album cover"
      />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h7">
            {nom} - {marque}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            Prix : {prix}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            Disponibilité : {disponibilité}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
}
