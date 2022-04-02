import {
    Button,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    Dialog,
    Typography,
    CircularProgress,
} from "@material-ui/core";
import { useState } from "react";
import { registerStudent } from "../../utils/student";
import MuiAlert from "@material-ui/lab/Alert";

const initialState = {
    name: "",
    grade: "Class IX",
    institute: "",
    email: "",
    phone: "",
};

const StudentRegister = ({ open, handleClose }) => {
    const [studentDetails, setStudentDetails] = useState(initialState); // Initial state of registration form
    const [loader, setLoader] = useState(false); //Loader, while the student is being registered
    const [error, setError] = useState(null); // If any error occured while registering the student
    const [success, setSuccess] = useState(null); // Set success message if thr student is successfully registered

    // Storing geade selection option for registration form
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

    // Alert for registeration process
    const Alert = (props) => {
        return <MuiAlert {...props} />;
    };

    // handling the change in details of the student
    const handleChange = (event) => {
        setStudentDetails({
            ...studentDetails,
            [`${event.target.name}`]: event.target.value,
        });
    };

    // Handling the registration of student
    const handleRegister = () => {
        registerStudent(studentDetails, setLoader, setError, setSuccess); //Storing student details in database
    };

    return (
        <Dialog
            open={open} // Passes as a prop to the component from app.js
            onClose={handleClose} // // Passes as a prop to the component from app.js
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle
                id="form-dialog-title"
                style={{ background: "#1A2E39" }}
            >
                <Typography
                    variant="h5"
                    style={{ fontWeight: "600", color: "#fff" }}
                >
                    Book Free Trial Now
                </Typography>
            </DialogTitle>
            <DialogContent style={{ padding: "30px", paddingTop: "20px" }}>
                <DialogContentText>
                    <Typography variant="body2">* For Students Only</Typography>
                </DialogContentText>

                {/* Alerts components for displaying success or error message */}
                {error ? <Alert severity="error">{error}</Alert> : ""}
                {success ? <Alert severity="success">{success}</Alert> : ""}

                {/* Registration form fields */}
                <TextField
                    autoFocus
                    margin="dense"
                    name="name"
                    label="Full Name"
                    type="text"
                    value={studentDetails.name}
                    onChange={handleChange}
                    fullWidth
                />

                <TextField
                    margin="dense"
                    name="email"
                    label="Email Address"
                    type="email"
                    value={studentDetails.email}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    name="phone"
                    label="WhatsApp Phone Number"
                    type="number"
                    value={studentDetails.phone}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    select
                    name="grade"
                    placeholder="Select Grade"
                    // value={studentClass}
                    helperText="Please select your grade"
                    SelectProps={{
                        native: true,
                    }}
                    size="small"
                    margin="normal"
                    onChange={handleChange}
                    value={studentDetails.grade}
                    fullWidth
                >
                    {studentClass.map((option, index) => (
                        <option key={index} value={studentClass.value}>
                            {option.label}
                        </option>
                    ))}
                </TextField>
                <TextField
                    margin="dense"
                    name="institute"
                    label="School/Institute Name"
                    type="email"
                    value={studentDetails.institute}
                    onChange={handleChange}
                    fullWidth
                />
            </DialogContent>
            <DialogActions style={{ margin: "20px" }}>
                {/* Button to close the dialog box */}
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                {loader ? (
                    <CircularProgress />
                ) : (
                    // Button to register the student with details
                    <Button
                        onClick={handleRegister}
                        variant="contained"
                        color="primary"
                    >
                        Register
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
};

export default StudentRegister;
