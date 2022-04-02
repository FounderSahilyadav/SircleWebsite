import {
    Box,
    Button,
    CircularProgress,
    TextField,
    Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MuiAlert from "@material-ui/lab/Alert";
import { sendInstituteQuery } from "../utils/institute";

const useStyles = makeStyles((theme) => ({
    contactOrganisation: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        padding: "50px 30px",
        borderLeft: "1px solid lightgray",
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
    },
}));

const Alert = (props) => {
    return <MuiAlert {...props} />;
};

const instituteInitialState = {
    name: "",
    email: "",
    phone: "",
    query: "",
};

const InstituteQuery = () => {
    const classes = useStyles();

    // Hooks for handling institute query handling
    const [instituteDetails, setInstituteDetails] = useState(
        instituteInitialState
    ); // Storing the details of the query
    const [instituteLoader, setInsituteLoader] = useState(false); // Loader for the institute query submission
    const [instituteQueryError, setInstituteQueryError] = useState(null); // If an error occured while submitting the query
    const [instituteQuerySuccess, setInstituteQuerySuccess] = useState(null); // If query was successfully submitted

    //Handle institute query changes
    const handleInstituteDetails = (event) => {
        setInstituteDetails({
            ...instituteDetails,
            [`${event.target.name}`]: event.target.value,
        });
    };

    // Handle institute query submission
    const handleInstituteQueryRequest = () => {
        sendInstituteQuery(
            instituteDetails,
            setInsituteLoader,
            setInstituteQueryError,
            setInstituteQuerySuccess
        );
    };

    return (
        <Box className={classes.contactOrganisation}>
            <Typography component={"h5"} variant={"h5"}>
                FOR ORGANISATIONS
            </Typography>
            <Typography component={"h6"} variant="h5">
                Get In Touch
            </Typography>
            <Typography variant="body1" component={"p"}>
                Feel free to drop us a line below!
            </Typography>
            <Typography variant="caption" component={"small"}>
                Required fields are marked *
            </Typography>

            {/* Alerts for query submission, error or success */}
            {instituteQueryError ? (
                <Alert severity="error">{instituteQueryError}</Alert>
            ) : (
                ""
            )}
            {instituteQuerySuccess ? (
                <Alert severity="success">{instituteQuerySuccess}</Alert>
            ) : (
                ""
            )}

            {/* Query form */}
            <Box component={"form"}>
                <TextField
                    name="name"
                    className={classes.textField}
                    placeholder="* Organisation's Name"
                    fullWidth
                    size="small"
                    margin="normal"
                    variant="outlined"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={instituteDetails.name}
                    onChange={handleInstituteDetails}
                />
                <TextField
                    name="email"
                    className={classes.textField}
                    placeholder="* Organisation's Email"
                    fullWidth
                    size="small"
                    margin="normal"
                    variant="outlined"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={instituteDetails.email}
                    onChange={handleInstituteDetails}
                />
                <TextField
                    name="phone"
                    className={classes.textField}
                    placeholder="Organisation's Phone Number"
                    type={"number"}
                    fullWidth
                    size="small"
                    margin="normal"
                    variant="outlined"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={instituteDetails.phone}
                    onChange={handleInstituteDetails}
                />
                <TextField
                    name="query"
                    className={classes.textField}
                    placeholder="* Mention your query"
                    type={"text"}
                    fullWidth
                    multiline
                    minRows={4}
                    margin="normal"
                    variant="outlined"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={instituteDetails.query}
                    onChange={handleInstituteDetails}
                />
                {instituteLoader ? (
                    <CircularProgress />
                ) : (
                    <Button
                        onClick={handleInstituteQueryRequest}
                        style={{ marginTop: "15px" }}
                        variant="contained"
                        color="primary"
                        width="100%"
                    >
                        Send Message
                    </Button>
                )}
            </Box>
        </Box>
    );
};

export default InstituteQuery;
