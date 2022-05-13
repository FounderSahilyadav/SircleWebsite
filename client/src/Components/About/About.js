import {
    Box,
    CircularProgress,
    Container,
    IconButton,
    Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect, useState } from "react";
import { Facebook, Instagram, LinkedIn } from "@material-ui/icons";
import member1 from "../../assets/sahil_member1.jpg";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getAllSquadMember } from "../../utils/squadMember";
import founderSignature from "../../assets/founderSignature.png";
import aboutPosture from "../../assets/About_section.jpg"

const useStyles = makeStyles((theme) => ({
    aboutPage: {
        paddingTop: "72px",
    },
    aboutContainer: {
        display: "flex",
        flexDirection: "column",
        marginTop: "30px",
    },
    aboutHeader: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        marginBottom: "50px",
        "& > h3": {
            color: "#42474C",
            fontWeight: "600",
            marginBottom: "10px",
        },
        "& > p": {
            color: "#5C656C",
            fontWeight: "600",
        },
    },
    headerLink: {
        color: "#5C656C",
        textDecoration: "none",
        "&:hover": {
            color: "blue",
        },
    },
    aboutDetails: {
        display: "flex",
        flexDirection: "column",
    },
    aboutPoster: {
        width: "100%",
        marginBottom: "40px",
        "& > img": {
            width: "100%",
            height: "auto",

        },
    },
    founder: {
        marginTop: "20px",
    },
    founderHeader: {
        marginBottom: "40px",
        "& > h4": {
            fontWeight: "600",
        },
    },
    aboutFounder: {
        display: "flex",
        marginBottom: "20px",
        [theme.breakpoints.down(600)]: {
            flexDirection: "column",
        },
    },
    aboutFounderLeft: {
        width: "40%",
        marginRight: "30px",
        "& > h6": {
            textAlign: "center",
            fontWeight: "600",
            color: "gray",
        },
        [theme.breakpoints.down(600)]: {
            width: "100%",
            marginBottom: "25px",
        },
    },
    founderImage: {
        display: "flex",
        justifyContent: "center",
        width: "100%",
        marginBottom: "15px",
        "& > img": {
            width: "200px",
            height: "200px",
            borderRadius: "50%",
        },
    },
    aboutFounderRight: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "60%",
        "& > strong": {
            color: "gray",
            fontStyle: "italic",
            marginBottom: "20px",
        },
        [theme.breakpoints.down(600)]: {
            width: "100%",
            alignItems: "center",
        },
    },
    founderEducation: {
        marginBottom: "20px",
        "& > h5": {
            fontWeight: "600",
            marginBottom: "10px",
            color: "#3F51B5",
        },
        "& > p": {
            fontWeight: "500",
        },
        [theme.breakpoints.down(600)]: {
            textAlign: "center",
        },
    },
    founderSocial: {
        "& > h6": {
            color: "#3F51B5",
            fontWeight: "600",
        },
        "& > div": {
            display: "flex",
            [theme.breakpoints.down(600)]: {
                justifyContent: "center",
            },
        },
    },
    founderQuote: {
        padding: "20px 30px",
        borderRadius: "10px",
        marginTop: "20px",
        marginBottom: "30px",
        border: "1px solid lightgray",
    },
    founderQuoteBody: {
        fontStyle: "italic",
        textAlign: "center",
        marginBottom: "10px",
        fontWeight: "550",
        color: "gray",
    },
    founderQuoteName: {
        display: "flex",
        justifyContent: "center",
        "& > img": {
            height: "80px",
        },
    },
    squad: {
        margin: "40px 0px",
        "& > h5": {
            fontWeight: "bold",
        },
    },
    squadMembers: {
        padding: "3%",
    },
    squadMember: {
        width: "250px",
        background: "#1D2939",
        padding: "30px",
        borderRadius: "10px",
        margin: "0 auto",
        cursor: "pointer",
    },
    squadMemberTop: {
        display: "flex",
        justifyContent: "center",
        width: "100%",
        marginBottom: "20px",
        "& > img": {
            width: "100px",
            height: "100px",
            borderRadius: "50%",
        },
    },
    squadMemberBottom: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        "& > h6": {
            fontWeight: "500",
            color: "#fff",
        },
        "& > p": {
            color: "lightgray",
            marginBottom: "15px",
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
        height: "20vh",
        width: "100%",
    },
    noSquadMember: {
        display: "flex",
        justifyContent: "center",
    },
    founderDescription: {
        [theme.breakpoints.down(600)]: {
            textAlign: "center",
        },
    },
}));


