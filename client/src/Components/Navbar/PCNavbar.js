import {
    AppBar,
    Toolbar,
    CssBaseline,
    Container,
    Button,
    Box,
    Menu,
    MenuItem,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import userLogo from "../../assets/user_logo.png";
import keyIcon from "../../assets/key_icon.png";
// import 

const useStyles = makeStyles((theme) => ({
    appBar: {
        background: "#18a9e2",
        boxShadow: "none",
        paddingTop: "4px",
        paddingBottom: "4px",
        paddingRight: "20px",
        margin: "0",
        height: "72px",
        width: "100%",
    },
    toolBar: {
        display: "flex",
        justifyContent: "center",
        background: "none",
        width: "100%",
    },
    navContainer: {
        display: "flex",
        flexDirection: "row",
        width: "fit-content",
        margin: "0",
    },
    navItems: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
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
        fontSize: "17px",
        margin: "auto 0",
        float: "center",
    },
    navButtons: {
        display: "flex",
        alignItems: "center",
    },
    buyPrograms: {
        width: "fit-content",
        background: "#EA6915",
        padding: "9px 20px",
        borderRadius: "5px",
        outLine: "none",
        "& > a": {
            textDecoration: "none",
            color: "#fff",
        },
    },
    userLogo: {
        height: "40px",
        marginLeft: "20px",
    },
    keyIcon: {
        height: "40px",
    },
}));

const PCNavbar = ({ handleClickOpen, handleSignOpen, studentToken, setStudentToken, studentData, setOpenPassword, setOpenContact }) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        event.preventDefault();
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleLogout = () => {
        setStudentToken("");
        localStorage.removeItem("token");
        handleClose();
        // console.log(studentToken);
    }
    const handleChangePassword = () => {
        setOpenPassword(true);
        handleClose();
    }
    const handleContact = () => {
        setOpenContact(true);
        handleClose();
    }

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
                </Container>
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
                        <Box className={classes.navLink}>
                            <Link to={"/ContactUs"} className={classes.link}>
                                Contact Us
                            </Link>
                        </Box>
                    </Box>
                    <Box className={classes.navButtons}>
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
                        {/* Direct to products page */}
                        {studentToken == "" ? (
                            <span
                                style={{ marginLeft: "20px", cursor: "pointer" }}
                                onClick={handleSignOpen}
                                variant="contained"
                                color="primary"
                            // fullWidth
                            >
                                SignIn
                            </span>) : (
                            <>
                                <img
                                    className={classes.userLogo}
                                    src={userLogo}
                                    alt="User"
                                />
                                <Box
                                    id="basic-button"
                                    style={{ marginLeft: "10px", cursor: "pointer" }}
                                    aria-controls={open ? 'basic-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClick}
                                >
                                    {studentData.name.trim().split(' ')[0]} &#9660;
                                </Box>
                                <Menu
                                    anchorEl={anchorEl}
                                    id="account-menu"
                                    open={open}
                                    onClose={handleClose}
                                    onClick={handleClose}
                                    PaperProps={{
                                        elevation: 0,
                                        sx: {
                                            overflow: 'visible',
                                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                            mt: 1.5,
                                            '& .MuiAvatar-root': {
                                                width: 32,
                                                height: 32,
                                                ml: -0.5,
                                                mr: 1,
                                            },
                                            '&:before': {
                                                content: '""',
                                                display: 'block',
                                                position: 'absolute',
                                                top: 0,
                                                right: 14,
                                                width: 10,
                                                height: 10,
                                                bgcolor: 'background.paper',
                                                transform: 'translateY(-50%) rotate(45deg)',
                                                zIndex: 0,
                                            },
                                        },
                                    }}
                                    className="menu"
                                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                >
                                    <MenuItem onClick={handleClose}><Link to="/myprofile"> My Profile</Link></MenuItem>
                                    <MenuItem onClick={handleChangePassword}><img className={classes.keyIcon} src={keyIcon} alt="img" /> Change Password</MenuItem>
                                    <MenuItem onClick={handleClose}><Link to="/myprograms"> My Programs</Link></MenuItem>
                                    <MenuItem onClick={handleContact}>Contact US</MenuItem>
                                    <MenuItem onClick={handleLogout}>
                                        Logout
                                    </MenuItem>
                                </Menu>
                            </>)}

                    </Box>
                </Box>

            </Toolbar>
        </AppBar>
    );
};

export default PCNavbar;
