import React, { useEffect, useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Button from '@mui/material/Button';
import userLogo from '../../assets/profile_logo.png';
import MuiAlert from "@material-ui/lab/Alert";
import { CircularProgress } from '@material-ui/core';
import { changeEducation, changeEmail, changePhone } from '../../utils/student_update'
import { TextField } from '@material-ui/core';
import { sendOtp } from '../../utils/student';
const useStyles = makeStyles((theme) => ({
    app: {
        margin: '0',
        marginTop: '10px',
        paddingLeft: '30px',
        paddingRight: '30px',
        paddingTop: "100px",
        fontSize: "20px",
        background: "rgba(24,169,226,0.1)",
        fontFamily: "Roboto",
        [theme.breakpoints.down("md")]: {
            fontSize: "14px",
        },
    },
    userLogo: {
        height: "150px",
        filter: "drop-shadow(5px 5px 5px #000)",
        [theme.breakpoints.down('600')]: {
            height: "100px",
        }
    },
    ml: {
        marginLeft: "20px",
    },
    pad: {
        padding: "5px",
        marginRight: "20px",
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
    },
    education: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '20px',
        [theme.breakpoints.down('600')]: {
            display: 'block',
        }
    },
    inp: {
        width: '25%',
        minWidth: '150px',
        marginTop: '10px',
        marginBottom: '10px',
        fontSize: '20px',
        height: '30px',
        borderRadius: '5px',
        border: '1px solid #18A9E2',
        [theme.breakpoints.down('600')]: {
            marginBottom: '5px',
            fontSize: '14px',
            marginTop: '5px',
        }
    }

}));
const Alert = (props) => {
    return <MuiAlert {...props}
    />;
};