const About = () => {
    const classes = useStyles();

    // Hooks for storing and handling team members fetch
    const [squadMembers, setSquadMembers] = useState([]);
    const [squadMemberLoader, setSquadMemberLoader] = useState(true);

    // Settings for slider used for team members carousal slider
    const settings = {
        dots: true,
        infinite: true,
        pauseOnHover: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 2000,
        cssEase: "linear",
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
        responsive: [
            {
                breakpoint: 1100,
                settings: {
                    dots: true,
                    infinite: true,
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    autoplay: true,
                    speed: 2000,
                    autoplaySpeed: 2000,
                    cssEase: "linear",
                },
            },
            {
                breakpoint: 850,
                settings: {
                    dots: true,
                    infinite: true,
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    autoplay: true,
                    speed: 2000,
                    autoplaySpeed: 2000,
                    cssEase: "linear",
                },
            },
            {
                breakpoint: 550,
                settings: {
                    dots: true,
                    infinite: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    autoplay: true,
                    speed: 2000,
                    autoplaySpeed: 2000,
                    cssEase: "linear",
                },
            },
        ],
    };

    // Scroll to top everytime page loades
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0 });
    }, []);

    // Fetching all members from the database
    useEffect(() => {
        setSquadMemberLoader(true);
        getAllSquadMember().then((res) => setSquadMembers(res));
        setSquadMemberLoader(false);
    }, []);

    // Component for displaying detail of one squad member
    const SquadMember = (squadMember) => {
        return (
            <Box className={classes.squadMember}>
                {/* Squad member picture */}
                <Box className={classes.squadMemberTop}>
                    <img src={squadMember.profile} alt="" />
                </Box>
                <Box className={classes.squadMemberBottom}>
                    {/* Squad member name */}
                    <Typography variant="h6">{squadMember.name}</Typography>
                    {/* Squad member designation */}
                    <Typography component={"p"} variant="boddy2">
                        {squadMember.designation}
                    </Typography>

                    {/* Squad member social links */}
                    <Box component={"div"}>
                        <a
                            href={squadMember.instagram}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <IconButton>
                                <Instagram style={{ color: "#fb3958" }} />
                            </IconButton>
                        </a>
                        <a
                            href={squadMember.linkedIn}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <IconButton>
                                <LinkedIn style={{ color: "#0A66C2" }} />
                            </IconButton>
                        </a>
                        <a
                            href={squadMember.facebook}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <IconButton>
                                <Facebook style={{ color: "#1877F2" }} />
                            </IconButton>
                        </a>
                    </Box>
                </Box>
            </Box>
        );
    };
    return (
        <Box className={classes.aboutPage}>
            <Container className={classes.aboutContainer}>
                <Box className={classes.aboutHeader}>
                    <Typography variant="h3">About Us</Typography>
                    <Typography variant="body2" component={"p"}>
                        <Link className={classes.headerLink} to={"/"}>
                            Home
                        </Link>{" "}
                        &#9656; About Us
                    </Typography>
                </Box>
                <Box className={classes.aboutDetails}>
                    {/* About Page top picture, yet to be set */}
                    <Box className={classes.aboutPoster}>
                        <img src={aboutPosture} alt="Not supported by Your Browser" />
                    </Box>

                    {/* Details about founder */}
                    <Box className={classes.founder}>
                        <Box className={classes.founderHeader}>
                            <Typography variant="h4">Founder</Typography>
                        </Box>
                        <Box className={classes.aboutFounder}>
                            <Box className={classes.aboutFounderLeft}>
                                {/* Founder's picture not set yet */}
                                <Box
                                    className={classes.founderImage}
                                    component={"div"}
                                >
                                    <img src={member1} alt="" />
                                </Box>
                                <Typography variant="h6">
                                    Sahil Yadav
                                </Typography>
                            </Box>

                            {/* Other details about the founder */}
                            <Box className={classes.aboutFounderRight}>
                                {/* Founder's educational details */}
                                <Box className={classes.founderEducation}>
                                    <Typography variant="h5" component={"h5"}>
                                        EDUCATION
                                    </Typography>
                                    <Typography variant="body2" component={"p"}>
                                        B.Tech, IIT BHU.
                                    </Typography>
                                </Box>
                                <Typography
                                    variant="body1"
                                    component={"strong"}
                                    className={classes.founderDescription}
                                >
                                    Certified Entrepreneurship Trainer, Motivational Speaker and Life Coach
                                </Typography>

                                {/* Founder's social media links, not set set */}
                                <Box className={classes.founderSocial}>
                                    <Typography variant="h6">
                                        CONNECT WITH ME-
                                    </Typography>
                                    <Box component={"div"}>
                                        <IconButton>
                                            <a href="https://www.instagram.com/startupboysahil/" target="_blank" rel="noreferrer">
                                                <Instagram
                                                    style={{ color: "#fb3958" }}
                                                />
                                            </a>
                                        </IconButton>
                                        <IconButton>
                                            <a href="https://www.linkedin.com/in/sahil-yadav-iitbhu/" target="_blank" rel="noreferrer">
                                                <LinkedIn
                                                    style={{ color: "#0A66C2" }}
                                                />
                                            </a>
                                        </IconButton>
                                        <IconButton>
                                            <a href="https://www.facebook.com/StartupBoySahil/" target="_blank" rel="noreferrer">
                                                <Facebook
                                                    style={{ color: "#1877F2" }}
                                                />
                                            </a>
                                        </IconButton>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>

                        {/* A quote from founder */}
                        <Box className={classes.founderQuote}>
                            {/* Quote */}
                            <Typography
                                className={classes.founderQuoteBody}
                                variant="body1"
                            >
                                "Dont't work hard pushing the wall, Better work
                                smart pushing the door."
                            </Typography>

                            {/* By line */}
                            <Box className={classes.founderQuoteName}>
                                <img src={founderSignature} alt="" />
                            </Box>
                        </Box>
                    </Box>

                    {/* All team members */}
                    <Box className={classes.squad}>
                        <Typography variant="h5">MEET OUR SQUAD</Typography>

                        {/* Waiting till squad members are fetched from the database */}
                        {squadMemberLoader ? (
                            <Box className={classes.circularProgress}>
                                <CircularProgress />
                            </Box>
                        ) : (
                            <Box className={classes.squadMembers}>
                                {/* Looping through the squad members, Slider is used for carousal */}
                                <Slider {...settings}>
                                    {squadMembers.map((squadMember) => (
                                        <SquadMember
                                            squadMember={squadMember}
                                        />
                                    ))}
                                </Slider>

                                {/* No squad members yet to show in case squad members array is empty */}
                                {squadMembers.length === 0 ? (
                                    <Box className={classes.noSquadMember}>
                                        <Typography variant="subtitle2">
                                            ~No Squad Members to show yet~
                                        </Typography>
                                    </Box>
                                ) : (
                                    <></>
                                )}
                            </Box>
                        )}
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default About;
