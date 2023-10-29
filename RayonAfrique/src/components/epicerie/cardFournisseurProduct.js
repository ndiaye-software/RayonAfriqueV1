import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActions } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function CardFournisseurProduct({
  nom,
  image,
  nomFournisseur,
  prix,
  description
}) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <Card sx={{ width: 230, height: "fit-content" }}>
      <CardMedia
        component="img"
        height="150"
        image={image}
        alt="green iguana"
      />
      <CardContent sx={{ paddingTop: "5px", paddingBottom: "5px" }}>
        <Typography gutterBottom variant="h6" fontSize="17px" component="div">
          {nomFournisseur}
        </Typography>
        <Typography gutterBottom variant="h6" fontSize="17px" component="div">
          {nom}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          justifyContent: "flex-start",
          paddingTop: "0px",
          paddingBottom: "0px",
        }}
      >
        {prix} €
      </CardActions>
      <CardActions
        sx={{ fontSize: "13px", paddingTop: "0px", paddingBottom: "0px" }}
      >
        Description
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent
          sx={{ width: "230px", paddingTop: "0px", paddingBottom: "0px" }}
        >
          <Typography variant="body2" sx={{ fontSize: "13px" }}>
            {description}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
