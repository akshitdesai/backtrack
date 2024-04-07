import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import TranslateIcon from "@material-ui/icons/Translate";
import { useNavigate } from "react-router-dom";
import { Avatar, Menu, MenuItem } from "@material-ui/core";
import axios from "axios";
import { PopupContext } from "../App";
import apiList from "../helper/Apis";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: "#191825",
  },
  body: {
    flexDirection: "column",
    width: "100%",
  },
  appBar: {
    boxShadow: "none", // Remove the shadow from the app bar
  },
  button: {
    color: "#000", // Set button color to black
    textTransform: "none", // Prevent text capitalization
    fontSize: "16px",
    fontFamily: "Roboto",
    fontStyle: "normal",
    lineHeight: "150%",
    fontWeight: 400,
  },
  typographyTitle: {
    color: "#000",
    fontSize: "24px",
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: 700,
  },
  signupButton: {
    borderRadius: "2px",
    border: "1px solid var(--Black, #000)",
    background: "var(--Black, #000)",
    color: "white",
    textTransform: "none",
    borderRadius: "5px",
    "&:hover": {
      background: "#777171", // Change this to your desired hover background color
    },
  },
}));

function NavBar() {
  const styles = useStyles();
  const navigate = useNavigate();

  const [userData, setUserData] = useState("");
  const setPopup = useContext(PopupContext);
  const [anchorEl, setAnchorEl] = useState(null);
  useEffect(() => {
    getData();
  }, []);

  const handleClick = (location) => {
    navigate(location);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
   const getData = () => {
    // axios
    //   .get(apiList.user, {
    //     headers: {
    //       Authorization: `Bearer ${localStorage.getItem("token")}`,
    //     },
    //   })
    //   .then((response) => {
    //     console.log(response.data);
    //     setUserData(response.data);
    //   })
    //   .catch((err) => {
    //     setPopup({
    //       open: true,
    //       severity: "error",
    //       message: "Error",
    //     });
    //   });
   };

  return (
    <div className={styles.body}>
      <AppBar
        position="static"
        style={{ background: "white" }}
        className={styles.appBar}
      >
        <Toolbar>
          <Typography
            variant="h6"
            onClick={() => handleClick("/home")}
            style={{ cursor: "pointer" }}
            className={styles.typographyTitle}
          >
            BackTrack
          </Typography>

          <Typography variant="h6" className={styles.title}>
            &nbsp;&nbsp;
            {/* {userData?.name} */}
          </Typography>
          <>
            <Button
              onClick={() => handleClick("")}
              className={styles.button}
            >
              <Typography>Features</Typography>
            </Button>

            <Button
              onClick={() => handleClick("")}
              className={styles.button}
            >
              <Typography>Get Started</Typography>
            </Button>

            <Button
              onClick={() => handleClick("")}
              className={styles.button}
            >
              <Typography>FAQ</Typography>
            </Button>

            <Button
              onClick={() => handleClick("/signup")}
              className={styles.signupButton}
            >
              Sign up
            </Button>

            {/* <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Avatar
                  alt="User"
                  src={userData.profile}
                  style={{ objectFit: "fill" }}
                />
              </IconButton>

              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={() => handleClick("/profile")}>
                  Profile
                </MenuItem>
                <MenuItem onClick={() => handleClick("/logout")}>
                  Logout
                </MenuItem>
              </Menu>
            </div> */}
          </>
          {/* <IconButton
            aria-label="Language"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            className={styles.button}
          >
            <TranslateIcon />
          </IconButton> */}
        </Toolbar>
      </AppBar>
    </div>
  );
}
export default NavBar;
