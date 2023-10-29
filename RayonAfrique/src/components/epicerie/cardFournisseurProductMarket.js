import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, Button, CardActions } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import { ShoppingCartOutlined } from "@mui/icons-material";

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

export default function CardFournisseurProductMarket({
  id,
  name,
  image,
  nomFournisseur,
  description, 
  price
}) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <Card sx={{ width: 230, height: "fit-content" }}>
      <Box component={Link} to={`${id}`}>
        <CardMedia
          height="150"
          image={image}
          alt="green iguana"
          component="img"
        />
      </Box>
      <CardContent sx={{ paddingTop: "5px", paddingBottom: "5px" }}>
        <Typography gutterBottom variant="h6" fontSize="17px" component="div">
          {nomFournisseur}
        </Typography>
        <Typography gutterBottom variant="body" component="div">
          {name}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          justifyContent: "space-between",
          paddingBottom: "0px",
          paddingTop: "0px",
          paddingLeft: "16px",
          paddingRight: "16px",
        }}
      >
        <Typography gutterBottom variant="body" component="div">
          {price} €
        </Typography>
        <Button
          component={Link}
          to={`${id}`}
          size="small"
          sx={{
            backgroundColor: "#922B21",
            "&:hover": { backgroundColor: "#A63F35" },
          }}
        >
          <ShoppingCartOutlined sx={{ color: "white" }} />
        </Button>
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
