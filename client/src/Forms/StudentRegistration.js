import {
    Box,
    Button,
    CircularProgress,
    TextField,
    Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { registerStudent } from "../utils/student";
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
    grade: "Class IX",
    institute: "",
    email: "",
    phone: "",
};

const StudentRegistration = () => {
    const classes = useStyles();

    // Hooks for handling student registration for demo session
    const [studentDetails, setStudentDetails] = useState(initialStudentState); // Storing the student's details
    const [studentRegisterError, setStudentRegisterError] = useState(null); // If an error occured while registering the student
    const [studentRegisterSuccess, setStudentRegisterSuccess] = useState(null); // If student registration was successfull
    const [studentLoader, setStudentLoader] = useState(false); // Loader if the student details are still loading

    // Options list for student class selecction drop down list
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

    // Handle student details change
    const handleStudentDetails = (event) => {
        setStudentDetails({
            ...studentDetails,
            [`${event.target.name}`]: event.target.value,
        });
    };

    // Handle student registration
    const handleStudentSubmtRequset = () => {
        registerStudent(
            studentDetails,
            setStudentLoader,
            setStudentRegisterError,
            setStudentRegisterSuccess
        );
    };

    return (
        <Box className={classes.contactStudents}>
            <Typography component={"h5"} variant={"h5"}>
                FOR STUDENTS
            </Typography>
            <Typography component={"h6"} variant="h5">
                Book a FREE online demo session for youself.
            </Typography>
            <Typography variant="body1" component={"p"}>
                Share your details here!
            </Typography>
            <Typography variant="caption" component={"small"}>
                Required fields are marked *
            </Typography>
            {studentRegisterError ? (
                <Alert severity="error">{studentRegisterError}</Alert>
            ) : (
                ""
            )}
            {studentRegisterSuccess ? (
                <Alert severity="success">{studentRegisterSuccess}</Alert>
            ) : (
                ""
            )}
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
                    placeholder="* WhatsApp Phone Number"
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
                    name="grade"
                    select
                    placeholder="* Select Grade"
                    value={studentDetails.grade}
                    helperText="* Please select your current grade"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    SelectProps={{
                        native: true,
                    }}
                    size="small"
                    margin="normal"
                    variant="outlined"
                    fullWidth
                    onChange={handleStudentDetails}
                >
                    {studentClass.map((option, index) => (
                        <option key={index} value={studentClass.value}>
                            {option.label}
                        </option>
                    ))}
                </TextField>
                <TextField
                    name="institute"
                    className={classes.textField}
                    placeholder="* School/Institute Name"
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
                {studentLoader ? (
                    <CircularProgress />
                ) : (
                    <Button
                        onClick={handleStudentSubmtRequset}
                        style={{ marginTop: "15px" }}
                        variant="contained"
                        color="primary"
                        width="100%"
                    >
                        Submit Request
                    </Button>
                )}
            </Box>
        </Box>
    );
};

export default StudentRegistration;
