import {
    Box,
    Button,
    CircularProgress,
    Container,
    TextField,
    Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { Fragment, useEffect, useState } from "react";
import AdminNav from "./AdminNav";
import MuiAlert from "@material-ui/lab/Alert";
import { addMentor, deleteMentor, getAllMentors } from "../../utils/mentors";
import { useStateValue } from "../../StateProvider";
import AdminLogin from "./AdminLogin";

const Alert = (props) => {
    return <MuiAlert {...props} />;
};

const useStyles = makeStyles((theme) => ({
    adminMentors: {
        paddingTop: "72px",
        marginTop: "50px",
        marginBottom: "40px",
    },
    mentorHeader: {
        marginBottom: "30px",
    },
    mentorForm: {
        padding: "20px",
        border: "1px solid lightgray",
        marginBottom: "50px",
        "& > small": {
            color: "red",
        },
    },
    mentors: {
        padding: "20px",
        border: "1px solid lightgray",
    },
    mentorList: {
        maxHeight: "70vh",
        overflow: "auto",
    },
    mentor: {
        padding: "20px",
        marginBottom: "10px",
        "& > button": {
            marginTop: "10px",
        },
    },
}));

const mentorInitialDetails = {
    name: "",
    designation: "",
    about: "",
    profile: "",
    instagram: "",
    facebook: "",
    linkedIn: "",
};

const AdminMentors = () => {
    const classes = useStyles();
    const [{ admin }] = useStateValue();
    const [newMentorDetails, setNewMentorDetails] =
        useState(mentorInitialDetails);
    const [newMentorLoader, setNewMentorLoader] = useState(false);
    const [newMentorError, setNewMentorError] = useState(null);
    const [newMentorSuccess, setNewMentorSuccess] = useState(null);

    const [mentors, setMentors] = useState([]);

    const [deleteMentorError, setDeleteMentorError] = useState(null);
    const [deleteMentorSuccess, setDeleteMentorSuccess] = useState(null);

    const handleNewMentorDetails = (event) => {
        setNewMentorDetails({
            ...newMentorDetails,
            [`${event.target.name}`]: event.target.value,
        });
    };

    const handleAddNewMentor = () => {
        addMentor(
            newMentorDetails,
            setNewMentorLoader,
            setNewMentorError,
            setNewMentorSuccess
        );
    };

    const handleDeleteMentor = (id) => {
        if (deleteMentor(id, setDeleteMentorError)) {
            setDeleteMentorSuccess("Mentor Removed");
            setMentors(() => {
                return mentors.filter((mentor) => mentor.id !== id);
            });
        }
    };

    useEffect(() => {
        getAllMentors().then((res) => setMentors(res));
    }, []);

    return admin ? (
        <Fragment>
            <AdminNav />
            <Box className={classes.adminMentors}>
                <Container>
                    <Box className={classes.mentorHeader}>
                        <Typography variant="h5">Mentors</Typography>
                    </Box>
                    <Box component={"form"} className={classes.mentorForm}>
                        <Typography variant="h6">Add Mentor</Typography>
                        <Typography component={"small"} variant="caption">
                            If social media account link not available then
                            enter '#'
                        </Typography>
                        {newMentorError ? (
                            <Alert severity="error">{newMentorError}</Alert>
                        ) : (
                            ""
                        )}
                        {newMentorSuccess ? (
                            <Alert severity="success">{newMentorSuccess}</Alert>
                        ) : (
                            ""
                        )}
                        <TextField
                            name="name"
                            className={classes.textField}
                            placeholder="*Mentor Name"
                            fullWidth
                            size="small"
                            margin="normal"
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            required
                            value={newMentorDetails.name}
                            onChange={handleNewMentorDetails}
                        />
                        <TextField
                            name="designation"
                            className={classes.textField}
                            placeholder="*Mentor designation"
                            fullWidth
                            size="small"
                            margin="normal"
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            required
                            value={newMentorDetails.designation}
                            onChange={handleNewMentorDetails}
                        />
                        <TextField
                            name="about"
                            className={classes.textField}
                            placeholder="About Mentor"
                            fullWidth
                            size="small"
                            margin="normal"
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            required
                            value={newMentorDetails.about}
                            onChange={handleNewMentorDetails}
                        />
                        <TextField
                            name="profile"
                            className={classes.textField}
                            placeholder="*Mentor profile picture url"
                            fullWidth
                            size="small"
                            margin="normal"
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            required
                            value={newMentorDetails.profile}
                            onChange={handleNewMentorDetails}
                        />
                        <TextField
                            name="instagram"
                            className={classes.textField}
                            placeholder="*Mentor instagram account url"
                            fullWidth
                            size="small"
                            margin="normal"
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            required
                            value={newMentorDetails.instagram}
                            onChange={handleNewMentorDetails}
                        />
                        <TextField
                            name="facebook"
                            className={classes.textField}
                            placeholder="*Mentor facebook account url"
                            fullWidth
                            size="small"
                            margin="normal"
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            required
                            value={newMentorDetails.facebook}
                            onChange={handleNewMentorDetails}
                        />
                        <TextField
                            name="linkedIn"
                            className={classes.textField}
                            placeholder="*Mentor linkedIn account url"
                            fullWidth
                            size="small"
                            margin="normal"
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            required
                            value={newMentorDetails.linkedIn}
                            onChange={handleNewMentorDetails}
                        />
                        {newMentorLoader ? (
                            <CircularProgress />
                        ) : (
                            <Button
                                onClick={handleAddNewMentor}
                                variant="contained"
                                color="primary"
                            >
                                Add new Mentor
                            </Button>
                        )}
                    </Box>
                    <Box className={classes.mentors}>
                        <Typography variant="h5">All Mentors</Typography>
                        {deleteMentorError ? (
                            <Alert severity="error">{deleteMentorError}</Alert>
                        ) : (
                            ""
                        )}
                        {deleteMentorSuccess ? (
                            <Alert severity="success">
                                {deleteMentorSuccess}
                            </Alert>
                        ) : (
                            ""
                        )}
                        <Box className={classes.mentorList}>
                            {mentors.map((mentor) => (
                                <Box
                                    key={mentor.id}
                                    boxShadow={2}
                                    className={classes.mentor}
                                >
                                    <Typography variant="body2">
                                        {mentor.name}
                                    </Typography>
                                    <Typography variant="body2">
                                        {mentor.designation}
                                    </Typography>
                                    <Typography variant="body2">
                                        {mentor.about}
                                    </Typography>
                                    <Button
                                        onClick={() =>
                                            handleDeleteMentor(mentor.id)
                                        }
                                        variant="contained"
                                        color="primary"
                                    >
                                        Remove Mentor
                                    </Button>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </Container>
            </Box>
        </Fragment>
    ) : (
        <AdminLogin />
    );
};

export default AdminMentors;
