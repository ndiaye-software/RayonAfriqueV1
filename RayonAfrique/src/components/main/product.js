import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, Button, CardActionArea, CardActions } from "@mui/material";
import { Link } from "react-router-dom";
import StoreIcon from "@mui/icons-material/Store";
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

export default function Product({ image, name, description}) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <Card sx={{ width: 230, height: "fit-content" }}>
      <CardActionArea component={Link} to={`/produit/${name}`}>
        <CardMedia
          component="img"
          height="150"
          image={image}
          alt="green iguana"
        />
        <CardContent sx={{ paddingTop: "5px", paddingBottom: "5px" }}>
          <Typography gutterBottom variant="h6" fontSize="17px" component="div">
            {name}
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Typography variant="body2" color="text.secondary">
              Disponible en Epicerie
            </Typography>
            <Button
              sx={{
                color: "#922B21",
                paddingTop: "0px",
                paddingBottom: "0px",
                "&:hover": { backgroundColor: "white" },
              }}
            >
              <StoreIcon />
            </Button>
          </Box>
        </CardContent>
      </CardActionArea>
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
