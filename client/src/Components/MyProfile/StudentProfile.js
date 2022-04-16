import React, { useEffect, useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Button from '@mui/material/Button';
import userLogo from '../../assets/user_logo.png';
import MuiAlert from "@material-ui/lab/Alert";
import { CircularProgress } from '@material-ui/core';
import { changeEmail, changePhone } from '../../utils/student_update'
import { sendOtp } from '../../utils/student';
const useStyles = makeStyles((theme) => ({
    app: {
        marginTop: "100px",
        fontSize: "20px",
        margin: "5px",
    },
    userLogo: {
        height: "300px",
        filter: "drop-shadow(5px 5px 5px #000)",
    },
    ml: {
        marginLeft: "20px",
    },
    pad: {
        padding: "5px",
    },
    alert: {
        position: 'fixed',
        top: '0px',
        left: '0px',
        width: '100%',
        zIndex: '1',
        marginTop: '70px',
    },
    otp: {
        color: 'blue',
        fontSize: '15px',
        marginLeft: '10px',
        cursor: 'pointer',
    }
}));
const Alert = (props) => {
    return <MuiAlert {...props} />;
};

const StudentProfile = (props) => {
    const classes = useStyles();
    const { studentToken, studentData } = props;
    console.log(studentToken);
    // For email update
    const [updateEmail, setUpdateEmail] = useState(false);
    const [email, setEmail] = useState(studentData.email);
    const [newEmail, setNewEmail] = useState('');

    // For Phone update
    const [updatePhone, setUpdatePhone] = useState(false);
    const [phone, setPhone] = useState(studentData.phone);
    const [newPhone, setNewPhone] = useState('');
    const [otp, setOtp] = useState('');

    // Alerts and Loaders
    const [loader, setLoader] = useState(false); //Loader, while the student is being registered
    const [error, setError] = useState(null); // If any error occured while registering the student
    const [success, setSuccess] = useState(null); // Set success message if thr student is successfully registered

    // For Email Update function
    const handleUpdateEmail = () => {
        console.log('update email');
        setUpdateEmail(true);
    }
    const handleClose = () => {
        setUpdateEmail(false);
    }
    const handleEmailChange = (e) => {
        setNewEmail(e.target.value);
    }
    const handleUpdateEmailSubmit = () => {
        console.log(newEmail);
        changeEmail(newEmail, setLoader, setError, setSuccess, handleClose, studentToken, setEmail);
    }

    // For Phone Update function
    const handlePhoneClose = () => {
        setUpdatePhone(false);
    }

    const handleUpdatePhone = () => {
        console.log('update phone');
        setUpdatePhone(true);
    }
    const handlePhoneChange = (e) => {
        setNewPhone(e.target.value);
    }
    const handleOtpChange = (e) => {
        setOtp(e.target.value);
    }
    const handleUpdatePhoneSubmit = () => {
        console.log(newPhone);
        changePhone(newPhone, otp, setLoader, setError, setSuccess, handlePhoneClose, studentToken, setPhone);
    }

    const handleSendOtp = () => {
        console.log('send otp');
        sendOtp({ phone: newPhone }, setLoader, setError, setSuccess);
    }

    useEffect(() => {
        setTimeout(() => {
            setError(null);
            setSuccess(null);
        }, 2000);
    }, [error, success]);
    return (
        <div className={classes.app}>
            {studentToken === "" ? <h1>Please Login</h1> :
                <div>
                    <div className={classes.alert}>
                        {error ? <Alert severity="error">{error}</Alert> : ""}
                        {success ? <Alert severity="success">{success}</Alert> : ""}
                    </div>
                    <h3>My Profile</h3>
                    <p><img className={classes.userLogo} src={userLogo} alt="User" />  {studentData.name}</p>
                    <p >Your Email: {email}<Button style={{ marginLeft: '20px' }} variant="outlined" onClick={handleUpdateEmail}>Change Email</Button></p>
                    {updateEmail ? (<><input typeof='email' value={newEmail} onChange={handleEmailChange} className={classes.pad} />
                        <input typeof='number' value={otp} onChange={handleOtpChange} className={classes.pad} placeholder="Enter Email" />
                        {loader ? (
                            <CircularProgress />
                        ) : (
                            <Button style={{ marginLeft: '20px' }} variant="outlined" onClick={handleUpdateEmailSubmit}>Update Email</Button>)}
                        <Button style={{ marginLeft: '20px' }} variant="outlined" onClick={handleClose}>Cancel</Button>
                    </>) : null}
                    <p>Your Phone Number: {phone}<Button style={{ marginLeft: '20px' }} variant="outlined"
                        onClick={handleUpdatePhone}>Change Phone</Button></p>
                    {updatePhone ? (<><input typeof='number' value={newPhone} onChange={handlePhoneChange} className={classes.pad} placeholder="Enter Phone" /> <span className={classes.otp} onClick={handleSendOtp}>Send OTP</span><br />
                        <input typeof='number' value={otp} onChange={handleOtpChange} className={classes.pad} placeholder="Enter Otp" />
                        {loader ? (
                            <CircularProgress style={{ marginLeft: '20px' }} />
                        ) : (
                            <Button style={{ marginLeft: '20px' }} variant="outlined" onClick={handleUpdatePhoneSubmit}>Update Phone</Button>)}
                        <Button style={{ marginLeft: '20px' }} variant="outlined" onClick={handlePhoneClose}>Cancel</Button>
                    </>) : null}
                    <h3>Your Grade: {studentData.grade}</h3>
                    <h3>Your Institute: {studentData.institute}</h3>
                </div>
            }
        </div >
    )
}

export default StudentProfile;