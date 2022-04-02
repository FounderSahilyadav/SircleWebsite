import {
    Box,
    Button,
    CircularProgress,
    Container,
    TextField,
    Typography,
} from "@material-ui/core";
import React, { Fragment, useEffect, useState } from "react";
import AdminNav from "./AdminNav";
import { makeStyles } from "@material-ui/core/styles";
import MuiAlert from "@material-ui/lab/Alert";
import {
    deleteTestimonial,
    getAllTestimonial,
    uploadTestimonial,
} from "../../utils/testimonials";
import { useStateValue } from "../../StateProvider";
import AdminLogin from "./AdminLogin";

const Alert = (props) => {
    return <MuiAlert {...props} />;
};

const useStyles = makeStyles((theme) => ({
    adminTestimonials: {
        paddingTop: "72px",
        marginTop: "50px",
        minHeight: "60vh",
    },
    header: {
        display: "flex",
        justifyContent: "center",
        marginBottom: "30px",
    },
    testimonialForm: {
        marginBottom: "40px",
        padding: "20px",
    },
    previousTestimonials: {
        "& > h5": {
            marginBottom: "20px",
        },
    },
    testimonials: {
        marginBottom: "40px",
    },
    testimonial: {
        padding: "20px",
        marginBottom: "10px",
    },
}));

const initialState = {
    name: "",
    rating: 0,
    testimonial: "",
    profession: "",
    youtubeVideoId: "",
};