const studentClass = [
    { value: "Class IX", label: "Class IX" },
    { value: "Class X", label: "Class X" },
    { value: "Class XI Science", label: "Class XI Science" },
    { value: "Class XI Commerce", label: "Class XI Commerce" },
    { value: "Class XI Humanities", label: "Class XI Humanities" },
    { value: "Class XII Science", label: "Class XII Science" },
    { value: "Class XII Commerce", label: "Class XII Commerce" },
    { value: "Class XII Humanities", label: "Class XII Humanities" },
];

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

    // For Education
    // const [updateEducation, setUpdateEducation] = useState(false);
    const [institute, setInstitute] = useState(studentData.institute);
    const [grade, setGrade] = useState(studentData.grade);
    const [board, setBoard] = useState(studentData.board);
    const [year, setYear] = useState(studentData.year);
    const [newInstitute, setNewInstitute] = useState(institute);
    const [newGrade, setNewGrade] = useState(grade);
    const [newBoard, setNewBoard] = useState(board);
    const [newYear, setNewYear] = useState(year);
    const [openIntitute, setOpenIntitute] = useState(false);
    const [openGrade, setOpenGrade] = useState(false);
    const [openBoard, setOpenBoard] = useState(false);
    const [openYear, setOpenYear] = useState(false);


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

    // For Education Update function
    // const handleEducationClose = () => {
    //     setUpdateEducation(false);
    // }

    const handleopenGrade = () => {
        setOpenGrade(true);
    }
    const handleopenBoard = () => {
        setOpenBoard(true);
    }
    const handleopenYear = () => {
        setOpenYear(true);
    }
    const handleopenIntitute = () => {
        setOpenIntitute(true);
    }
    const handlecloseGrade = () => {
        setOpenGrade(false);
    }
    const handlecloseBoard = () => {
        setOpenBoard(false);
    }
    const handlecloseYear = () => {
        setOpenYear(false);
    }
    const handlecloseIntitute = () => {
        setOpenIntitute(false);
    }
    const handleEducationChange = (e) => {
        if (e.target.name === 'institute') {
            setNewInstitute(e.target.value);
        }
        if (e.target.name === 'grade') {
            setNewGrade(e.target.value);
        }
        if (e.target.name === 'board') {
            setNewBoard(e.target.value);
        }

        if (e.target.name === 'year') {
            setNewYear(e.target.value);
        }
    }
    // const handleEudcationUpdate = () => {
    //     console.log('update education');
    //     setUpdateEducation(true);
    // }
    // const handleInstituteChange = (e) => {
    //     setNewInstitute(e.target.value);
    // }
    // const handleGradeChange = (e) => {
    //     setNewGrade(e.target.value);
    // }
    const handleEducationUpdateSubmit = async () => {
        console.log(newInstitute);
        await changeEducation(newInstitute, newGrade, newBoard, newYear, setLoader, setError, setSuccess, studentToken,
            setInstitute, setGrade, setBoard, setYear);
        handlecloseYear();
        handlecloseGrade();
        handlecloseBoard();
        handlecloseIntitute();

    }

    useEffect(() => {
        setTimeout(() => {
            setError(null);
            setSuccess(null);
        }, 5000);
    }, [error, success]);
    return (
        <div className='myprofile'>
            <div className={classes.app} >
                {studentToken === "" ? <h1> Please Login </h1> :
                    <div>
                        <div className={classes.alert}>
                            {error ? < Alert severity="error" > {error} </Alert> : ""}
                            {success ? < Alert severity="success" > {success} </Alert> : ""} </div >
                        <h2> My Profile </h2>
                        <div> < img className={classes.userLogo}
                            src={userLogo}
                            alt="User" />
                            <p> <b> Name : </b> {studentData.name}</p>
                        </div>

                        { /* Email */}
                        <p> <b> Your Email </b>: {email}<Button style={{ marginLeft: '10px' }} variant="outlined" onClick={handleUpdateEmail}>Change Email</Button > </p>
                        {updateEmail ? (<>
                            <input typeof='email'
                                value={newEmail}
                                onChange={handleEmailChange}
                                className={classes.inp}
                                placeholder='Enter Email' /> {
                                loader ? (<
                                    CircularProgress />
                                ) : (<Button style={
                                    { marginLeft: '10px' }
                                }
                                    variant="outlined"
                                    onClick={handleUpdateEmailSubmit} > Update Email </Button>)}\
                            <Button className={classes.button}
                                variant="outlined"
                                onClick={handleClose} > Cancel </Button>
                        </>) : null
                        }

                        { /* Phone */}
                        <p ><b> Your Phone Number </b>: {phone}
                            <Button style={{ marginLeft: '10px' }} variant="outlined"
                                onClick={handleUpdatePhone} > Change Phone </Button></p > {
                            updatePhone ? (<> < input typeof='number'
                                value={newPhone}
                                onChange={handlePhoneChange}
                                className={classes.inp}
                                placeholder="Enter Phone" /> <span className={classes.otp}
                                    onClick={handleSendOtp} > Send OTP </span><br />
                                <input typeof='number'
                                    value={otp}
                                    onChange={handleOtpChange}
                                    className={classes.inp}
                                    placeholder="Enter Otp" /> {
                                    loader ? (
                                        <CircularProgress style={
                                            { marginLeft: '20px' }
                                        } />
                                    ) : (<Button style={
                                        { marginLeft: '10px' }
                                    }
                                        variant="outlined"
                                        onClick={handleUpdatePhoneSubmit} > Update Phone </Button>)}
                                <Button style={
                                    { marginLeft: '10px' }
                                }
                                    variant="outlined"
                                    onClick={handlePhoneClose} > Cancel
                                </Button> </>) : null
                        }
                        <hr />
                        { /* Intitute Details */}
                        <h3 > Education Details </h3>
                        <div className={classes.education} >
                            <div>
                                <p><b> Institute </b>: {institute}
                                    <Button style={{ marginLeft: '10px' }} variant="outlined" onClick={handleopenIntitute}>Change Institute</Button > </p> {
                                    openIntitute ? (
                                        <>
                                            <input typeof='text'
                                                name='institute'
                                                value={newInstitute}
                                                onChange={handleEducationChange}
                                                className={classes.inp}
                                                placeholder="Enter Institute" />
                                            <Button style={
                                                { marginLeft: '10px' }
                                            }
                                                variant="outlined"
                                                onClick={handlecloseIntitute} > Cancel </Button>
                                        </>) : null
                                } <p style={{ margin: "5px 0px" }}> <b> Grade </b>: {grade}
                                    <Button style={{ marginLeft: '10px' }} variant="outlined" onClick={handleopenGrade}>Change Grade</Button > </p> \
                                {openGrade ? (<>
                                    <TextField style={
                                        { width: "50%" }
                                    }
                                        select name="grade"
                                        placeholder="* Select Grade"
                                        // value={studentClass}
                                        helperText="Please select your grade"
                                        SelectProps={
                                            {
                                                native: true,
                                            }
                                        }
                                        size="small"
                                        margin="normal"
                                        onChange={handleEducationChange}
                                        value={newGrade}
                                        fullWidth > {
                                            studentClass.map((option, index) => (<option key={index}
                                                value={studentClass.value} > {option.label} </option>
                                            ))
                                        } </TextField>
                                    <Button style={
                                        { marginLeft: '10px' }
                                    }
                                        variant="outlined"
                                        onClick={handlecloseGrade} > Cancel </Button> </>) : null
                                }

                            </div>
                            <div>
                                <p> <b> Board </b>: {board}
                                    <Button style={{ marginLeft: '10px' }} variant="outlined" onClick={handleopenBoard}>Change Board</Button > </p>
                                {openBoard ? (<>

                                    <input typeof='text'
                                        name='board'
                                        value={newBoard}
                                        onChange={handleEducationChange}
                                        className={classes.inp}
                                        placeholder="Enter Board" />
                                    <Button style={
                                        { marginLeft: '10px' }
                                    }
                                        variant="outlined"
                                        onClick={handlecloseBoard} > Cancel </Button>
                                </>) : null
                                } <p> <b> Year of Passing </b>: {year}
                                    <Button style={{ marginLeft: '10px' }} variant="outlined" onClick={handleopenYear}>Change Year</Button > </p>
                                {openYear ? (<>
                                    <
                                        input typeof='number'
                                        name='year'
                                        value={newYear}
                                        onChange={handleEducationChange}
                                        className={classes.inp}
                                        placeholder="Enter Year" />
                                    <Button style={
                                        { marginLeft: '10px', marginBottom: '10px' }
                                    }
                                        variant="outlined"
                                        onClick={handlecloseYear} > Cancel </Button> </>) : null
                                }
                            </div>

                        </div> {
                            loader ? (<CircularProgress style={
                                { marginLeft: '10px' }
                            }
                            />
                            ) : (<Button variant="outlined"
                                onClick={handleEducationUpdateSubmit} > Update Education </Button>)}

                    </div>
                }
                <hr />
            </div >
        </div >
    )
}

export default StudentProfile;