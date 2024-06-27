import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import { Button } from "@material-ui/core";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import logo from "../../images/rayonafrique.svg";
import {  PersonOutline } from "@material-ui/icons";
import Tooltip from "@mui/material/Tooltip";
import useStyles from "../../styles/component/main/navbar";

const drawerWidth = 300;

export default function PrimarySearchAppBar(props) {
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
        <a href="/">
          <img height="90px" src={`${logo}`} alt="logo" />
        </a>
      </Typography>
      <Divider />
      <List>
        <a href="/produit">
          <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: "left" }}>
              <ListItemText sx={{ color: "black" }} primary="Produit" />
            </ListItemButton>
          </ListItem>
        </a>

        <a href="/about-us">
          <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: "left" }}>
              <ListItemText sx={{ color: "black" }} primary="A propos" />
            </ListItemButton>
          </ListItem>
        </a>

        <a href="/contact">
          <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: "left" }}>
              <ListItemText sx={{ color: "black" }} primary="Contact" />
            </ListItemButton>
          </ListItem>
        </a>

        <a href="/business">
          <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: "left" }}>
              <ListItemText sx={{ color: "black" }} primary="Professionnel" />
            </ListItemButton>
          </ListItem>
        </a>

        <a href="/connexion">
          <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: "left", color: "black" }}>
              <ListItemText sx={{ color: "black" }} primary="Connexion" />
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
            <a href="/">
              <img height="90px" src={`${logo}`} alt="logo" />
            </a>
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Button
              className={classes.button}
              href="/produit"
              sx={{ color: "black" }}
            >
              Produit
            </Button>
            <Button
              className={classes.button}
              href="/about-us"
              sx={{ color: "black" }}
            >
              A propos
            </Button>
            <Button
              className={classes.button}
              href="/contact"
              sx={{ color: "black" }}
            >
              Contact
            </Button>
            <Button
              className={classes.buttonpro}
              href="/business"
              sx={{ color: "black" }}
            >
              Professionnel
            </Button>
            <IconButton
              className={classes.button}
              href="/connexion"
              sx={{ color: "black" }}
            >
              <Tooltip title="Connexion" arrow>
                <PersonOutline />
              </Tooltip>
            </IconButton>
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
