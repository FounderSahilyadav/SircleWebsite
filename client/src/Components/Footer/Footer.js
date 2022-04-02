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

const useStyles = makeStyles((theme) => ({
    footer: {
        alignSelf: "flex-end",
        paddingTop: theme.spacing(5),
        background: "rgb(198, 246, 252)",
    },
    footerHeader: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "0 auto",
        marginBottom: theme.spacing(2),
        "& h5": {
            textAlign: "center",
            marginTop: "20px",
            fontWeight: theme.typography.fontWeightBold,
        },
    },
    footerContactLinks: {
        display: "flex",
        justifyContent: "center",
        marginBottom: theme.spacing(8),
    },
    footerSocial: {
        margin: "0px 10px",
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
}));

const Footer = () => {
    const classes = useStyles();

    // Website footer
    return (
        <Box className={classes.footer}>
            <Container>
                <Box className={classes.footerHeader}>
                    <Typography component={"h5"} variant={"h5"}>
                        CONNECT WITH US TO GROW MORE
                    </Typography>
                </Box>

                {/* Social media links for the website */}
                <Box className={classes.footerContactLinks}>
                    <a
                        href="https://google.com"
                        target={"_blank"}
                        rel="noreferrer"
                        className={classes.footerSocial}
                    >
                        <IconButton>
                            <LinkedIn style={{ color: "#0A66C2" }} />
                        </IconButton>
                    </a>
                    <a
                        href="https://google.com"
                        target={"_blank"}
                        rel="noreferrer"
                        className={classes.footerSocial}
                    >
                        <IconButton>
                            <Facebook style={{ color: "#1877F2" }} />
                        </IconButton>
                    </a>
                    <a
                        href="https://google.com"
                        target={"_blank"}
                        rel="noreferrer"
                        className={classes.footerSocial}
                    >
                        <IconButton>
                            <Instagram style={{ color: "#fb3958" }} />
                        </IconButton>
                    </a>
                </Box>
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
                            href="https://google.com"
                            target={"_blank"}
                            rel="noreferrer"
                            className={classes.footerBottomSocial}
                        >
                            <IconButton>
                                <LinkedIn style={{ color: "#0A66C2" }} />
                            </IconButton>
                        </a>
                        <a
                            href="https://google.com"
                            target="_blank"
                            rel="noreferrer"
                            className={classes.footerBottomSocial}
                        >
                            <IconButton>
                                <Facebook style={{ color: "#1877F2" }} />
                            </IconButton>
                        </a>
                        <a
                            href="https://google.com"
                            target="_blank"
                            rel="noreferrer"
                            className={classes.footerBottomSocial}
                        >
                            <IconButton>
                                <Instagram style={{ color: "#fb3958" }} />
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
                    </Box>
                </Container>
            </Box>
        </Box>
    );
};

export default Footer;
