import React from "react";
import { useState, useContext } from "react";
import {
  Grid,
  TextField,
  Button,
  Typography,
  makeStyles,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Link,
} from "@material-ui/core";
import { Navigate, useNavigate } from "react-router-dom";
import DescriptionIcon from "@material-ui/icons/Description";
import FaceIcon from "@material-ui/icons/Face";
// import PhoneInput from "react-phone-input-2";
import { PopupContext } from "../App";
import PasswordInput from "./PasswordInput";

import HomeImage from "../assets/images/home.jpg";
import SignupImage from "../assets/images/signup.svg";
import FileInput from "../helper/FileInput";

import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import apiList from "../helper/Apis";
import axios from "axios";
import getToken from "../helper/Auth";
const useStyles = makeStyles((theme) => ({
  body: {
    padding: "30px 30px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  inputBox: {
    width: "400px",
  },
  customMargin: {
    marginTop: "16px",
    marginBottom: "8px",
  },
}));

function SignupPage(props) {
  const styles = useStyles();
  const setPopup = useContext(PopupContext);
  const [isLoggedIn, setLoggedIn] = useState(false);

  const [signupDetails, setSignupDetails] = useState({
    email: "",
    password: "",
    name: "",
    username: "",
  });

  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const [inputError, setinputError] = useState({
    email: {
      untouched: true,
      required: true,
      error: false,
      message: "",
    },
    password: {
      untouched: true,
      required: true,
      error: false,
      message: "",
    },
    name: {
      untouched: true,
      required: true,
      error: false,
      message: "",
    },
    username: {
      untouched: true,
      required: true,
      error: false,
      message: "",
    },
  });

  const handleInput = (key, value) => {
    setSignupDetails({
      ...signupDetails,
      [key]: value,
    });
  };

  const handleInputError = (key, status, message) => {
    setinputError({
      ...inputError,
      [key]: {
        required: true,
        untouched: false,
        error: status,
        message,
      },
    });
  };
  const handleEmailError = (event) => {
    const email = event.target.value;
    if (email === "") {
      if (true) {
        handleInputError("email", true, "Email is required");
      }
    } else {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (re.test(String(event.target.value).toLowerCase())) {
        handleInputError("email", false, "");
      } else {
        handleInputError("email", true, "Incorrect email format");
      }
    }
  };

  const handlePasswordError = (event) => {
    if (event.target.value === "") {
      handleInputError("password", true, "Password is required");
    } else {
      handleInputError("password", false, "");
    }
  };

  const handleSingup = () => {
    const tmpErrorHandler = {};
    Object.keys(inputError).forEach((obj) => {
      if (inputError[obj].required && inputError[obj].untouched) {
        tmpErrorHandler[obj] = {
          required: true,
          untouched: false,
          error: true,
          message: `${obj[0].toUpperCase() + obj.substr(1)} is required`,
        };
      } else {
        tmpErrorHandler[obj] = inputError[obj];
      }
    });

    setSignupDetails(signupDetails);

    const isComplete = !Object.keys(tmpErrorHandler).some(
      (obj) => tmpErrorHandler[obj].error
    );

    if (isComplete) {
      axios
        .post(apiList.signup, signupDetails)
        .then((response) => {
          localStorage.setItem("token", response.data.access_token);
          console.log("Token", getToken);
          navigate("/login");

          setPopup({
            open: true,
            severity: "success",
            message: "Logged in successfully",
          });
          console.log(response);
        })
        .catch((err) => {
          // navigate("/login");
          setPopup({
            open: true,
            severity: "error",
            message: err.response.data.message,
          });
          console.log(err.response);
        });
    } else {
      // navigate("/login");
      setinputError(tmpErrorHandler);
      setPopup({
        open: true,
        severity: "error",
        message: "Incorrect Input",
      });
    }
  };

  return isLoggedIn ? (
    <Navigate to="/" />
  ) : (
    // <Paper elevation={3} className={styles.body}>
    <Grid container spacing={3}>
      <Grid item xs={5} sm={12} md={6}>
        <div className={styles.body}>
          <img src={SignupImage} width={600} height={600} />
        </div>
      </Grid>
      <Grid item xs={7} sm={12} md={6} spacing={4} className={styles.body}>
        <div className={`${styles.body} Title`}>
          {/* <Typography className="Title"> */}
          <span style={{ color: "#352DFF" }}>Sign Up </span> & Improve Your
          Posture
          {/* </Typography> */}
        </div>
        <Grid item>
          <TextField
            label="Name"
            value={signupDetails.name}
            onChange={(event) => handleInput("name", event.target.value)}
            className={styles.inputBox}
            error={inputError.name.error}
            helperText={inputError.name.message}
            onBlur={(event) => {
              if (event.target.value === "") {
                handleInputError("name", true, "Name is required");
              } else {
                handleInputError("name", false, "");
              }
            }}
            variant="outlined"
            margin="normal"
          />
        </Grid>
        <Grid item>
          <TextField
            label="Username"
            value={signupDetails.username}
            onChange={(event) => handleInput("username", event.target.value)}
            className={styles.inputBox}
            error={inputError.username.error}
            helperText={inputError.username.message}
            onBlur={(event) => {
              if (event.target.value === "") {
                handleInputError("username", true, "Username is required");
              } else {
                handleInputError("username", false, "");
              }
            }}
            variant="outlined"
            margin="normal"
          />
        </Grid>
        <Grid item>
          <TextField
            label="Email"
            variant="outlined"
            value={signupDetails.email}
            onChange={(event) => handleInput("email", event.target.value)}
            inputError={inputError}
            handleInputError={handleInputError}
            helperText={inputError.email.message}
            error={inputError.email.error}
            onBlur={handleEmailError}
            className={styles.inputBox}
            margin="normal"
          />
        </Grid>
        <Grid item>
          <PasswordInput
            label="Password"
            value={signupDetails.password}
            onChange={(event) => handleInput("password", event.target.value)}
            className={styles.inputBox}
            error={inputError.password.error}
            helperText={inputError.password.message}
            onBlur={handlePasswordError}
          />
        </Grid>
        {/* <Grid item>
          <FileInput
            className={styles.inputBox + " " + styles.customMargin}
            label="Profile Picture"
            icon={<FaceIcon />}
            // uploadTo={apiList.uploadProfileImage}
            handleInput={handleInput}
            identifier="profile"
          />
        </Grid> */}

        <Grid item>
          {/* <PhoneInput
            country="ca"
            value={phone}
            onChange={(phone) => setPhone(phone)}
            className={styles.inputBox}
          /> */}
          {/* <PhoneInput
            country="ca"
            placeholder="Enter phone number"
            value={phone}
            onChange={(phone) => setPhone(phone)}
            className={styles.inputBox + " " + styles.customMargin}
            style={{ marginTop: "16px", marginBottom: "8px" }}
          /> */}
        </Grid>
        {/* <Grid item>
          <FormControlLabel
            control={<Checkbox value="allowExtraEmails" color="primary" />}
            label="I want to receive inspiration, new posts and updates via email."
            className={styles.inputBox + " " + styles.customMargin}
          />
        </Grid> */}

        <Button
          variant="contained"
          fullWidth
          color="primary"
          onClick={() => handleSingup()}
          //   className={styles.submitButton}
          className={styles.inputBox + " " + styles.customMargin}
          style={{ background: "#352DFF" }}
        >
          Signup
        </Button>

        <Grid container>
          <Grid
            item
            style={{ marginLeft: "52%", marginTop: "1%" }}
            className="heading4"
          >
            <span>Already have an account? </span>
            <Link href="/login" style={{ color: "#4942FF" }}>
              Log In
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
    // </Paper>
  );
}

export default SignupPage;
