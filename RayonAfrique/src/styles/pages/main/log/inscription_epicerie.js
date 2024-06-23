import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    strengthPassword: {
      position: "absolute",
      width: "0%",
      height: "5px",
      bottom: "-8px",
      left: 0,
      background: "transparent",
      transition: "all 300ms ease-in-out",
      '&[data-score="null"]': {
        width: 0,
        background: "red",
      },
      '&[data-score="0"]': {
        width: "5%",
        background: "#f44336",
      },
      '&[data-score="1"]': {
        width: "25%",
        background: "#f44336",
      },
      '&[data-score="2"]': {
        width: "50%",
        background: "#ffeb3b",
      },
      '&[data-score="3"]': {
        width: "75%",
        background: "#4caf50",
      },
      '&[data-score="4"]': {
        width: "100%",
        background: "#4caf50",
      },
    },
  }));

  export default useStyles;