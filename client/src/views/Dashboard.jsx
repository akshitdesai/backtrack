import {
  Avatar,
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  Link,
  MenuItem,
  Select,
  TextField,
  Typography,
  makeStyles,
  useTheme,
} from "@material-ui/core";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import * as React from "react";
import dashbaord from "../assets/icons/dashboard.png";
import eye from "../assets/images/eye.png";
import apiList from "../helper/Apis";
import "../css/dashboard.css";

import { v4 as uuidv4 } from "uuid";
import BarChart from "../helper/BarChart";
import PieChart from "../helper/PieChart";
import StopIcon from "@material-ui/icons/Stop";
import axios from "axios";
import dayjs from "dayjs";
import moment from "moment";
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging/sw";
import { getToken } from "firebase/messaging";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import PropTypes from "prop-types";
import { PopupContext } from "../App";
import Popup from "../helper/Popup";

function Stream(props) {
  const uniqueId = uuidv4();
  const streamSource = `${apiList.stream}/${uniqueId}`;

  return (
    <div className="stream-monitoring" style={{ position: "relative" }}>
      <img src={streamSource} className="App-logo" alt="logo" />

      <button
        className="pause-button"
        style={{
          position: "absolute",
          top: "90%",
          left: "90%",
          transform: "translate(-50%, -50%)",
          zIndex: 1, // Ensure button is above the image
          cursor: "pointer",
          opacity: 0.5,
        }}
        onClick={() => {
          // Handle pause functionality here
          props.setStreamStarted(false);
          props.onPause(uniqueId);
        }}
      >
        <StopIcon />
      </button>
    </div>
  );
}
export default function Dashboard() {
  // const styles = useStyles();
  const [streamStarted, setStreamStarted] = React.useState(false);
  const [sessionData, setSessionData] = React.useState([]);
  const [historySeries, setHistorySeries] = React.useState([]);
  const [historyDates, setHistoryDates] = React.useState([]);
  const [averagePosture, setAveragePosture] = React.useState(0);
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);
  const [notificationTimerDetails, setNotificationTimerDetails] =
    React.useState({
      time: "",
      unit: "",
    });
  const setPopup = React.useContext(PopupContext);

  React.useEffect(() => {
    getSessionHistory();
    initializeFirebase();
  }, []);
  const initializeFirebase = () => {
    const firebaseConfig = {
      // Your Firebase configuration
      apiKey: "AIzaSyCHCMf9Uy2t9F5XFIcSErdiVpgaKt9U3tI",
      authDomain: "backtrack-8231c.firebaseapp.com",
      projectId: "backtrack-8231c",
      storageBucket: "backtrack-8231c.appspot.com",
      messagingSenderId: "261927245122",
      appId: "1:261927245122:web:06664f285faf4b82e524db",
      measurementId: "G-N5Y7J4ESNL",
    };

    const app = initializeApp(firebaseConfig);

    const messaging = getMessaging(app);

    console.log("Requesting permission...");
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        console.log("Notification permission granted.");
      }
    });

    getToken(messaging, {
      vapidKey:
        "BE7yOAmKFq4OxtJ-9LkHo11j7JyVfeH9ts8dNu4YZ9PphOOgzQ7aT3UUvniF0VQHzLi_CI8rOgeAoaRI8_yHQNA",
    })
      .then((currentToken) => {
        if (currentToken) {
          console.log("token ", currentToken);
          axios
            .get(`${apiList.registerToken}/${currentToken}`)
            .then((response) => {
              console.log("Token - > ", response);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          // Show permission request UI
          console.log(
            "No registration token available. Request permission to generate one."
          );
          // ...
        }
      })
      .catch((err) => {
        console.log("An error occurred while retrieving token. ", err);
        // ...
      });
  };
  const getSessionHistory = () => {
    const getSessionHistory = `${apiList.history}`;
    axios
      .get(getSessionHistory)
      .then((response) => {
        console.log("Session - > ", response.data);
        const categories = Object.keys(response.data);
        const series = [
          {
            name: "App Usage(in mins)",
            data: categories.map((date) =>
              parseInt(response.data[date].duration_total / 60)
            ),
          },
          {
            name: "Good Posture Progress(%)",
            data: categories.map((date) =>
              parseInt(response.data[date].average_good_posture)
            ),
          },
        ];
        const postureValues = series[1].data;
        const totalPosture = postureValues.reduce((acc, val) => acc + val, 0);
        const averagePosture = parseInt(totalPosture / postureValues.length);

        console.log("Average posture", averagePosture);

        setHistorySeries(series);
        setHistoryDates(categories);
        setAveragePosture(averagePosture);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getStarted = () => {
    setStreamStarted(true);
  };
  const onStreamPause = (uniqueId) => {
    setIsPopupOpen(true);
    const stop = "stop";
    const pauseStream = `${apiList.stream}/${uniqueId}/${stop}`;
    axios
      .get(pauseStream)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getSessionByDate = (date) => {
    const formattedDate = moment(date.$d).format("YYYY-MM-DD");
    console.log("Formatted date", formattedDate);
    const getSession = `${apiList.session}/${formattedDate}`;
    axios
      .get(getSession)
      .then((response) => {
        console.log("Session - > ", response.data[0]);
        const filteredData = response.data[0].filter(
          (session) => session.duration != null
        );
        setSessionData(filteredData.reverse());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleNotificationTimer = (event) => {
    event.preventDefault(); // Prevent page refresh
    setIsPopupOpen(true);
    const selectedUnit = notificationTimerDetails.unit;
    let finalDuration = 0;
    if (selectedUnit.match("minute")) {
      finalDuration = 60 * notificationTimerDetails.time;
    } else if (selectedUnit.match("hour")) {
      finalDuration = 3600 * notificationTimerDetails.time;
    } else {
      finalDuration = notificationTimerDetails.time;
    }
    console.log("Notifiaction timeer details", finalDuration);
    // setPopup({
    //   open: true,
    //   severity: "error",
    //   message: "You are sitting inappropriately since 10 minutes!",
    // });
    setNotificationTimerDetails({ time: "", unit: "" });
  };

  const handleInput = (key, value) => {
    setNotificationTimerDetails((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setPopup({
      open: true,
      severity: "success",
      message: "Your feedback saved!",
    });
  };

  return (
    <div className="container">
      <div className="side-panel">
        <h1>BackTrack</h1>
        <div className="avatar">
          <Avatar
            alt="User"
            style={{ objectFit: "fill", height: "60px", width: "60px" }}
          />
          <h2>Umang Patel</h2>
        </div>

        <div className="links">
          <span>
            <img src={dashbaord} alt="" />
            <h3>Dashboard</h3>
          </span>
        </div>
        <div className="logout-link">
          <Link href="/login">Logout</Link>
        </div>
      </div>
      <div className="main-content">
        <div className="main-content-upper">
          <div className="main-content-upper-left">
            <div className="greetings-section">
              <div className="greetings-content">
                <div>
                  <h1>GOOD MORNING UMANG!</h1>
                  <p>Start Your Journey to Optimize Your Posture with us.</p>
                </div>
                <div>
                  <p style={{ color: "#352DFF", marginBottom: "1em" }}>
                    Adjust Notification Time
                  </p>
                  <form onSubmit={handleNotificationTimer}>
                    <div className="notification-form">
                      <TextField
                        label="Time"
                        inputProps={{ type: "number" }}
                        variant="outlined"
                        value={notificationTimerDetails.time}
                        onChange={(event) =>
                          handleInput("time", event.target.value)
                        }
                        style={{ flex: 1 }}
                      />

                      <FormControl variant="outlined" style={{ flex: 1 }}>
                        <InputLabel id="demo-simple-select-helper-label">
                          Unit
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-helper-label"
                          id="demo-simple-select-helper"
                          value={notificationTimerDetails.unit}
                          label="Unit"
                          onChange={(event) =>
                            handleInput("unit", event.target.value)
                          }
                        >
                          <MenuItem value={"second"}>Second</MenuItem>
                          <MenuItem value={"minute"}>Minute</MenuItem>
                          <MenuItem value={"hour"}>Hour</MenuItem>
                        </Select>
                      </FormControl>
                      <button className="set-timer">Set</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="stats-section">
              <div className="stats-section-right">
                {streamStarted ? (
                  <Stream
                    setStreamStarted={setStreamStarted}
                    onPause={onStreamPause}
                  />
                ) : (
                  <>
                    <div className="eye-image">
                      <img src={eye} alt="eye" />
                    </div>

                    <div className="monitoring-details">
                      <h1>Start Monitoring</h1>
                      <p>Start your monitor session now. </p>
                      <button
                        className="get-started"
                        onClick={() => getStarted()}
                      >
                        Get Started
                      </button>
                      {/* {streamStarted && <Stream />} */}
                    </div>
                  </>
                )}
              </div>
              <Popup open={isPopupOpen} onClose={handleClosePopup} />
              <div className="stats-section-left">
                <div className="analysis-details">
                  <h1>Posture Analysis Results</h1>
                  {/* <h2 style={{color:"#352DFF"}}>{averagePosture}%</h2>
                  <h2>Success</h2> */}
                </div>
                <div className="analysis-details-progress">
                  {averagePosture > 0 && (
                    <PieChart averagePosture={averagePosture} />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="main-content-upper-right">
            <BasicDateCalendar onDateChage={getSessionByDate} />
          </div>
        </div>
        <div className="main-content-lower">
          <div className="apex-chart">
            <h1>Progress Report</h1>

            <div>
              {historyDates.length > 0 && (
                <BarChart series={historySeries} categories={historyDates} />
              )}
            </div>
          </div>
          <div className="session-history">
            <h1>Session History</h1>
            <BasicTable sessionData={sessionData} />
          </div>
        </div>
      </div>
    </div>
  );
}

function BasicDateCalendar(props) {
  const [value, setValue] = React.useState(dayjs());
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        // value={selectedDate}
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
          props.onDateChage(newValue);
        }}
        // onClick={props.onDateChage(value)}
      />
    </LocalizationProvider>
  );
}

const sessionData = [
  { start_time: "10 Mar 2024", duration: 25, good_posture: 65 },
  { start_time: "11 Mar 2024", duration: 30, good_posture: 70 },
  { start_time: "12 Mar 2024", duration: 20, good_posture: 60 },
  { start_time: "13 Mar 2024", duration: 35, good_posture: 75 },
  { start_time: "14 Mar 2024", duration: 40, good_posture: 80 },
  { start_time: "15 Mar 2024", duration: 45, good_posture: 85 },
  { start_time: "16 Mar 2024", duration: 22, good_posture: 68 },
  { start_time: "17 Mar 2024", duration: 28, good_posture: 72 },
  { start_time: "10 Mar 2024", duration: 25, good_posture: 65 },
  { start_time: "11 Mar 2024", duration: 30, good_posture: 70 },
  { start_time: "12 Mar 2024", duration: 20, good_posture: 60 },
  { start_time: "13 Mar 2024", duration: 35, good_posture: 75 },
  { start_time: "14 Mar 2024", duration: 40, good_posture: 80 },
  { start_time: "15 Mar 2024", duration: 45, good_posture: 85 },
  { start_time: "16 Mar 2024", duration: 22, good_posture: 68 },
  { start_time: "17 Mar 2024", duration: 28, good_posture: 72 },
];
function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};
function BasicTable(props) {
  const sessionData1 = props.sessionData;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - sessionData.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead
          style={{ position: "sticky", top: 0, background: "#e1dfdf" }}
        >
          <TableRow>
            <TableCell align="center">Date</TableCell>
            <TableCell align="center">Time Spent</TableCell>
            <TableCell align="center">Good Posture</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? sessionData.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )
            : sessionData
          ).map((session) => (
            <TableRow
              key={session.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">
                {moment(session.start_time).format("DD MMM YYYY")}
              </TableCell>
              <TableCell align="center">
                {session.duration > 60
                  ? `${parseInt(
                      moment
                        .duration(session.duration, "seconds")
                        .asMinutes()
                        .toFixed(2)
                    )} minutes`
                  : `${session.duration} seconds`}
              </TableCell>
              <TableCell align="center">
                {parseInt(session.good_posture)}%
              </TableCell>
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={3}
              count={sessionData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              slotProps={{
                select: {
                  inputProps: {
                    "aria-label": "sessionData per page",
                  },
                  native: true,
                },
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
