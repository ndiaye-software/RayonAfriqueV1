import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    section: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      paddingTop: "50px",
      paddingLeft: "150px",
      paddingRight: "150px",
      paddingBottom: "50px",
      backgroundColor: "#f9fafb",
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
      maxWidth: "500px",
      maxHeight: "300px",
      borderRadius: "10px",
    },
    text: {
      marginTop: "15px",
    },
  }));
  
  export default useStyles;