import {
    Box,
    CircularProgress,
    Container,
    Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Slider from "react-slick";
import React, { useEffect, useState } from "react";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getAllTestimonial } from "../../utils/testimonials";
import MuiAlert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
    testimonialSection: {
        marginTop: "50px",
        paddingTop: theme.spacing(4),
    },
    testimonialContainer: {
        [theme.breakpoints.down(320)]: {
            paddingRight: "0px",
        },
    },
    testimonialHeader: {
        marginBottom: "40px",
        textAlign: "center",
        "& h5": {
            fontWeight: theme.typography.fontWeightBold,
            marginBottom: theme.spacing(2),
        },
        "& p": {
            color: "#25AEE4",
        },
    },
    testimonials: {
        display: "flex",
        flexDirection: "column",
        padding: "6%",
        paddingTop: "0px",
        overflow: "hidden",
        [theme.breakpoints.down(700)]: {
            height: "100%",
        },
    },
    testimonial: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        borderRadius: "24px",
        margin: "0 auto",
        overflow: "hidden",
        [theme.breakpoints.down(1000)]: {
            flexDirection: "column-reverse",
            width: "100%",
            height: "auto",
        },
        [theme.breakpoints.down(350)]: {
            width: "250px",
            margin: "0",
        },
    },

    testimonialLeft: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        minWidth: "500px",
        padding: "20px",
        background: "#1D2939",
    },
    testimonialDetails: {
        margin: "auto 0px",
        "& > p": {
            marginBottom: "20px",
            color: "#FEC84B",
        },
        "& > h5": {
            color: "lightgray",
            fontStyle: "italic",
            textAlign: "center",
            marginBottom: "20px",
            height: "100px",
            overflowY: "auto",
            padding: "0px 20px",
            wordSpacing: "10px",
        },
        "& > strong": {
            alignSleft: "flex-end",
        },
        "& > small": {
            color: "lightgray",
            alignSleft: "flex-end",
        },
    },
    testimonialName: {
        color: "#FEC84B",
        textAlign: "left",
        display: "block",
        "&::before": {
            content: '""',
            width: "15px",
            marginRight: "5px",
            height: "2px",
            borderRadius: "5px",
            background: "#FEC84B",
            display: "inline-block",
            marginBottom: "4px",
            fontSize: 24,
        },
    },
    testimonialRight: {
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
    },
    videoFrame: {
        width: "560px",
        height: "315px",
        [theme.breakpoints.down(1000)]: {
            width: "100%",
            height: "300px",
        },
        [theme.breakpoints.down(700)]: {
            width: "100%",
            height: "250px",
        },
        [theme.breakpoints.down(550)]: {
            width: "100%",
            height: "180px",
        },
        [theme.breakpoints.down(350)]: {
            width: "100%",
            height: "150px",
        },
    },
    carousalIcons: {
        background: "gray",
        color: "#fff",
        borderRadius: "50%",
    },
    circularProgress: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "300px",
    },
    noTestimonial: {
        display: "flex",
        justifyContent: "center",
        marginBottom: "70px",
    },
}));

const Alert = (props) => {
    return <MuiAlert {...props} />;
};

const Testimonials = () => {
    const classes = useStyles();
    const [testimonials, setTestimonials] = useState([]);
    const [testimonialLoader, setTestimonialLoader] = useState(true);
    const [testimonialError, setTestimonialError] = useState(true);

    const settings = {
        dots: true,
        infinite: true,
        speed: 2000,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: (
            <div>
                <KeyboardArrowRightIcon className={classes.carousalIcons} />
            </div>
        ),
        prevArrow: (
            <div>
                <KeyboardArrowLeftIcon className={classes.carousalIcons} />
            </div>
        ),
    };

    const showRatings = (rating) => {
        const ratings = [];
        for (let i = 0; i < rating; i++) {
            ratings.push(<>&#9733;</>);
        }
        return ratings;
    };

    useEffect(() => {
        setTestimonialLoader(true);
        getAllTestimonial(setTestimonialError).then((res) =>
            setTestimonials(res)
        );
        setTestimonialLoader(false);
    }, []);

    // Single testimonial card
    const TestimonialSection = ({ test }) => (
        <Box className={classes.testimonial}>
            <Box className={classes.testimonialLeft}>
                <Box className={classes.testimonialDetails}>
                    <Typography component="p" variant="h6">
                        {showRatings(test.rating).map((rating) => rating)}
                    </Typography>
                    <Typography component="h5" variant="body2">
                        "{test.testimonial}"
                    </Typography>
                    <Typography
                        component={"strong"}
                        className={classes.testimonialName}
                    >
                        {test.name}
                    </Typography>
                    <Typography component="small" variant="caption">
                        {test.profession}
                    </Typography>
                </Box>
            </Box>
            <Box className={classes.testimonialRight}>
                <iframe
                    className={classes.videoFrame}
                    src={`https://www.youtube.com/embed/${test.youtubeVideoId}?autostart=0&modestbranding=0&rel=0&fs=0&showinfo=0`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </Box>
        </Box>
    );
    return (
        <Box className={classes.testimonialSection}>
            <Container className={classes.testimonialContainer}>
                <Box className={classes.testimonialHeader}>
                    <Typography variant="h5">
                        Don’t just take our word for it
                    </Typography>
                    <Typography component={"p"} variant="body2">
                        Testimonials
                    </Typography>
                </Box>
                {testimonialError ? (
                    <Alert severity="error">{testimonialError}</Alert>
                ) : (
                    ""
                )}
                {testimonialLoader ? (
                    <Box className={classes.circularProgress}>
                        <CircularProgress />
                    </Box>
                ) : testimonials.length !== 0 ? (
                    <Box className={classes.testimonials}>
                        {/* Slider for creating carousal of testimonials */}
                        <Slider adaptiveHeight={true} {...settings}>
                            {/* Map through all the testimonials */}
                            {testimonials.map((test, index) => (
                                <TestimonialSection test={test} key={index} />
                            ))}
                        </Slider>
                    </Box>
                ) : (
                    // If no testimonials are available
                    <Box className={classes.noTestimonial}>
                        <Typography variant="body1">
                            No Testimonials Available Yet
                        </Typography>
                    </Box>
                )}
            </Container>
        </Box>
    );
};

export default Testimonials;
