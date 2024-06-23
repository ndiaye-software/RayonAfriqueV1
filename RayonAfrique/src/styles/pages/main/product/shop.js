import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    Box1: {
      display: "flex",
      flexDirection: "row",
      marginBottom: "30px",
    },
  
    inputWrapperContainer: {
      width: "350px",
      [theme.breakpoints.down("sm")]: {
        width: "200px",
      },
    },
  
    ButtonSearch: {
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
  
    inputWrapper: {
      "& input": {
        backgroundColor: "white",
        border: "solid",
        fontSize: "1rem",
        padding: "15px",
        width: "100%",
        borderTopLeftRadius: "20px 20px",
        borderBottomLeftRadius: "20px 20px",
        color: "black",
        boxShadow: "0 0.4rem #dfd9d9",
        "&:focus": {
          outlineColor: "black",
        },
      },
    },
  }));

  export default useStyles;