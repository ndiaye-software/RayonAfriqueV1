import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import { Button, Tooltip } from "@material-ui/core";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import { makeStyles } from "@material-ui/core/styles";
import { LogoutOutlined } from "@mui/icons-material";
import logo from "../../images/logopro.png";
import { useParams } from "react-router-dom";

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    fontWeight: "bold",
    fontSize: "20px",
    fontFamily: "Poppins",
    textDecoration: "none",
    color: "black",
  },
  button: {
    flexGrow: 1,
    fontWeight: 700,
    fontSize: "13px",
    textDecoration: "none",
    color: "black",
    "&:hover": { color: "#922B21", backgroundColor: "white" },
  },
}));

export default function PrimarySearchAppBar(props) {
  const { idUser } = useParams();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "left" }}>
      <Typography
        variant="h6"
        sx={{ padding: 2, color: "#922B21", fontWeight: "bold" }}
      >
        <a href={`/business/epicerie/${idUser}`}>
          <img height="50px" src={`${logo}`} alt="logo" />
        </a>
      </Typography>
      <Divider />
      <List>
        <a href={`/business/epicerie/${idUser}/market`}>
          <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: "left" }}>
              <ListItemText sx={{ color: "black" }} primary="Market" />
            </ListItemButton>
          </ListItem>
        </a>

        <a href={`/business/epicerie/${idUser}/fournisseur`}>
          <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: "left" }}>
              <ListItemText sx={{ color: "black" }} primary="Fournisseur" />
            </ListItemButton>
          </ListItem>
        </a>

        <a href={`/business/epicerie/${idUser}/produit`}>
          <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: "left" }}>
              <ListItemText sx={{ color: "black" }} primary="Produit" />
            </ListItemButton>
          </ListItem>
        </a>

        <a href={`/business/epiceries/${idUser}/profil`}>
          <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: "left" }}>
              <ListItemText sx={{ color: "black" }} primary="Profil" />
            </ListItemButton>
          </ListItem>
        </a>

        <a href={`/business/epicerie/${idUser}/contact`}>
          <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: "left" }}>
              <ListItemText sx={{ color: "black" }} primary="Contact" />
            </ListItemButton>
          </ListItem>
        </a>

        <a href={`/business/epicerie/${idUser}/logout`}>
          <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: "left" }}>
              <ListItemText sx={{ color: "black" }} primary="Déconnexion" />
            </ListItemButton>
          </ListItem>
        </a>
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const classes = useStyles();

  return (
    <>
      <AppBar
        position="sticky"
        sx={{ boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}
      >
        <Toolbar
          style={{
            background: "white",
            height: "90px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          <IconButton
            size="large"
            edge="start"
            onClick={handleDrawerToggle}
            aria-label="open drawer"
            sx={{ mr: 2, display: { xs: "flex", md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", md: "flex" } }}
          >
            <a href={`/business/epicerie/${idUser}`}>
              <img height="50px" src={`${logo}`} alt="logo" />
            </a>
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Button
              className={classes.button}
              href={`/business/epicerie/${idUser}/market`}
              sx={{ color: "black" }}
            >
              Market
            </Button>
            <Button
              className={classes.button}
              href={`/business/epicerie/${idUser}/fournisseur`}
              sx={{ color: "black" }}
            >
              Fournisseur
            </Button>
            <Button
              className={classes.button}
              href={`/business/epicerie/${idUser}/produit`}
              sx={{ color: "black" }}
            >
              Produit
            </Button>
            <Button
              className={classes.button}
              href={`/business/epicerie/${idUser}/profil`}
              sx={{ color: "black" }}
            >
              Profil
            </Button>
            <Button
              className={classes.button}
              href={`/business/epicerie/${idUser}/contact`}
              sx={{ color: "black" }}
            >
              Contact
            </Button>
            <Tooltip title="Déconnexion">
              <IconButton href={`/business/fournisseur/${idUser}/logout`}>
                <LogoutOutlined sx={{ "&:hover": { color: "#922B21" } }} />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  );
}
