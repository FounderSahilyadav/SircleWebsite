import {
    Box,
    Button,
    CircularProgress,
    DialogActions,
    DialogContent,
    TextField,
    Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { loginStudent } from "../utils/student";
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
    email: "",
    password: ""
};


export default function StudentSignIn({ handleClose, setStudentToken, studentToken }) {
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
        loginStudent(
            studentDetails,
            setLoader, setError, setSuccess, setStudentToken, handleClose, studentToken);
    };

    const handleResetPassword = () => {
        console.log("Reset Password");
        handleClose();
    };

    return (
        <DialogContent>
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
                    name="email"
                    type="email"
                    className={classes.textField}
                    placeholder="* Phone Number or Email Address"
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
            </Box>
            <Button onClick={handleResetPassword} color="primary" style={{ fontSize: '12px' }}>
                Forgot password?
            </Button>
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
                        Sign In
                    </Button>
                )}

            </DialogActions>
        </DialogContent>
    );
};