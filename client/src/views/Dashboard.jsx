import {
  Avatar,
  Button,
  Grid,
  Typography,
  makeStyles,
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
import StopIcon from '@material-ui/icons/Stop';
import axios from "axios";
import dayjs from "dayjs";
import moment from "moment";
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging/sw";
import { getToken } from "firebase/messaging";

// const useStyles = makeStyles((theme) => ({
//   body: {
//     height: "100vh",
//   },
//   sideBar: {
//     display: "inline-flex",
//     padding: "50px 25px 133px 25px",
//     flexDirection: "column",
//     alignItems: "center",
//     background: "#F4F4F4",
//     height: "100%",
//     // gap: "406px",
//   },
//   titleBox: {
//     display: "inline-flex",
//     padding: "25px 440px 34px 30px",
//     alignItems: "center",
//     borderRadius: "24px",
//     height: "2%",
//     width: "37%",
//     marginTop: "2%",

//     background:
//       "linear-gradient(89deg, rgba(228, 117, 203, 0.40) 0%, rgba(120, 51, 194, 0.40) 48.33%, rgba(53, 45, 255, 0.40) 87.25%)",
//   },
//   smallGraph: {
//     borderRadius: "24px",
//     background: "#F4F4F4",
//     height: "250px",
//     padding: "20px",
//     // marginRight:"2px"
//   },
//   startButtonStyle: {
//     borderRadius: "4px",
//     border: "1px solid var(--Black, #000);",
//     background: "#191825",
//     "&:hover": {
//       background: "#1e1c3a", // Change this to your desired hover background color
//     },
//     padding: "12px 24px",
//   },
//   buttonTitle: {
//     color: "#FFF",
//     fontFamily: "Inter",
//     fontSize: "16px",
//     fontStyle: "normal",
//     fontWeight: 400,
//     lineHeight: "150%",
//   },
//   percentageText: {
//     color: "#EA770D",
//     fontFamily: "Inter",
//     fontSize: "40px",
//     fontStyle: "normal",
//     fontWeight: 600,
//     lineHeight: "120%",
//   },
// }));

function Stream(props) {
  const uniqueId = uuidv4();
  const streamSource = `${apiList.stream}/${uniqueId}`;
  
  return (
    <div className="stream-monitoring" style={{ position: 'relative' }}>
      <img
        src={streamSource}
        className="App-logo"
        alt="logo"
       
      />
   
        
        <button
          className="pause-button"
          style={{
            position: 'absolute',
            top: '90%',
            left: '90%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1, // Ensure button is above the image
            cursor:'pointer',
            opacity: 0.5,
          }}
          onClick={() => {
            // Handle pause functionality here
            props.setStreamStarted(false)
            props.onPause(uniqueId);
          }}
        >
          <StopIcon/>
        </button>
    </div>
  );
}
export default function Dashboard() {
  // const styles = useStyles();
  const [streamStarted, setStreamStarted] = React.useState(false);
  const [sessionData, setSessionData] = React.useState([]);
  const [historySeries,setHistorySeries] = React.useState([]);
  const [historyDates, setHistoryDates] = React.useState([]);
  const [averagePosture, setAveragePosture] = React.useState(0);

  React.useEffect(() => {
    getSessionHistory();
    initializeFirebase();

  }, []);
  const initializeFirebase = () => {
    const firebaseConfig = {
      // Your Firebase configuration
      "apiKey": "AIzaSyCHCMf9Uy2t9F5XFIcSErdiVpgaKt9U3tI",
      "authDomain": "backtrack-8231c.firebaseapp.com",
      "projectId": "backtrack-8231c",
      "storageBucket": "backtrack-8231c.appspot.com",
      "messagingSenderId": "261927245122",
      "appId": "1:261927245122:web:06664f285faf4b82e524db",
      "measurementId": "G-N5Y7J4ESNL"
    };

    const app = initializeApp(firebaseConfig);

    const messaging = getMessaging(app);

      console.log('Requesting permission...');
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          console.log('Notification permission granted.');
        }
      })
    


    getToken(messaging, { vapidKey: 'BE7yOAmKFq4OxtJ-9LkHo11j7JyVfeH9ts8dNu4YZ9PphOOgzQ7aT3UUvniF0VQHzLi_CI8rOgeAoaRI8_yHQNA' }).then((currentToken) => {
      if (currentToken) {
        console.log("token ", currentToken)
        axios.get(`${apiList.registerToken}/${currentToken}`)
        .then((response) => {
          console.log("Token - > ", response);
        }
        )
        .catch((err) => {
          console.log(err);
        }
        )
      } else {
        // Show permission request UI
        console.log('No registration token available. Request permission to generate one.');
        // ...
      }
    }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
      // ...
    });

  };
  const getSessionHistory = () => {
    const getSessionHistory = `${apiList.history}`;
    axios.get(getSessionHistory)
      .then((response) => {
        console.log("Session - > ", response.data);
        const categories = Object.keys(response.data);
const series = [
    {
        name: "App Usage(in mins)",
        data: categories.map(date => response.data[date].duration_total)
    },
    {
        name: "Good Posture Progress(%)",
        data: categories.map(date => parseInt(response.data[date].average_good_posture))
    }
];
const postureValues = series[1].data;
const totalPosture = postureValues.reduce((acc, val) => acc + val, 0);
const averagePosture = totalPosture / postureValues.length;

console.log("Average posture", averagePosture);

setHistorySeries(series);
setHistoryDates(categories);
setAveragePosture(averagePosture)
       
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const getStarted = () => {
    setStreamStarted(true);
  };
  const onStreamPause = (uniqueId) =>{
    const stop = "stop"
    const pauseStream = `${apiList.stream}/${uniqueId}/${stop}`;
    axios.get(pauseStream)
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
  
  }

  const getSessionByDate = (date) =>{
  const formattedDate = moment(date.$d).format('YYYY-MM-DD'); 
  console.log("Formatted date", formattedDate); 
    const getSession = `${apiList.session}/${formattedDate}`;
    axios.get(getSession)
    .then((response) => {
      console.log("Session - > ",response.data[0]);
      const filteredData = response.data[0].filter((session)=>session.duration!=null)
      setSessionData(filteredData.reverse());
    })
    .catch((err) => {
      console.log(err);
    });
  }



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
          {/* <span>
            <img src={dashbaord} alt="" />
            <h3>Dashboard</h3>
          </span> */}
        </div>
      </div>
      <div className="main-content">
        <div className="main-content-upper">
          <div className="main-content-upper-left">
            {/* <div className="greetings-section">
              <div className="greetings-content">
                <h1>GOOD MORNING UMANG!</h1>
                <p>Start Your Journey to Optimize Your Posture with us.</p>
              </div>
            </div> */}
            <div className="stats-section">
              <div className="stats-section-right">
              {streamStarted ? <Stream setStreamStarted={setStreamStarted} onPause={onStreamPause}/> :
              <>
                <div className="eye-image">
                  <img src={eye} alt="eye"/>
                </div>
               
                <div className="monitoring-details">
                  <h1>Start Monitoring</h1>
                  <p>Start your monitor session
now. </p>
                  <button className="get-started"  onClick={() => getStarted()}>Get Started</button>
                  {/* {streamStarted && <Stream />} */}
                </div>
                </>
               }
              </div>
              <div className="stats-section-left">
                <div className="analysis-details">
                  <h1>Posture Analysis Results</h1>
                  {/* <h2 style={{color:"#352DFF"}}>{averagePosture}%</h2>
                  <h2>Success</h2> */}
                </div>
                <div className="analysis-details-progress">
                  {averagePosture>0 && <PieChart averagePosture = {averagePosture}/>}
                </div>
              </div>
            </div>
          </div>
          <div className="main-content-upper-right">
            <BasicDateCalendar onDateChage = {getSessionByDate} />
          </div>
        </div>
        <div className="main-content-lower">
          <div className="apex-chart">
            <h1>Progress Report</h1>
            <div>
              {historyDates.length>0 && <BarChart series={historySeries} categories = {historyDates}/>}
            </div>
          </div>
          <div className="session-history">
          <h1>Session History</h1>
            <BasicTable sessionData = {sessionData}/>
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
        value={value} onChange={(newValue) => {setValue(newValue); props.onDateChage(newValue);}}
        // onClick={props.onDateChage(value)}
        />
    </LocalizationProvider>
  );
}

const rows = [
  { Date: " 10 Mar 2024", Time: "25 Mins", Posture: "65" },
  { Date: " 10 Mar 2024", Time: "25 Mins", Posture: "65" },
  { Date: " 10 Mar 2024", Time: "25 Mins", Posture: "65" },
  { Date: " 10 Mar 2024", Time: "25 Mins", Posture: "65" },
  { Date: " 10 Mar 2024", Time: "25 Mins", Posture: "65" },
  { Date: " 10 Mar 2024", Time: "25 Mins", Posture: "65" },
  { Date: " 10 Mar 2024", Time: "25 Mins", Posture: "65" },
  { Date: " 10 Mar 2024", Time: "25 Mins", Posture: "65" },
];

function BasicTable(props) {
  const sessionData = props.sessionData;
  return (
    <TableContainer component={Paper} style={{ maxHeight: '500px', overflowY: 'auto' }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead style={{ position: 'sticky', top: 0 , background:"#e1dfdf"}}>
          <TableRow>
            <TableCell align="center">Date</TableCell>
            <TableCell align="center">Time Spent</TableCell>
            <TableCell align="center">Good Posture</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sessionData.map((session) => (
            <TableRow key={session.name}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell align="center">{moment(session.start_time).format('DD MMM YYYY')}</TableCell>
              <TableCell align="center">{moment.duration(session.duration, 'seconds').asMinutes().toFixed(2)}</TableCell>
              <TableCell align="center">{session.good_posture}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

// <Grid container className={styles.body} spacing={3}>
//   <Grid item xs={2}>
//     <Grid container spacing={4} item className={styles.sideBar}>
//       <Grid item className="heading3">
//         <b>BackTrack</b>
//       </Grid>
//       <Grid item>
//         <Avatar
//           alt="User"
//           style={{ objectFit: "fill", height: "60px", width: "60px" }}
//         />
//       </Grid>
//       <Grid item className="heading3">
//         Umang Patel
//       </Grid>
//       <Grid item>
//         <Grid container alignItems="center">
//           <Grid item>
//             <img
//               src={dashbaord}
//               alt="Dashboard Icon"
//               style={{ cursor: "pointer", marginRight: "10px" }} // Add margin to create space between the icon and text
//             />
//           </Grid>
//           <Grid item>
//             <p className="heading3">Dashboard</p>
//           </Grid>
//         </Grid>
//       </Grid>
//     </Grid>
//   </Grid>
//   <Grid item xs={6}>
//     <Grid className={styles.titleBox}>
//       <Grid item className="heading2" style={{ fontSize: "22px" }}>
//         Good Morning Umang!
//       </Grid>
//     </Grid>
//     <Grid item container style={{ marginTop: "2%", marginLeft: "1%" }}>
//       <Grid item xs={6} className={styles.smallGraph}>
//         <Grid item container>
//           <Grid item xs={6}>
//             <Typography className="heading2" style={{ fontSize: "26px" }}>
//               Start Monitoring
//             </Typography>
//             <Grid style={{ marginTop: "10%" }}>
//               <Button
//                 className={styles.startButtonStyle}
//                 onClick={() => getStarted()}
//               >
//                 <Typography className={styles.buttonTitle}>
//                   Get Started
//                 </Typography>
//               </Button>
//               {streamStarted && <Stream />}
//             </Grid>
//           </Grid>

//           <Grid item xs={6}>
//             <img
//               src={eye}
//               alt="Analysis Icon"
//               style={{ cursor: "pointer" }} // Add margin to create space between the icon and text
//             />
//           </Grid>
//         </Grid>
//       </Grid>
//       <Grid item xs={6} className={styles.smallGraph}>
//         <Grid item container>
//           <Grid item xs={6}>
//             <Typography className="heading2" style={{ fontSize: "26px" }}>
//               Posture Analysis Results
//             </Typography>
//             <Typography className={styles.percentageText}>
//               64% Success
//             </Typography>
//           </Grid>

//           <Grid item xs={6}>
//             <img
//               src={eye}
//               alt="Analysis Icon"
//               style={{ cursor: "pointer" }} // Add margin to create space between the icon and text
//             />
//           </Grid>
//         </Grid>
//       </Grid>
//     </Grid>
//   </Grid>
// </Grid>
