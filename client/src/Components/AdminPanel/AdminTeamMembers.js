import {
    Box,
    Button,
    CircularProgress,
    Container,
    TextField,
    Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { Fragment, useState } from "react";
import { addSquadMember, deleteSquadMember } from "../../utils/squadMember";
import MuiAlert from "@material-ui/lab/Alert";
import { useStateValue } from "../../StateProvider";
import AdminLogin from "./AdminLogin";
import AdminNav from "./AdminNav";

const Alert = (props) => {
    return <MuiAlert {...props} />;
};

const useStyles = makeStyles((theme) => ({
    adminTeamMembers: {
        paddingTop: "72px",
        marginTop: "50px",
        marginBottom: "40px",
    },
    memberHeader: {
        marginBottom: "30px",
    },
    memberForm: {
        padding: "20px",
        border: "1px solid lightgray",
        marginBottom: "50px",
        "& > small": {
            color: "red",
        },
    },
    members: {
        padding: "20px",
        border: "1px solid lightgray",
    },
    memberList: {
        maxHeight: "70vh",
        overflow: "auto",
    },
    member: {
        padding: "20px",
        marginBottom: "10px",
        "& > button": {
            marginTop: "10px",
        },
    },
}));

const memberInitialDetails = {
    name: "",
    designation: "",
    profile: "",
    instagram: "",
    facebook: "",
    linkedIn: "",
};

const AdminTeamMembers = () => {
    const classes = useStyles();
    const [{ admin }] = useStateValue();
    const [newMemberDetails, setNewMemberDetails] =
        useState(memberInitialDetails);
    const [newMemberLoader, setNewMemberLoader] = useState(false);
    const [newMemberError, setNewMemberError] = useState(null);
    const [newMemberSuccess, setNewMemberSuccess] = useState(null);

    const [members, setMembers] = useState([]);

    const [deleteMemberError, setDeleteMemberError] = useState(null);
    const [deleteMemberSuccess, setDeleteMemberSuccess] = useState(null);

    const handleNewMemberDetails = (event) => {
        setNewMemberDetails({
            ...newMemberDetails,
            [`${event.target.name}`]: event.target.value,
        });
    };

    const handleAddNewMember = () => {
        addSquadMember(
            newMemberDetails,
            setNewMemberLoader,
            setNewMemberError,
            setNewMemberSuccess
        );
    };

    const handleDeleteMember = (id) => {
        if (deleteSquadMember(id, setDeleteMemberError)) {
            setDeleteMemberSuccess("Mentor Removed");
            setMembers(() => {
                return members.filter((mentor) => mentor.id !== id);
            });
        }
    };

    return admin ? (
        <Fragment>
            <AdminNav />
            <Box className={classes.adminTeamMembers}>
                <Container>
                    <Box className={classes.memberHeader}>
                        <Typography variant="h5">Team Members</Typography>
                    </Box>
                    <Box component={"form"} className={classes.memberForm}>
                        <Typography variant="h6">Add Team Member</Typography>
                        <Typography component={"small"} variant="caption">
                            If social media account link not available then
                            enter '#'
                        </Typography>
                        {newMemberError ? (
                            <Alert severity="error">{newMemberError}</Alert>
                        ) : (
                            ""
                        )}
                        {newMemberSuccess ? (
                            <Alert severity="success">{newMemberSuccess}</Alert>
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
                            value={newMemberDetails.name}
                            onChange={handleNewMemberDetails}
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
                            value={newMemberDetails.designation}
                            onChange={handleNewMemberDetails}
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
                            value={newMemberDetails.profile}
                            onChange={handleNewMemberDetails}
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
                            value={newMemberDetails.instagram}
                            onChange={handleNewMemberDetails}
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
                            value={newMemberDetails.facebook}
                            onChange={handleNewMemberDetails}
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
                            value={newMemberDetails.linkedIn}
                            onChange={handleNewMemberDetails}
                        />
                        {newMemberLoader ? (
                            <CircularProgress />
                        ) : (
                            <Button
                                onClick={handleAddNewMember}
                                variant="contained"
                                color="primary"
                            >
                                Add new Squad Member
                            </Button>
                        )}
                    </Box>
                    <Box className={classes.members}>
                        <Typography variant="h5">All team Members</Typography>
                        {deleteMemberError ? (
                            <Alert severity="error">{deleteMemberError}</Alert>
                        ) : (
                            ""
                        )}
                        {deleteMemberSuccess ? (
                            <Alert severity="success">
                                {deleteMemberSuccess}
                            </Alert>
                        ) : (
                            ""
                        )}
                        <Box className={classes.memberList}>
                            {members.map((member) => (
                                <Box
                                    key={member.id}
                                    boxShadow={2}
                                    className={classes.member}
                                >
                                    <Typography variant="body2">
                                        {member.name}
                                    </Typography>
                                    <Typography variant="body2">
                                        {member.designation}
                                    </Typography>
                                    <Button
                                        onClick={() =>
                                            handleDeleteMember(member.id)
                                        }
                                        variant="contained"
                                        color="primary"
                                    >
                                        Remove Squad Member
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

export default AdminTeamMembers;
