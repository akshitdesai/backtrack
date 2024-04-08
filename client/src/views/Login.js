import React, { useContext, useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Grid,
  Avatar,
  Link,
  makeStyles,
} from "@material-ui/core";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { PopupContext } from "../App";
import HomeImage from "../assets/images/home.jpg";
import PasswordInput from "./PasswordInput";
import getToken from "../helper/Auth";
import apiList from "../helper/Apis";

const useStyles = makeStyles((theme) => ({
  body: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    // minHeight: "98vh",
    // paddingTop: "64px",
    boxSizing: "border-box",
    // width: "100%",
  },
  inputBox: {
    width: "400px",
    // marginTop: "18px",
  },
  submitButton: {
    width: "300px",
  },
}));
function LoginPage() {
  const styles = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const setPopup = useContext(PopupContext);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

    const [isLoggedIn, setIsLoggedIn] = useState(getToken);
  const [inputError, setInputError] = useState({
    username: {
      error: false,
      message: "",
    },
    password: {
      error: false,
      message: "",
    },
  });

  const handleInputError = (key, status, message) => {
    setInputError({
      ...inputError,
      [key]: {
        error: status,
        message,
      },
    });
  };

  const handleUsernameError = (event) => {
    const username = event.target.value;
    if (username === "") {
      if (true) {
        handleInputError("username", true, "Email is required");
      }
    } else {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (re.test(String(event.target.value).toLowerCase())) {
        handleInputError("username", false, "");
      } else {
        handleInputError("username", true, "Incorrect email format");
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
  const handleSubmit = (event) => {
    console.log("Button Clicked !!", username, password);
    event.preventDefault();
    // Perform login logic here with username and password
    const isComplete = !Object.keys(inputError).some(
      (obj) => inputError[obj].error
    );
    const loginDetails = {
      email: username,
      password,
    };
    if (isComplete) {
      axios
        .post(apiList.login, loginDetails)
        .then((response) => {
          localStorage.setItem("token", response.data.access_token);
          localStorage.setItem("username",response.data.user.username
          );
          setIsLoggedIn(getToken);
          setPopup({
            open: true,
            severity: "success",
            message: "Logged in successfully",
          });
          console.log(response);
        })
        .catch((err) => {
          setPopup({
            open: true,
            severity: "error",
            message: "Invalid Details",
          });
          console.log(err.response);
        });
    } else {
      setPopup({
        open: true,
        severity: "error",
        message: "Incorrect Input",
      });
    }
  };

  return isLoggedIn ? (
    <Navigate to="/dashboard" />
  ) : (
    <Grid container style={{ marginTop: "5%" }}>
      {/*<Grid item sm={12} md={6}>*/}
      {/*  <div className={styles.body}>*/}
      {/*    <img*/}
      {/*      src={HomeImage}*/}
      {/*      width={500}*/}
      {/*      height={500}*/}
      {/*      style={{ borderRadius: "50%" }}*/}
      {/*    />*/}
      {/*  </div>*/}
      {/*</Grid>*/}
      <Grid item sm={12} md={12}>
        <div className={styles.body} style={{ height: "100%" }}>
          <div className={styles.body}>
            <Avatar sx={{ bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography
              variant="h4"
              component="h2"
              style={{ color: "#b2b2b2", fontWeight: "bold" }}
            >
              Sign in
            </Typography>
          </div>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              variant="outlined"
              value={username}
              onChange={handleUsernameChange}
              inputError={inputError}
              handleInputError={handleInputError}
              helperText={inputError.username.message}
              error={inputError.username.error}
              onBlur={handleUsernameError}
              fullWidth
              margin="normal"
            />
            {/* <TextField
              label="Password"
              variant="outlined"
              value={password}
              onChange={handlePasswordChange}
              inputError={inputError}
              handleInputError={handleInputError}
              type="password"
              helperText={inputError.password.message}
              error={inputError.password.message}
              onBlur={handlePasswordError}
              fullWidth
              margin="normal"
            /> */}
            <Grid item>
              <PasswordInput
                label="Password"
                value={password}
                onChange={handlePasswordChange}
                className={styles.inputBox}
                error={inputError.password.error}
                helperText={inputError.password.message}
                onBlur={handlePasswordError}
                fullWidth
              />
            </Grid>
            <Button
              type="submit"
              variant="contained"
              style={{ fontWeight: "700", bgcolor: "#b2b2b2" }}
              fullWidth
            >
              Login
            </Button>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "10px",
              }}
            >
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
              <Link href="/signup" variant="body2">
                Don't have an account? Sign Up
              </Link>
            </div>
          </form>
        </div>
      </Grid>
      {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
    </Grid>
  );
}

export default LoginPage;
