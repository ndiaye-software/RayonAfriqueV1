import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  Box,
  CardActionArea,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Link } from "react-router-dom";
import { LocationOn } from "@mui/icons-material";

export default function ProductShop({
  nomProduit,
  image,
  nomEpicerie,
  adresse,
  prix,
  distance,
  longitude,
  latitude
}) {
  return (
    <Card sx={{ width: 230, height: "fit-content" }}>
      <CardActionArea component="a" href={`https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`} target="_blank" rel="noopener noreferrer">
        <CardMedia
          component="img"
          height="150"
          image={image}
          alt="green iguana"
        />
        <CardContent sx={{ paddingTop: "5px", paddingBottom: "5px" }}>
          <Typography gutterBottom variant="h6" fontSize="17px" component="div">
            {nomEpicerie}
          </Typography>
          <Typography gutterBottom variant="h6" fontSize="17px" component="div">
            {nomProduit}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Adresse : {adresse}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Distance : {distance} km
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingBottom:"15px"

            }}
          >
            <Typography variant="body2" color="text.secondary">
              {prix} €
            </Typography>
              <Tooltip title="Go">
                <IconButton
                  sx={{
                    color: "#922B21",
                    paddingTop: "0px",
                    paddingBottom: "0px",
                    "&:hover": { backgroundColor: "white" },
                  }}
                >
                  <LocationOn />
                </IconButton>
              </Tooltip>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
