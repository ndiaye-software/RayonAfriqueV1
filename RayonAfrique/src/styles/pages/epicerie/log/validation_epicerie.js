import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    section1: {
      width: "auto",
      display: "flex",
      justifyContent: "space-evenly",
      alignItems: "center",
      textAlign: "left",
      padding: "100px",
      flexWrap: "wrap",
      backgroundColor: "white",
    },
  
    section1_div_h1: {
      fontSize: "20px",
      background: "#922B21",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      fontWeight: "bolder",
      marginBottom: "30px",
      marginTop: "30px",
      whiteSpace: "nowrap",
      overflow: "hidden",
      animation: "$typing 3s, $cursor .4s step-end infinite alternate",
    },
    "@keyframes typing": {
      "0%": {
        width: 0,
      },
      "100%": {
        width: "100%",
      },
    },
    "@keyframes cursor": {
      "0%": {
        borderBottomWidth: 2,
      },
      "100%": {
        borderBottomWidth: 0,
      },
    },
  
    section1_div_h3: {
      fontSize: "17px",
      background: "#922B21",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      whiteSpace: "nowrap",
      overflow: "hidden",
      animation: "$typing1 3s, $cursor1 .4s step-end infinite alternate",
    },
    "@keyframes typing1": {
      "0%": {
        width: 0,
      },
      "100%": {
        width: "100%",
      },
    },
    "@keyframes cursor1": {
      "0%": {
        borderBottomWidth: 2,
      },
      "100%": {
        borderBottomWidth: 0,
      },
    },
  
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