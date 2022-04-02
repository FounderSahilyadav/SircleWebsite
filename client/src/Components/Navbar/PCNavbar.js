import {
    AppBar,
    Toolbar,
    CssBaseline,
    Container,
    Button,
    Box,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

const useStyles = makeStyles((theme) => ({
    appBar: {
        background: "#18a9e2",
        boxShadow: "none",
        paddingTop: "4px",
        paddingBottom: "4px",
        margin: "0",
        height: "72px",
    },
    toolBar: {
        background: "none",
    },
    navContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
    },
    navItems: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
    },
    brand: {
        marginRight: "20px",
    },
    brandLogo: {
        height: "48px",
        filter: "drop-shadow(5px 5px 5px #000)",
    },
    navLinks: {
        display: "flex",
        flexDirection: "row",
        height: "100%",
    },
    navLink: {
        display: "flex",
        margin: "0 15px",
    },
    link: {
        // color: "rgba(102, 112, 133, 1)",
        color: "#fff",
        textDecoration: "none",
        fontSize: "16px",
        margin: "auto 0",
        float: "center",
    },
    navButtons: {
        display: "flex",
        alignItems: "center",
    },
    buyPrograms: {
        width: "fit-content",
        background: "orangered",
        padding: "9px 20px",
        borderRadius: "5px",
        outLine: "none",
        "& > a": {
            textDecoration: "none",
            color: "#fff",
        },
    },
}));

const PCNavbar = ({ handleClickOpen }) => {
    const classes = useStyles();

    return (
        <AppBar className={classes.appBar}>
            <CssBaseline />
            <Toolbar className={classes.toolBar}>
                <Container className={classes.navContainer}>
                    <Box variant="div" className={classes.brand}>
                        <Link to="/">
                            <img
                                className={classes.brandLogo}
                                src={logo}
                                alt="Sircle"
                            />
                        </Link>
                    </Box>

                    {/* Links in the navbar */}
                    <Box className={classes.navItems}>
                        <Box className={classes.navLinks}>
                            <Box className={classes.navLink}>
                                <Link to={"/"} className={classes.link}>
                                    Home
                                </Link>
                            </Box>
                            <Box className={classes.navLink}>
                                <Link
                                    to={"/our-products"}
                                    className={classes.link}
                                >
                                    Our Products
                                </Link>
                            </Box>
                            <Box className={classes.navLink}>
                                <Link to={"/blogs"} className={classes.link}>
                                    Blogs
                                </Link>
                            </Box>
                            <Box className={classes.navLink}>
                                <Link to={"/videos"} className={classes.link}>
                                    Videos
                                </Link>
                            </Box>
                            <Box className={classes.navLink}>
                                <Link to={"/about"} className={classes.link}>
                                    About Us
                                </Link>
                            </Box>
                        </Box>
                        <Box className={classes.navButtons}>
                            {/* Direct to products page */}
                            <Box boxShadow={2} className={classes.buyPrograms}>
                                <Link to={"/our-products"}>
                                    BUY OUR PROGRAMS
                                </Link>
                            </Box>

                            {/* To open sialog box for students register */}
                            {/* handleOpenCLick - handles the opening of the disalog box, passes as prop to the component */}
                            <Button
                                style={{ marginLeft: "20px" }}
                                onClick={handleClickOpen}
                                variant="contained"
                                color="primary"
                                // fullWidth
                            >
                                Book Free Trial Now
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </Toolbar>
        </AppBar>
    );
};

export default PCNavbar;
