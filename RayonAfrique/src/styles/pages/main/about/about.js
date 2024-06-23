import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    section: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-evenly",
      padding: "50px",
      backgroundColor: "#f9fafb",
    },
    imageBox: {
      flex: "1 1 50%",
      padding: "20px",
      textAlign: "center",
    },
    textBox: {
      flex: "1 1 50%",
      padding: "20px",
    },
    image: {
      maxWidth: "500px",
      maxHeight: "300px",
      borderRadius: "10px",
      [theme.breakpoints.down("xs")]: {
        maxWidth: "300px",
      },
    },
  }));

export default useStyles;