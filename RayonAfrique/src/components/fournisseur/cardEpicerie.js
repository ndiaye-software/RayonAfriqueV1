import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Link } from "react-router-dom";

export default function CardEpicerie({ image, name, address }) {
  return (
    <Card sx={{ width: 230, height: "fit-content" }}>
      <CardActionArea component={Link} to={`${name}`}>
        <CardMedia
          component="img"
          height="150"
          image={image}
          alt="green iguana"
        />
        <CardContent sx={{ paddingTop: "15px", paddingBottom: "15px" }}>
          <Typography gutterBottom variant="h6" fontSize="17px" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Adresse : {address}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
