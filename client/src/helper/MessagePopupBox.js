import { Snackbar, Slide } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React from "react";

function MessagePopupBox(props) {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    props.setOpen(false);
  };
  return (
    <Snackbar
      open={props.open}
      onClose={handleClose}
      autoHideDuration={2000}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <Alert onClose={handleClose} severity={props.severity}>
        {props.message}
      </Alert>
    </Snackbar>
  );
}

export default MessagePopupBox;
