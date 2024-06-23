import { makeStyles } from "@material-ui/core/styles";
import backgroundImage from "../../../../images/background.jpg";

const useStyles = makeStyles((theme) => ({
    header: {
      fontSize: "3vw",
      fontWeight: "bolder",
      color: "black",
      textAlign: "center",
      backgroundColor: "#f9fafb",
      paddingTop: "20px",
      [theme.breakpoints.down("sm")]: {
        fontSize: "20px",
      },
    },
  
    header1: {
      fontSize: "3vw",
      fontWeight: "bolder",
      color: "black",
      textAlign: "center",
      backgroundColor: "#f9fafb",
      paddingTop: "20px",
      [theme.breakpoints.down("sm")]: {
        fontSize: "20px",
      },
    },
  
    header2: {
      fontSize: "2vw",
      backgroundColor: "#f9fafb",
      fontWeight: "bolder",
      color: "black",
      textAlign: "center",
      paddingTop: "20px",
      [theme.breakpoints.down("sm")]: {
        fontSize: "20px",
      },
    },
  
    section1_div_h1: {
      fontSize: "3.5vw",
      background: "white",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      fontWeight: "bolder",
      marginBottom: "20px",
      zIndex: 2,
      [theme.breakpoints.down("sm")]: {
        fontSize: "20px",
      },
    },
  
    section1_div_h3: {
      fontSize: "2vw",
      background: "white",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      marginBottom: "20px",
      width: "100%",
      [theme.breakpoints.down("sm")]: {
        fontSize: "15px",
      },
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
  
    banner: {
      position: "relative",
      width: "100%",
      height: "80vh",
      overflow: "hidden",
      [theme.breakpoints.down("sm")]: {
        height: "50vh",
      },
    },
    bannerImg: {
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center center",
      filter: "blur(2px)",
      width: "100%",
      height: "100%",
      position: "absolute",
      zIndex: 1,
    },
    bannerText: {
      position: "absolute",
      top: "50%",
      left: "20%",
      transform: "translate(-50%, -50%)",
      zIndex: 2,
      textAlign: "left",
      color: "white",
      [theme.breakpoints.down("sm")]: {
        top: "50%",
        left: "50%",
        justifyContent: "center",
      },
    },
  
    Button: {
      fontWeight: "bolder",
      color: "white",
      backgroundColor: "#922B21",
      width: "300px",
      marginTop: "20px",
      padding: "20px",
      fontSize: "12px",
  
      "&:hover": {
        backgroundColor: "#A63F35",
      },
    },
  
    InscriptionButton: {
      fontWeight: "bolder",
      color: "white",
      backgroundColor: "#922B21",
      width: "200px",
      marginTop: "20px",
      padding: "20px",
      fontSize: "12px",
  
      "&:hover": {
        backgroundColor: "#A63F35",
      },
    },
  
    ButtonBusiness: {
      fontWeight: "bolder",
      color: "#922B21",
      backgroundColor: "white",
      width: "80%",
      minWidth: "300px",
      maxWidth: "450px",
      marginTop: "20px",
      padding: "20px",
      fontSize: "12px",
  
      "&:hover": {
        backgroundColor: "#A63F35",
        color: "white",
      },
    },
  
    buttonContainer: {
      display: "flex",
      justifyContent: "flex-start",
    },
  
    section: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-evenly",
      backgroundColor: "#f9fafb",
      padding: "65px",
      gap: "15px",
    },
  
    section2: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-evenly",
      backgroundColor: "#f9fafb",
      padding: "30px",
      gap: "35px",
    },
  
    section3: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-evenly",
      backgroundColor: "#f9fafb",
      padding: "65px",
      gap: "65px",
    },
  }));

  export default useStyles;