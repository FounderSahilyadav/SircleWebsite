import {
    Box,
    Button,
    CircularProgress,
    TextField,
    DialogActions,
    DialogContent,
    Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { signUpStudent } from "../utils/student";
import { makeStyles } from "@material-ui/core/styles";
import MuiAlert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
    contactStudents: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        padding: "50px 30px",
        borderRight: "1px solid lightgray",
        "& > h5": {
            color: "#000",
            textAlign: "center",
            fontWeight: "600",
            marginBottom: "20px",
        },
        "& > h6": {
            marginBottom: "10px",
            fontWeight: "500",
        },
        "& > p": {
            color: "lightgray",
            fontStyle: "italic",
            marginBottom: "5px",
        },
        "& > small": {
            color: "red",
        },
        [theme.breakpoints.down(700)]: {
            border: "none",
            borderTop: "1px solid lightgray",
        },
    },
}));
const Alert = (props) => {
    return <MuiAlert {...props} />;
};

const initialStudentState = {
    name: "",
    grade: "none",
    institute: "none",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
};


export default function StudentSignIn({ handleClose, setStudentToken }) {
    const classes = useStyles();
    // Hooks for handling student registration for demo session
    const [studentDetails, setStudentDetails] = useState(initialStudentState); // Storing the student's details
    const [loader, setLoader] = useState(false); //Loader, while the student is being registered
    const [error, setError] = useState(null); // If any error occured while registering the student
    const [success, setSuccess] = useState(null); // Set success message if thr student is successfully registered

    const handleStudentDetails = (event) => {
        setStudentDetails({
            ...studentDetails,
            [`${event.target.name}`]: event.target.value,
        });
    };
    const handleStudentSubmtRequset = () => {
        signUpStudent(
            studentDetails,
            setLoader, setError, setSuccess, setStudentToken, handleClose);
    };

    return (
        <DialogContent >
            <Typography variant="body1" component={"p"}>
                Share your details here!
            </Typography>
            <Typography variant="caption" component={"small"}>
                Required fields are marked *
            </Typography>
            {error ? <Alert severity="error">{error}</Alert> : ""}
            {success ? <Alert severity="success">{success}</Alert> : ""}

            <Box component={"form"}>
                <TextField
                    name="name"
                    className={classes.textField}
                    placeholder="* Full Name"
                    fullWidth
                    size="small"
                    margin="normal"
                    variant="outlined"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    required
                    value={studentDetails.name}
                    onChange={handleStudentDetails}
                />
                <TextField
                    name="email"
                    type="email"
                    className={classes.textField}
                    placeholder="* Email Address"
                    fullWidth
                    size="small"
                    margin="normal"
                    variant="outlined"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={studentDetails.email}
                    onChange={handleStudentDetails}
                />
                <TextField
                    name="phone"
                    className={classes.textField}
                    placeholder="* Phone Number"
                    type={"number"}
                    fullWidth
                    size="small"
                    margin="normal"
                    variant="outlined"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={studentDetails.phone}
                    onChange={handleStudentDetails}
                />
                <TextField
                    name="institute"
                    className={classes.textField}
                    placeholder="School/Institute Name"
                    fullWidth
                    size="small"
                    margin="normal"
                    variant="outlined"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={studentDetails.institute}
                    onChange={handleStudentDetails}
                />
                <TextField
                    name="password"
                    type="password"
                    className={classes.textField}
                    placeholder="* Enter Password (Minimum 7 characters)"
                    fullWidth
                    size="small"
                    margin="normal"
                    variant="outlined"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={studentDetails.password}
                    onChange={handleStudentDetails}
                />
                <TextField
                    name="confirmPassword"
                    type="password"
                    className={classes.textField}
                    placeholder="* Confirm Password"
                    fullWidth
                    size="small"
                    margin="normal"
                    variant="outlined"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={studentDetails.confirmPassword}
                    onChange={handleStudentDetails}
                />
            </Box>
            <DialogActions>
                <Button onClick={handleClose} color="primary" style={{ marginTop: "15px" }}>
                    Cancel
                </Button>
                {loader ? (
                    <CircularProgress />
                ) : (
                    <Button
                        onClick={handleStudentSubmtRequset}
                        style={{ marginTop: "15px" }}
                        variant="contained"
                        color="primary"
                        width="100%"
                    >
                        Sign Up
                    </Button>
                )}</DialogActions>
        </DialogContent>
    );
};

// import React from 'react';
// import FormControl from '@mui/material/FormControl';

// export default function StudentSignUp() {
//     return (
//         <div>StudentSignUp
//             <FormControl>
//                 <label htmlFor="my-input">Email address</label>
//                 <input id="my-input" aria-describedby="my-helper-text" />
//             </FormControl>
//         </div>
//     )
// }

