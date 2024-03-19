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
  Avatar,
} from "@material-ui/core";
import { PopupContext } from "../App";
import NavBar from "./NavBar";
import globalStyles from "../helper/GlobalStyles";
import { Rating } from "@material-ui/lab";
import next from "../assets/icons/next.png";
import previous from "../assets/icons/previous.png";
import dots from "../assets/icons/dots.png";
import plus from "../assets/icons/plus.png";
import Footer from "./Footer";
import apiList from "../helper/Apis";
import { v4 as uuidv4 } from 'uuid';
import SignupImage from "../assets/images/signup.svg";


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
    fontSize: "20px",
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
  leftAlignedText: {
    textAlign: "left",
  },
  reviewTileOuter: {
    padding: "32px",
    margin: "20px 0",
    boxSizing: "border-box",
    minHeight: "90%",
    borderRadius: "4px",
    border: "1px solid #191825",
  },
  commonSubTitle: {
    color: "#191825",
    fontFamily: "Inter",
    fontSize: "18px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "150%",
  },
  outerQuestion: {
    display: "flex",
    padding: "12px 24px",
    alignItems: "center",
    alignSelf: "stretch",
    borderRadius: "4px",
    border: "1px solid #191825",
    marginBottom: "2%",
  },
}));

const reviews = [
  {
    name: "Umang",
    occupation: "Software Developer",
    feedback:
      "Since using BackTrack, my back pain has significantly decreased. The instant feedback on my posture has been a game-changer. Highly recommend it to anyone spending hours at their desk.",
  },
  {
    name: "Darsh",
    occupation: "Graphic Designer",
    feedback:
      "BackTrack transformed how I work. Not only is my posture better, but I also feel more focused and productive. It's amazing to see such improvement in my health and work quality.",
  },
  {
    name: "Chetan",
    occupation: "Phd Student",
    feedback:
      "BackTrack's detailed reports and personalized tips have helped me improve my sitting habits drastically. I've noticed less strain and more energy for my studies. It's an essential tool for any student.",
  },
];
const faqs = [
  "How does BackTrack work?",
  "Is my privacy protected?",
  "Can I use BackTrack on any device?",
  "Is there a cost to use BackTrack?",
];
function ReviewTile(props) {
  const styles = useStyles();
  const reviewObject = props.review;
  return (
    <Grid container className={styles.reviewTileOuter}>
      <Grid container item spacing={1} direction="column">
        <Grid item>
          <Rating value={null} readOnly />
        </Grid>
        <Grid item className={styles.commonSubTitle}>
          "{reviewObject.feedback}"
        </Grid>

        <Grid item container spacing={2}>
          <Grid item>
            <Avatar alt="User" style={{ objectFit: "fill" }} />
          </Grid>
          <Grid item>
            <Grid item>
              {" "}
              <b>{reviewObject.name}</b>
            </Grid>
            <Grid item> {reviewObject.occupation}</Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

function Stream(props) {
  const uniqueId = uuidv4();
  const streamSource = `${apiList.stream}/${uniqueId}`;
  return (
    <div className="App">
      <header className="App-header">
        <img src={streamSource} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}
function HomePage(props) {
  const setPopup = useContext(PopupContext);
  const [streamStarted, setStreamStarted] = useState(false);
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

  const getStarted = ()=>{
   setStreamStarted(true);
  }

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
              <Button className={styles.startButtonStyle} onClick={()=>getStarted()}>
                <Typography className={styles.buttonTitle}>
                  Get Started
                </Typography>
              </Button>
              {streamStarted && (
        <Stream  />
      )}
            </Grid>
          </Grid>
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
        <Grid item container style={{ paddingLeft: "6%" }}>
          <Grid item xs={6} style={{ padding: "20px" }}>
            <div className={styles.monitoringGridTitle}>How to Get Started</div>
            <div className={styles.monitoringGridSubtitle}>
              Ready to take the first step towards a healthier, more productive
              life? BackTrack makes it easy to get started
            </div>
            <div>
              <p
                className={styles.monitoringGridSubtitle}
                style={{ color: "#000" }}
              >
                1. Create Account easily in a few clicks.{" "}
              </p>
              <p className={styles.monitoringGridSubtitle}>
                2. Adjust your webcam for a full workspace view.{" "}
              </p>
              <p className={styles.monitoringGridSubtitle}>
                3. Begin Posture analysis and get feedback now{" "}
              </p>
            </div>
            <div>
              <Button
                className={styles.tryButtonStyle}
                style={{ border: "1px solid #352DFF" }}
              >
                <Typography
                  className={styles.buttonTitle}
                  style={{ color: "#352DFF" }}
                >
                  Try Now
                </Typography>
              </Button>
            </div>
          </Grid>
          <Grid item xs={6}>
        <div>
          <img src={SignupImage} width={600} height={600} />
        </div>
      </Grid>
        </Grid>

        <Grid
          container
          direction="column"
          style={{ paddingLeft: "6%", marginTop: "4%", paddingRight: "5%" }}
        >
          <Grid item style={{ padding: "20px" }}>
            <Grid item>
              <Typography className={styles.monitoringGridTitle}>
                Customer testimonials
              </Typography>
              <Typography
                className={`${styles.subTitle} ${styles.leftAlignedText}`}
              >
                See what our customers have to say...
              </Typography>
            </Grid>
            <Grid item>
              <Grid container spacing={2}>
                {reviews.map((review) => (
                  <Grid xs={4} item>
                    <ReviewTile review={review} />
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid item>
              <Grid container>
                <Grid item>
                  {" "}
                  <img src={dots} alt="Dots" />
                </Grid>
                <Grid item xs container justifyContent="flex-end">
                  <img
                    src={previous}
                    alt="Previous Icon"
                    style={{ width: "28px", height: "28px" }}
                  />
                  <img
                    src={next}
                    alt="Next Icon"
                    style={{ width: "28px", height: "28px", marginLeft: "5px" }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid
          container
          direction="column"
          style={{ paddingLeft: "6%", marginTop: "3%", paddingRight: "5%" }}
        >
          <Grid item container style={{ padding: "20px" }} spacing={3}>
            <Grid item xs={5}>
              <Typography className={styles.monitoringGridTitle}>
                FAQs
              </Typography>
              <Typography
                className={styles.monitoringGridSubtitle}
                style={{ fontSize: "18px" }}
              >
                Got more questions? We’re here to help! Feel free to reach out
                or explore our detailed FAQ section to learn more about how
                BackTrack can make a difference in your daily life.
              </Typography>
            </Grid>
            <Grid item xs={7} style={{ paddingLeft: "3%" }}>
              {faqs.map((question) => (
                <Grid container className={styles.outerQuestion}>
                  <Grid item className={styles.commonSubTitle}>
                    <b>{question}</b>
                  </Grid>
                  <Grid item container xs justifyContent="flex-end">
                    <img
                      src={plus}
                      alt="Plus Icon"
                      style={{ cursor: "pointer" }}
                    />
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>

        <Grid
          container
          style={{ paddingLeft: "6%", marginTop: "4%", paddingRight: "5%" }}
        >
          <Footer />
        </Grid>
      </Grid>
    </>
  );
}

export default HomePage;
