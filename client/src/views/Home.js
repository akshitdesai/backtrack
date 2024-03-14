import React from "react";
import { useState, useEffect, useContext } from "react";
import {
  Button,
  Chip,
  Grid,
  IconButton,
  makeStyles,
  Paper,
  TextField,
  Typography,
  Modal,
  Slider,
  FormControlLabel,
  MenuItem,
  Checkbox,
  InputAdornment,
} from "@material-ui/core";
import { PopupContext } from "../App";
import NavBar from "./NavBar";
import globalStyles from "../helper/GlobalStyles";

const useStyles = makeStyles(() => ({
  title: {
    color: "#191825",
    textAlign: "center",
    fontFamily: "Inter",
    fontSize: "48px",
    fontStyle: "normal",
    fontWeight: 700,
    lineHeight: "120%",
  },
  mainGrid: {
    marginTop: "8%",
  },
  subTitle: {
    color: "rgba(25, 24, 37, 0.50)",
    textAlign: "center",
    fontFamily: "Inter",
    fontSize: "20px",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "150%",
  },
  buttonStyle: {
    borderRadius: "4px",
    border: "1px solid #352DFF",
    background: "#352DFF",
    "&:hover": {
      background: "#1e1c3a", // Change this to your desired hover background color
    },
    padding: "12px 24px",
  },
  buttonTitle: {
    color: "#FFF",
    fontFamily: "Inter",
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "150%",
  },
  cardText: {
    color: "rgba(0, 0, 0, 0.40)",
    fontFamily: "Inter",
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "150%", // You can also specify line height in pixels, e.g., '24px'
    textDecorationLine: "underline",
    marginTop: "5%",
  },
  endTextGrid: {
    width: "1058px",
    height: "220px",
    flexShrink: 0,
  },
  endText: {
    color: "rgba(0, 0, 0, 0.10)",
    fontFamily: "Inter",
    fontSize: "200px",
    fontStyle: "normal",
    fontWeight: 900,
    lineHeight: "150%",
  },
  shadeGrid: {
    width: "451px",
    height: "451px",
    flexShrink: 0,
  },
}));
function HomePage(props) {
  const setPopup = useContext(PopupContext);
  const styles = useStyles();
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    // axios
    //   .get(address, {
    //     headers: {
    //       Authorization: `Bearer ${localStorage.getItem("token")}`,
    //     },
    //   })
    //   .then((response) => {
    //     console.log(response.data);
    //     setJobs(
    //       response.data.filter((obj) => {
    //         const today = new Date();
    //         const deadline = new Date(obj.deadline);
    //         return deadline > today;
    //       })
    //     );
    //   })
    //   .catch((err) => {
    //     console.log(err.response.data);
    //     setPopup({
    //       open: true,
    //       severity: "error",
    //       message: "Error",
    //     });
    //   });
  };

  return (
    <>
      <Grid>
        <NavBar />
      </Grid>

      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        className={styles.mainGrid}
      >
        <Grid item>
          <Typography className={styles.title}>
            Upgrade Your Posture, Elevate Your Performance
          </Typography>
        </Grid>
        <Grid item>
          <Typography className={styles.subTitle}>
            Explore how changing your posture can change your life.
          </Typography>
        </Grid>
        <Grid item>
          <Typography className={styles.subTitle}>
            Take the first step towards a more productive you.
          </Typography>
        </Grid>
        <Grid style={{ marginTop: "3%" }}>
          <Button className={styles.buttonStyle}>
            <Typography className={styles.buttonTitle}>
              Start Your Free Analysis
            </Typography>
          </Button>
        </Grid>
        <Grid item>
          <Typography className={styles.cardText}>
            No credit card required
          </Typography>
        </Grid>
        {/* <Grid container className={styles.shadeGrid}>
          <Grid
            style={{
              borderRadius: "451px",
              background: "rgba(53, 45, 255, 0.80)",
              filter: "blur(200px)",
            }}
            item
          >
            <Grid item className={styles.endTextGrid}>
              <Typography className={styles.endText}>BackTrack</Typography>
            </Grid>
          </Grid>
        </Grid> */}
        <Grid item className={styles.endTextGrid}>
          <Typography className={styles.endText}>BackTrack</Typography>
        </Grid>
      </Grid>
    </>
  );
}

export default HomePage;
