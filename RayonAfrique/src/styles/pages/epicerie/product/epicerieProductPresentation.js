
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    Button: {
      fontWeight: "bolder",
      color: "white",
      backgroundColor: "#922B21",
      minWidth: "100px",
      alignContent: "center",
      textAlign: "center",
      padding: "15px",
      fontSize: "12px",
      border: "solid",
      borderColor: "#922B21",
      "&:hover": {
        backgroundColor: "#A63F35",
        boxShadow: "0 0.4rem #dfd9d9",
      },
    },
  }));

  export default useStyles;