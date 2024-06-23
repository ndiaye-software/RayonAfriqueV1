import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    Button: {
      fontWeight: "bolder",
      color: "white",
      backgroundColor: "#922B21",
      width: "250px",
      minWidth: "250px",
      marginTop: "20px",
      padding: "20px",
      fontSize: "12px",
  
      "&:hover": {
        backgroundColor: "#A63F35",
      },
    },
  }));

export default useStyles;