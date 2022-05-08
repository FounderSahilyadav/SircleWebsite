import React, { useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, CircularProgress, DialogActions, DialogContent, DialogContentText, TextField, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { resetPassword } from '../../utils/student_update';
import { sendOtp } from '../../utils/student';


const ResetPassword = (props) => {
    const { open, handleClose, handleOpenPassword } = props;
    const [phone, setPhone] = useState(null);
    const [otp, setOtp] = useState(null);
    const [error, setError] = useState(null);
    const [loader, setLoader] = useState(false);
    const [success, setSuccess] = useState(null);

    const handleChange = (e) => {
        if (e.target.name === 'phone') {
            setPhone(e.target.value);
        }
        if (e.target.name === 'otp') {
            setOtp(e.target.value);
        }
    }
    const handleStudentSubmtRequset = () => {
        console.log('phone', phone);
        console.log('otp', otp);
        resetPassword(
            phone, otp,
            setLoader, setError, setSuccess, handleClose, handleOpenPassword);
    };
    const handleOtp = () => {
        sendOtp({ phone },
            setLoader, setError, setSuccess);
    }
    return ( <
        Dialog open = { open }
        onClose = { handleClose } >

        <
        DialogTitle > Reset Password < /DialogTitle> {
        error ? < Alert severity = "error" > { error } < /Alert> : ""} {
        success ? < Alert severity = "success" > { success } < /Alert> : ""} <
        DialogContent >
        <
        DialogContentText >
        Required fields are marked *
        <
        /DialogContentText> <
        Box component = { "form" } >
        <
        TextField autoFocus name = "phone"
        margin = "dense"
        id = "phone"
        placeholder = "* Phone Number"
        type = "NUMBER"
        fullWidth variant = "outlined"
        onChange = { handleChange }
        /> <
        Typography style = {
            { color: "blue", cursor: "pointer" }
        }
        variant = "caption"
        component = { "small" } >
        <
        span onClick = { handleOtp } > Send OTP * < /span> < /
        Typography > <
        TextField autoFocus name = "otp"
        margin = "dense"
        id = "OTP"
        placeholder = "* OTP"
        type = "text"
        fullWidth variant = "outlined"
        onChange = { handleChange }
        /> < /
        Box > <
        /DialogContent> <
        DialogActions style = {
            { marginRight: "20px", marginBottom: "20px" }
        } >
        <
        Button onClick = { handleClose } > Cancel < /Button> {
        loader ? ( <
            CircularProgress / >
        ) :
        <
        Button variant = "contained"
        color = "primary"
        onClick = { handleStudentSubmtRequset } > Submit < /Button>} < /
        DialogActions > <
        /Dialog>
    )
}

export default ResetPassword;