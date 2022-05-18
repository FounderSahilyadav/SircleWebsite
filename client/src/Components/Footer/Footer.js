import {
    Box,
    Container,
    Divider,
    IconButton,
    Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Facebook, Instagram, LinkedIn } from "@material-ui/icons";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import facebook from "../../assets/facebook_icon.png";
import instagram from "../../assets/instagram_icon.png";
import linkedin from "../../assets/linkedin_icon.png";
// import Terms from "../TermsPolicies/Terms"

const useStyles = makeStyles((theme) => ({
    h1: {
        textAlign: "center",

    }
    ,
    footer: {
        alignSelf: "flex-end",
        marginTop: "70px",
        paddingTop: theme.spacing(5),
        background: "rgb(198, 246, 252)",
    },
    footerHeader: {
        width: "50%",
        alignSelf: "center",
        marginTop: "-40px",
        "& h5": {
            fontSize: "3rem",
            fontWeight: theme.typography.fontWeightBold,
        },
        [theme.breakpoints.down(800)]: {
            "& h5": {
                fontSize: "1.5rem",
                fontWeight: theme.typography.fontWeightBold,
            },
        },
    },
    footerContactLinks: {
        display: "flex",
        flexDirection: "column",
        width: "50%",
        marginBottom: theme.spacing(5),
    },
    footerSocial: {
        display: "flex",
        alignItems: "center",
        margin: "0px 10px",
        [theme.breakpoints.up(800)]: {
            fontSize: "1.5rem",
        },
    },
    footerBottom: {
        display: "flex",
        padding: "15px 0",
        justifyContent: "center",
        background: "#1A2E39",
    },
    footerBottomContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        [theme.breakpoints.up(800)]: {
            flexDirection: "row",
        },
    },
    footerBottomItem: {
        display: "flex",
        flexDirection: "row",
        margin: "0 auto",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "10px",
        "& img": {
            height: "48px",
        },
        "& > p": {
            fontSize: theme.typography.pxToRem(10),
        },
        [theme.breakpoints.up("sm")]: {
            alignItems: "center",
            width: "33.333%",
        },
    },
    firstFooterBottomItem: {
        display: "none",
        [theme.breakpoints.up(800)]: {
            display: "block",
        },
    },
    lastFooterBottomItem: {
        "& P": {
            color: "#fff",
        },
        [theme.breakpoints.up(800)]: {
            justifyContent: "flex-end",
        },
    },
    footerBottomSocial: {
        marginRight: "8px",
    },
    icon: {
        width: "70px",
        [theme.breakpoints.down(800)]: {
            width: "40px",
        },
    },
    footerContent: {
        display: "flex",
        justifyContent: "center",
    }
}));

const Footer = () => {
    const classes = useStyles();

    // Website footer
    return (
        <Box className={classes.footer}>
            <Container>
                <div className={classes.footerContent}>


                    <Box className={classes.footerHeader}>
                        <Typography component={"h5"} variant={"h5"}>
                            CONNECT WITH US<br /> TO GROW MORE
                        </Typography>
                    </Box>

                    {/* Social media links for the website */}
                    <Box className={classes.footerContactLinks}>
                        <a
                            href="https://www.facebook.com/Sircleeducation"
                            target={"_blank"}
                            rel="noreferrer"
                            className={classes.footerSocial}
                        >

                            <img src={facebook} alt="" className={classes.icon} /><span>/Sircleeducation</span>
                        </a>
                        {/* <br /> */}

                        <a
                            href="https://www.instagram.com/sircleeducation"
                            target={"_blank"}
                            rel="noreferrer"
                            className={classes.footerSocial}
                        >
                            <img src={instagram} alt="" className={classes.icon} /><span>/sircleeducation</span>
                        </a>
                        {/* <br /> */}
                        <a
                            href="https://www.linkedin.com/company/sircle-education"
                            target={"_blank"}
                            rel="noreferrer"
                            className={classes.footerSocial}
                        >
                            <img src={linkedin} alt="" className={classes.icon} /><span>/company/sircle-education</span>

                        </a>
                    </Box>
                </div>
            </Container>
            <Divider style={{ background: "gray", height: "1px" }} />

            {/* Bottom of the footer */}
            <Box className={classes.footerBottom}>
                <Container className={classes.footerBottomContainer}>
                    {/* Again showing social media links, haven't been set yet */}
                    <Box
                        className={`${classes.footerBottomItem} ${classes.firstFooterBottomItem}`}
                    >
                        <a
                            href="https://www.linkedin.com/company/sircle-education"
                            target={"_blank"}
                            rel="noreferrer"
                            className={classes.footerBottomSocial}
                        >
                            <IconButton>
                                <LinkedIn style={{ color: "#0A66C2" }} />
                            </IconButton>
                        </a>
                        <a
                            href="https://www.instagram.com/sircleeducation"
                            target="_blank"
                            rel="noreferrer"
                            className={classes.footerBottomSocial}
                        >
                            <IconButton>
                                <Instagram style={{ color: "#fb3958" }} />
                            </IconButton>
                        </a>
                        <a
                            href="https://www.facebook.com/Sircleeducation"
                            target="_blank"
                            rel="noreferrer"
                            className={classes.footerBottomSocial}
                        >
                            <IconButton>
                                <Facebook style={{ color: "#1877F2" }} />
                            </IconButton>
                        </a>
                    </Box>

                    {/* Website logo to redirect to home page */}
                    <Box
                        className={classes.footerBottomItem}
                        justifyContent="center"
                    >
                        <Link to={"/"}>
                            <img src={logo} alt="" />
                        </Link>
                    </Box>
                    <Box
                        className={`${classes.footerBottomItem} ${classes.lastFooterBottomItem}`}
                        justifyContent="flex-end"
                    >
                        <Typography
                            component={"p"}
                            variant={"body2"}
                            style={{ textAlign: "right" }}
                        >
                            &#169; 2022 Sircle. All rights reserved.
                        </Typography>
                        <br />
                    </Box>
                    <Box
                        className={`${classes.footerBottomItem} ${classes.lastFooterBottomItem}`}
                        justifyContent="flex-end"
                    >
                        <br />
                        <ul style={{listStyleType:"none"}}>
                            <li>
                                <Link component={"p"}
                                    variant={"body2"}
                                    style={{ textAlign: "right", color: "white" }} to={"/Terms"}>Terms and Condition</Link>

                            </li>
                            &nbsp;
                            <li><Link component={"p"}
                                variant={"body2"}
                                style={{ textAlign: "right", color: "white" }} to={"/PrivacyPolicy"}>Privacy Policy</Link>
                            </li>
                        </ul>

                    </Box>
                </Container>
            </Box>
        </Box>
    );
};

export default Footer;
