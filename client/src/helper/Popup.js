import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
const Popup = ({ open, onClose }) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"Feedback"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                   How was your experience?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
             
                <ThumbUpAltIcon  style = {{cursor:"pointer"}} onClick={onClose}/>
                <ThumbDownIcon style = {{cursor:"pointer"}} onClick={onClose}/>
            
            </DialogActions>
        </Dialog>
    );
}

export default Popup;
