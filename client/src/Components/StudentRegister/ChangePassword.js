import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, CircularProgress, DialogActions, DialogContent, DialogContentText, TextField, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { changePassword } from '../../utils/student_update';

const initialPassword = {
    newPassword: "",
    confirmPassword: ""
}

const ChangePassword = (props) => {
    const { open, handleClose, studentToken } = props;
    const [password, setPassword] = useState(initialPassword);
    const [error, setError] = useState(null);
    const [loader, setLoader] = useState(false);
    const [success, setSuccess] = useState(null);

    const handleChange = (e) => {
        setPassword({ ...password, [e.target.name]: e.target.value });
    }
    const handleStudentSubmtRequset = () => {
        changePassword(
            password,
            setLoader, setError, setSuccess, handleClose, studentToken);
    };
    return (
        <Dialog open={open} onClose={handleClose}>

            <DialogTitle>Change Password</DialogTitle>
            {error ? <Alert severity="error">{error}</Alert> : ""}
            {success ? <Alert severity="success">{success}</Alert> : ""}
            <DialogContent>
                <DialogContentText>
                    Required fields are marked *
                </DialogContentText>
                <Box component={"form"}>
                    <TextField
                        autoFocus
                        name="newPassword"
                        margin="dense"
                        id="password"
                        placeholder="* New Password (Minimum 7 characters)"
                        type="password"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                    />
                    <TextField
                        autoFocus
                        name="confirmPassword"
                        margin="dense"
                        id="password"
                        placeholder="* Confirm Password"
                        type="password"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                {loader ? (
                    <CircularProgress />
                ) :
                    <Button onClick={handleStudentSubmtRequset}>Submit</Button>}
            </DialogActions>
        </Dialog>
    )
}

export default ChangePassword