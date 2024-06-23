import { makeStyles } from "@material-ui/core/styles";
import backgroundImage from "../../../../images/background.jpg";

const useStyles = makeStyles((theme) => ({
    section1: {
      width: "auto",
      height: "auto",
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      textAlign: "left",
      padding: "100px",
      flexWrap: "wrap",
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: "cover",
      filter: "blur(2px)",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      [theme.breakpoints.down("sm")]: { justifyContent: "center" },
      zIndex: 1,
    },
  
    section1_div_h1: {
      fontSize: "35px",
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
  
    ButtonBusiness: {
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
  
    ButtonRDV: {
      fontWeight: "bolder",
      color: "white",
      backgroundColor: "#922B21",
      width: "80%",
      minWidth: "300px",
      marginTop: "20px",
      padding: "20px",
      fontSize: "12px",
  
      "&:hover": {
        backgroundColor: "#A63F35",
      },
    },
  
    buttonContainer: {
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      gap: "10px",
    },
    banner: {
      position: "relative",
      width: "100%",
      height: "80vh",
      overflow: "hidden",
      backgroundColor: "white",
      display: "flex",
      justifyContent: "space-evenly",
      flexDirection: "row",
      [theme.breakpoints.down("sm")]: {
        height: "50vh",
      },
    },
    bannerImg: {
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center center",
      filter: "blur(3px)",
      width: "100%",
      height: "100%",
      position: "absolute",
      zIndex: 1,
    },
    bannerText: {
      position: "absolute",
      top: "50%",
      left: "27%",
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
      width: "80%",
      marginTop: "20px",
      padding: "20px",
      fontSize: "12px",
  
      "&:hover": {
        backgroundColor: "#088A85",
      },
    },
  
    buttonBusinessContainer: {
      display: "flex",
      justifyContent: "center",
      backgroundColor: "#f9fafb",
      paddingBottom: "60px",
    },
  
    section: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-evenly",
      padding: "30px",
      backgroundColor: "#f9fafb",
      flexWrap: "wrap",
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
  
    imageBox: {
      flex: "1 1 50%", // Adjust the width of the image box as needed
      padding: "20px",
      textAlign: "center",
    },
    textBox: {
      flex: "1 1 50%", // Adjust the width of the text box as needed
      padding: "20px",
    },
    image: {
      maxWidth: "300px",
      maxHeight: "200px",
      borderRadius: "10px",
    },
    imagePresentation: {
      maxWidth: "430px",
      maxHeight: "300px",
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
  }));

  export default useStyles;