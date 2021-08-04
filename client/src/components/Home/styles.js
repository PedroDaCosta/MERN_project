import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: "30px 0",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  heading: {
    color: "rgba(0,183,255,1)",
  },
  image: {
    marginLeft: "15px",
  },
  /*same as a media query for small or extra small devices
  read material ui docs for more information on breakpoints
  https://material-ui.com/customization/breakpoints*/
  [theme.breakpoints.down("sm")]: {
    mainContainer: {
      flexDirection: "column-reverse"
    },
  },
}));
