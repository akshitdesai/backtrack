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
    // textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
  },
  shadeGrid: {
    width: "451px",
    height: "451px",
    flexShrink: 0,
  },
  monitoringGrid: {
    width: "1301px",
    height: "695px",
    flexShrink: 0,
    borderRadius: "16px",
    background: "#F4F4F4",
    marginTop: "5%",
    marginBottom: "5%",
  },
  monitoringGridTitle: {
    // height: "115.501px",
    flexShrink: 0,
    color: "#191825",
    fontFamily: "Inter",
    fontSize: "48px",
    fontStyle: "normal",
    fontWeight: 600,
    lineHeight: "120%",
  },
  monitoringGridSubtitle: {
    color: "rgba(25, 24, 37, 0.60)",
    fontFamily: "Inter",
    fontSize: "24px",
    fontStyle: "normal",
    fontWeight: 600,
    lineHeight: "150%",
    marginTop: "3%",
    // width: "420px",
  },
  startButtonStyle: {
    borderRadius: "4px",
    border: "1px solid var(--Black, #000);",
    background: "#191825",
    "&:hover": {
      background: "#1e1c3a", // Change this to your desired hover background color
    },
    padding: "12px 24px",
  },
  feedbackGrid: {
    width: "1301px",
    height: "605px",
    flexShrink: 0,
    borderRadius: "24px",
    // background: "#352DFF",
    marginTop: "5%",
    marginBottom: "5%",
  },
  tryButtonStyle: {
    borderRadius: "4px",
    border: "1px solid #FFF",
    background: "#FFF",
    "&:hover": {
      background: "#d9d3d6", // Change this to your desired hover background color
    },
    padding: "12px 24px",
  },
  smallGrid: {
    background: "#F4F4F4",
    height: "49%",
    borderRadius: "24px",
    padding: "20px",
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
        <Grid container className={styles.monitoringGrid}>
          <Grid item xs={6} style={{ marginLeft: "3%", marginTop: "3%" }}>
            <Grid item className={styles.monitoringGridTitle}>
              Real-Time Posture Monitoring
            </Grid>
            <Grid item className={styles.monitoringGridSubtitle}>
              Using your{" "}
              <span style={{ color: "#191825" }}>device's webcam</span>,
              BackTrack carefully observes your posture as you work or study,
              ensuring <span style={{ color: "#191825" }}>privacy</span> and{" "}
              <span style={{ color: "#191825" }}>security</span> at every step.
            </Grid>
            <Grid style={{ marginTop: "10%" }}>
              <Button className={styles.startButtonStyle}>
                <Typography className={styles.buttonTitle}>
                  Get Started
                </Typography>
              </Button>
            </Grid>
          </Grid>
          <Grid></Grid>
        </Grid>
        <Grid container className={styles.feedbackGrid}>
          <Grid
            item
            xs={9}
            style={{ background: "#352DFF", borderRadius: "24px" }}
          >
            <Grid container>
              <Grid item xs={6} style={{ marginLeft: "3%", marginTop: "3%" }}>
                <Grid
                  item
                  className={styles.monitoringGridTitle}
                  style={{ color: "#F1F1F1" }}
                >
                  Personalized Feedback
                </Grid>
                <Grid
                  item
                  className={styles.monitoringGridSubtitle}
                  style={{ color: "#F1F1F1" }}
                >
                  Instantly receive suggestions tailored to improve your
                  posture, reducing the risk of back pain and enhancing your
                  focus.
                </Grid>
                <Grid style={{ marginTop: "10%" }}>
                  <Button className={styles.tryButtonStyle}>
                    <Typography
                      className={styles.buttonTitle}
                      style={{ color: "#000" }}
                    >
                      Try Now
                    </Typography>
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={3} style={{ paddingLeft: "5%" }}>
            <Grid container direction="column" style={{ height: "100%" }}>
              <Grid item className={styles.smallGrid}>
                <Grid className={styles.monitoringGridTitle}>
                  Local Support
                </Grid>
                <Grid item className={styles.monitoringGridSubtitle}>
                  Discover health experts in your area, handpicked for you.
                </Grid>
              </Grid>
              <Grid style={{ height: "2%" }}></Grid>
              <Grid item className={styles.smallGrid}>
                <Grid className={styles.monitoringGridTitle}>
                  Progress Tracking
                </Grid>
                <Grid item className={styles.monitoringGridSubtitle}>
                  Get detailed Report, celebrate every improvement.
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default HomePage;
