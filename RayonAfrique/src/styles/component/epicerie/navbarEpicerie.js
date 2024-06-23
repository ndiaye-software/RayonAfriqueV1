import { makeStyles } from "@material-ui/core/styles";

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

  export default useStyles;