const AdminTestimonials = () => {
    const classes = useStyles();
    const [newTestimonial, setNewTestimomnial] = useState(initialState);
    const [newTestimonialLoader, setNewTestimonialLoader] = useState(false);
    const [newTestimonialError, setNewTestimonialError] = useState(null);
    const [newTestimonialSuccess, setNewTestimonialSuccess] = useState(null);

    const [testimonials, setTestimonials] = useState([]);
    // const [testimonialLoader, setTestimonialLoader] = useState(true);
    const [testimonialError, setTestimonialError] = useState(true);

    const ratings = [
        { label: "Select Rating", value: null },
        { label: "1", value: 1 },
        { label: "2", value: 2 },
        { label: "3", value: 3 },
        { label: "4", value: 4 },
        { label: "5", value: 5 },
    ];

    const [testimonialDeleteError, setTestimonialDeleteError] = useState(null);
    const [testimonialDeleteSuccess, setTestimonialDeleteSuccess] =
        useState(null);

    const [{ admin }] = useStateValue();

    const handleNewTestimonialDetailsUpdate = (event) => {
        setNewTestimomnial({
            ...newTestimonial,
            [`${event.target.name}`]: event.target.value,
        });
    };

    const handleUploadtestimonial = () => {
        uploadTestimonial(
            newTestimonial,
            setNewTestimonialLoader,
            setNewTestimonialError,
            setNewTestimonialSuccess
        );
    };

    const handleDeletetestimonial = (id) => {
        if (
            deleteTestimonial(
                id,
                setTestimonialDeleteError,
                setTestimonialDeleteSuccess
            )
        ) {
            setTestimonials(() => {
                return testimonials.filter(
                    (testimonial) => testimonial.id !== id
                );
            });
        }
    };

    useEffect(() => {
        setNewTestimonialLoader(true);
        getAllTestimonial(setTestimonialError).then((res) =>
            setTestimonials(res)
        );
        setNewTestimonialLoader(false);
    }, []);

    return admin ? (
        <Fragment>
            <AdminNav />
            <Box className={classes.adminTestimonials}>
                <Container>
                    <Box className={classes.header}>
                        <Typography variant="h3">Testimonials</Typography>
                    </Box>
                    <Box
                        boxShadow={2}
                        component={"form"}
                        className={classes.testimonialForm}
                    >
                        <Typography variant="h5">
                            Add New Testimonial
                        </Typography>
                        {newTestimonialError ? (
                            <Alert severity="error">
                                {newTestimonialError}
                            </Alert>
                        ) : (
                            ""
                        )}
                        {newTestimonialSuccess ? (
                            <Alert severity="success">
                                {newTestimonialSuccess}
                            </Alert>
                        ) : (
                            ""
                        )}
                        <TextField
                            name="name"
                            className={classes.textField}
                            placeholder="Name"
                            type={"text"}
                            fullWidth
                            size="small"
                            margin="normal"
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={newTestimonial.name}
                            onChange={handleNewTestimonialDetailsUpdate}
                        />
                        <TextField
                            name="profession"
                            className={classes.textField}
                            placeholder="Profession"
                            type={"text"}
                            fullWidth
                            size="small"
                            margin="normal"
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={newTestimonial.profession}
                            onChange={handleNewTestimonialDetailsUpdate}
                        />
                        <TextField
                            select
                            name="rating"
                            placeholder="Select Grade"
                            helperText="Please select your grade"
                            SelectProps={{
                                native: true,
                            }}
                            size="small"
                            margin="normal"
                            onChange={handleNewTestimonialDetailsUpdate}
                            value={newTestimonial.rating}
                            fullWidth
                        >
                            {ratings.map((rating, index) => (
                                <option key={index} value={rating.value}>
                                    {rating.label}
                                </option>
                            ))}
                        </TextField>
                        <TextField
                            name="youtubeVideoId"
                            className={classes.textField}
                            placeholder="Testimonial youtube video id"
                            type={"text"}
                            fullWidth
                            size="small"
                            margin="normal"
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={newTestimonial.youtubeVideoId}
                            onChange={handleNewTestimonialDetailsUpdate}
                        />
                        <TextField
                            name="testimonial"
                            className={classes.textField}
                            placeholder="Testimonial"
                            type={"text"}
                            fullWidth
                            multiline
                            minRows={4}
                            margin="normal"
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={newTestimonial.testimonial}
                            onChange={handleNewTestimonialDetailsUpdate}
                        />
                        {newTestimonialLoader ? (
                            <CircularProgress />
                        ) : (
                            <Button
                                onClick={handleUploadtestimonial}
                                style={{ marginTop: "15px" }}
                                variant="contained"
                                color="primary"
                                width="100%"
                            >
                                Upload Testimonial
                            </Button>
                        )}
                    </Box>
                    <Box className={classes.previousTestimonials}>
                        <Typography component={"h5"} variant="h5">
                            Testimonials
                        </Typography>
                        {testimonialError ? (
                            <Alert severity="error">{testimonialError}</Alert>
                        ) : (
                            ""
                        )}
                        {testimonialDeleteError ? (
                            <Alert severity="error">
                                {testimonialDeleteError}
                            </Alert>
                        ) : (
                            ""
                        )}
                        {testimonialDeleteSuccess ? (
                            <Alert severity="success">
                                {testimonialDeleteSuccess}
                            </Alert>
                        ) : (
                            ""
                        )}
                        <Box className={classes.testimonials}>
                            {testimonials.map((testimonial) => (
                                <Box
                                    boxShadow={2}
                                    className={classes.testimonial}
                                    key={testimonial.id}
                                >
                                    <Typography variant="body2">
                                        Name: {testimonial.name}
                                    </Typography>
                                    <Typography variant="body2">
                                        Profession: {testimonial.profession}
                                    </Typography>
                                    <Typography variant="body2">
                                        Rating: {testimonial.rating}
                                    </Typography>
                                    <Typography variant="subtitle2">
                                        Testimonial:{" "}
                                    </Typography>
                                    <Typography variant="body2">
                                        {testimonial.testimonial}
                                    </Typography>
                                    <Button
                                        onClick={() =>
                                            handleDeletetestimonial(
                                                testimonial.id
                                            )
                                        }
                                        style={{ marginTop: "15px" }}
                                        variant="contained"
                                        color="primary"
                                        width="100%"
                                    >
                                        Delete Testimonial
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

export default AdminTestimonials;
