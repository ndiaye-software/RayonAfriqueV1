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
import { LogoutOutlined } from "@mui/icons-material";
import logo from "../../images/rayonafrique.svg";
import { Link, useNavigate } from 'react-router-dom';
import hostname from "../../hostname";
import useStyles from "../../styles/component/epicerie/navbarEpicerie";
const drawerWidth = 300;

const PrimarySearchAppBar = (props) => {
  const navigate = useNavigate();
  const Logout = async (event) => {
    event.preventDefault();
    const accessToken = localStorage.getItem("accessToken");
    try {
      const response = await fetch(`${hostname}/api/v1/user/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: "include",
      });

      if (response.ok) {
        try {
          const data = await response.json();
          console.log("Déconnexion réussie:", data.message);
        } catch (e) {
          console.warn("La réponse ne contient pas de JSON valide.");
        }
        localStorage.removeItem("accessToken");
        navigate("/");
      } else {
        console.error("Erreur lors de la déconnexion:", response.statusText);
      }
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  };

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
        <Link to="/epicerie/">
          <img height="90px" src={logo} alt="logo" />
        </Link>
      </Typography>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/epicerie/produit" sx={{ textAlign: "left" }}>
            <ListItemText sx={{ color: "black" }} primary="Produit" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component={Link} to="/epiceries/profil" sx={{ textAlign: "left" }}>
            <ListItemText sx={{ color: "black" }} primary="Profil" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component={Link} to="/epicerie/contact" sx={{ textAlign: "left" }}>
            <ListItemText sx={{ color: "black" }} primary="Contact" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component={Link} to="/epicerie/logout" sx={{ textAlign: "left" }}>
            <ListItemText sx={{ color: "black" }} primary="Déconnexion" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

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
            <Link to="/epicerie">
              <img height="90px" src={logo} alt="logo" />
            </Link>
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Button
              className={classes.button}
              component={Link}
              to="/epicerie/produit"
              sx={{ color: "black" }}
            >
              Produit
            </Button>
            <Button
              className={classes.button}
              component={Link}
              to="/epicerie/profil"
              sx={{ color: "black" }}
            >
              Profil
            </Button>
            <Button
              className={classes.button}
              component={Link}
              to="/epicerie/contact"
              sx={{ color: "black" }}
            >
              Contact
            </Button>
            <Tooltip title="Déconnexion">
              <IconButton onClick={Logout}>
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

export default PrimarySearchAppBar;
