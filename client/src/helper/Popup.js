import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextareaAutosize,
  TextField,
} from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import Button from "@mui/material/Button";
import "../css/dashboard.css";

const Popup = ({ open, onClose }) => {
  const [feedback, setFeedback] = useState("");

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleSubmit = () => {
    // Submit feedback logic goes here
    console.log("Feedback submitted:", feedback);
    // You can clear the feedback state here if needed
    setFeedback("");
    // Close the popup
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{
        style: {
          minHeight: "20%",
          maxHeight: "20%",
          minWidth: "25%",
          borderRadius: "10px",
        },
      }}
    >
      <DialogTitle id="alert-dialog-title">{"Feedback"}</DialogTitle>
      <DialogContent className="feedback-content"
      >
        <DialogContentText id="alert-dialog-description">
          How was your experience?
        </DialogContentText>
        <TextField
          placeholder="Write your feedback here..."
          multiline
          maxRows={3}
          variant="outlined"
          value={feedback}
          onChange={handleFeedbackChange}
          fullWidth
        />
        {/*<Button className="feedback-submit" onClick={handleSubmit} variant="outlined">*/}
        {/*  Submit*/}
        {/*</Button>*/}
      </DialogContent>
      <DialogActions className="popup-actions">
        <Button onClick={handleSubmit} variant="outlined">
          Submit
        </Button>
        {/*<ThumbUpAltIcon style={{ cursor: "pointer" }} onClick={onClose} />*/}
        {/*<ThumbDownIcon style={{ cursor: "pointer" }} onClick={onClose} />*/}
      </DialogActions>
    </Dialog>
  );
};

export default Popup;
