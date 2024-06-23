import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
    container: {
      backgroundColor: "#922B21",
      padding: "50px",
    },
  
    testimonialContainer: {
      backgroundColor: "#922B21",
      color: "#FFF",
      borderRadius: "15px",
      margin: "auto",
      padding: "35px",
      maxWidth: "768px",
      text: "relative",
      [theme.breakpoints.down("sm")]: {
        padding: "20px 30px",
      },
    },
  
    testimonial: {
      lineHeight: "28px",
      textAlign: "justify",
    },
    user: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-evenly",
      gap: "50px",
      [theme.breakpoints.down("sm")]: {
        flexWrap: "wrap",
        justifyContent: "center",
        textAlign: "center",
        display: "flex",
      },
    },
    userImage: {
      height: "235px",
      width: "275px",
      objectFit: "cover",
      borderRadius: "25px",
    },
    userDetails: {
      marginLeft: "100px",
      [theme.breakpoints.down("sm")]: {
        flexWrap: "wrap",
        justifyContent: "center",
        textAlign: "center",
        marginLeft: "0px",
      },
    },
    username: {
      margin: "0",
    },
    role: {
      fontWeight: "normal",
      margin: "8px 0",
    },
    progressBar: {
      backgroundColor: "#FFF",
      height: "6px",
      borderRadius: "50%",
      width: "100%",
      margin: "15px",
      animation: "$grow 10s linear infinite",
      transformOrigin: "left",
    },
    "@keyframes grow": {
      "0%": {
        transform: "scaleX(0)",
      },
    },
  
    header: {
      fontSize: "3vw",
      fontWeight: "bolder",
      color: "white",
      textAlign: "center",
      paddingTop: "20px",
    },
  }));

  export default useStyles;