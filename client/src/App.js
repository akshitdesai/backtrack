import React from "react";
import "./App.css";

import { createContext, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Grid, makeStyles } from "@material-ui/core";
import LoginPage from "./views/Login";
import SignUpPage from "./views/Signup";
import Footer from "./views/Footer";
import MessagePopupBox from "./helper/MessagePopupBox";
import HomePage from "./views/Home";
import Charts from "./views/Charts";
import Dashboard from "./views/Dashboard.jsx";

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={'/stream'} className="App-logo" alt="logo" />
//       </header>
//     </div>
//   );
// }
const useStyles = makeStyles((theme) => ({
  body: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "98vh",
    paddingTop: "64px",
    boxSizing: "border-box",
    width: "100%",
  },
}));

export const PopupContext = createContext();
function App() {
  const styles = useStyles();
  const [popup, setPopup] = useState({
    open: false,
    severity: "",
    message: "",
  });

  return (
    <BrowserRouter>
      <PopupContext.Provider value={setPopup}>
        <Grid container direction="column">
          <Grid item>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/charts" element={<Charts />} />
            </Routes>
          </Grid>
          {/* <Grid item>
            <Footer />
          </Grid> */}
        </Grid>
      </PopupContext.Provider>
      <MessagePopupBox
        open={popup.open}
        setOpen={(status) =>
          setPopup({
            ...popup,
            open: status,
          })
        }
        severity={popup.severity}
        message={popup.message}
      />
    </BrowserRouter>
  );
}

export default App;
