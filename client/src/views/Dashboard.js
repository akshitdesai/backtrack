import {
  Avatar,
  Button,
  Grid,
  Typography,
  makeStyles,
} from "@material-ui/core";
import * as React from "react";
import dashbaord from "../assets/icons/dashboard.png";
import eye from "../assets/images/eye.png";
import apiList from "../helper/Apis";

import { v4 as uuidv4 } from "uuid";

const useStyles = makeStyles((theme) => ({
  body: {
    height: "100vh",
  },
  sideBar: {
    display: "inline-flex",
    padding: "50px 25px 133px 25px",
    flexDirection: "column",
    alignItems: "center",
    background: "#F4F4F4",
    height: "100%",
    // gap: "406px",
  },
  titleBox: {
    display: "inline-flex",
    padding: "25px 440px 34px 30px",
    alignItems: "center",
    borderRadius: "24px",
    height: "2%",
    width: "37%",
    marginTop: "2%",

    background:
      "linear-gradient(89deg, rgba(228, 117, 203, 0.40) 0%, rgba(120, 51, 194, 0.40) 48.33%, rgba(53, 45, 255, 0.40) 87.25%)",
  },
  smallGraph: {
    borderRadius: "24px",
    background: "#F4F4F4",
    height: "250px",
    padding: "20px",
    // marginRight:"2px"
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
  buttonTitle: {
    color: "#FFF",
    fontFamily: "Inter",
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "150%",
  },
  percentageText: {
    color: "#EA770D",
    fontFamily: "Inter",
    fontSize: "40px",
    fontStyle: "normal",
    fontWeight: 600,
    lineHeight: "120%",
  },
}));

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
export default function Dashboard() {
  const styles = useStyles();
  const [streamStarted, setStreamStarted] = React.useState(false);

  const getStarted = () => {
    setStreamStarted(true);
  };

  return (
    <Grid container className={styles.body} spacing={3}>
      <Grid item xs={2}>
        <Grid container spacing={4} item className={styles.sideBar}>
          <Grid item className="heading3">
            <b>BackTrack</b>
          </Grid>
          <Grid item>
            <Avatar
              alt="User"
              style={{ objectFit: "fill", height: "60px", width: "60px" }}
            />
          </Grid>
          <Grid item className="heading3">
            Umang Patel
          </Grid>
          <Grid item>
            <Grid container alignItems="center">
              <Grid item>
                <img
                  src={dashbaord}
                  alt="Dashboard Icon"
                  style={{ cursor: "pointer", marginRight: "10px" }} // Add margin to create space between the icon and text
                />
              </Grid>
              <Grid item>
                <p className="heading3">Dashboard</p>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={6}>
        <Grid className={styles.titleBox}>
          <Grid item className="heading2" style={{ fontSize: "22px" }}>
            Good Morning Umang!
          </Grid>
        </Grid>
        <Grid item container style={{ marginTop: "2%", marginLeft: "1%" }}>
          <Grid item xs={6} className={styles.smallGraph}>
            <Grid item container>
              <Grid item xs={6}>
                <Typography className="heading2" style={{ fontSize: "26px" }}>
                  Start Monitoring
                </Typography>
                <Grid style={{ marginTop: "10%" }}>
                  <Button
                    className={styles.startButtonStyle}
                    onClick={() => getStarted()}
                  >
                    <Typography className={styles.buttonTitle}>
                      Get Started
                    </Typography>
                  </Button>
                  {streamStarted && <Stream />}
                </Grid>
              </Grid>

              <Grid item xs={6}>
                <img
                  src={eye}
                  alt="Analysis Icon"
                  style={{ cursor: "pointer" }} // Add margin to create space between the icon and text
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6} className={styles.smallGraph}>
            <Grid item container>
              <Grid item xs={6}>
                <Typography className="heading2" style={{ fontSize: "26px" }}>
                  Posture Analysis Results
                </Typography>
                <Typography className={styles.percentageText}>
                  64% Success
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <img
                  src={eye}
                  alt="Analysis Icon"
                  style={{ cursor: "pointer" }} // Add margin to create space between the icon and text
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
