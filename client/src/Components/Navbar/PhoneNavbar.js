import {
    AppBar,
    CssBaseline,
    Toolbar,
    Box,
    IconButton,
    SwipeableDrawer,
    List,
    ListItem,
    ListItemText,
    Divider,
    Button,
    Menu,
    MenuItem,
} from "@material-ui/core";
import { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import { useState } from "react";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import ContactUs from "../Home/ContactUs";
import userLogo from "../../assets/user_logo.png";
import keyIcon from "../../assets/key_icon.png";

const useStyles = makeStyles((theme) => ({
    appBar: {
        display: "flex",
        justifyContent: "center",
        background: "#18a9e2",
        boxShadow: "none",
        height: "72px",
    },
    toolBar: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    rightItems: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    brand: {
        marginLeft: "10px",
        "& img": {
            height: "48px",
            filter: "drop-shadow(5px 5px 5px #000)",
        },
    },
    list: {
        width: 250,
        paddingTop: "10px",
    },
    listItem: {
        padding: "0",
    },
    linkTag: {
        color: "rgba(102, 112, 133, 1)",
        textDecoration: "none",
        width: "100%",
        height: "100%",
        paddingTop: "15px",
        paddingLeft: "15px",
    },
    belowDivider: {
        display: "flex",
        flexDirection: "column",
        marginTop: "20px",
        paddingLeft: "10px",
        paddingRight: "10px",
    },
    buyPrograms: {
        background: "orangered",
        padding: "9px 20px",
        borderRadius: "5px",
        outLine: "none",
        width: "100%",
        marginBottom: "20px",
        textAlign: "center",
        "& > a": {
            textDecoration: "none",
            color: "#fff",
        },
    },
    userLogo: {
        height: "30px",
        marginLeft: "20px",
    },
    keyIcon: {
        height: "40px",
    },
}));

const PhoneNavbar = ({ handleClickOpen, handleSignOpen, studentToken, setStudentToken, studentData, setOpenPassword, setOpenContact }) => {
    const classes = useStyles();
    const anchor = "left";
    const [state, setState] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
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

    const handlemenuOpen = (open) => (event) => {
        if (
            event &&
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }
        setState(open);
    };
    const list = (
        <div
            className={classes.list}
            role="presentation"
            onClick={handlemenuOpen(false)}
            onKeyDown={handlemenuOpen(false)}
        >
            {/* List of nav links */}
            <List>
                <Box className={classes.brand}>
                    <img src={logo} alt="" />
                </Box>

                <ListItem button className={classes.listItem}>
                    <Link to={"/"} className={classes.linkTag}>
                        <ListItemText primary={"Home"} />
                    </Link>
                </ListItem>
                <ListItem button className={classes.listItem}>
                    <Link to={"/our-products"} className={classes.linkTag}>
                        <ListItemText primary={"Our Products"} />
                    </Link>
                </ListItem>
                <ListItem button className={classes.listItem}>
                    <Link to={"/blogs"} className={classes.linkTag}>
                        <ListItemText primary={"Blogs"} />
                    </Link>
                </ListItem>
                <ListItem button className={classes.listItem}>
                    <Link to={"/videos"} className={classes.linkTag}>
                        <ListItemText primary={"Videos"} />
                    </Link>
                </ListItem>
                <ListItem button className={classes.listItem}>
                    <Link to={"/about"} className={classes.linkTag}>
                        <ListItemText primary={"About Us"} />
                    </Link>
                </ListItem>
                <ListItem button className={classes.listItem}>
                    <Link to={"/ContactUs"} className={classes.linkTag}>
                        <ListItemText primary={"Contact Us"} />
                    </Link>
                </ListItem>
            </List>
            <Divider />
            <List className={classes.belowDivider}>
                {/* Direct to products page */}
                <Box boxShadow={2} className={classes.buyPrograms}>
                    <Link to={"/our-products"}>BUY OUR PROGRAMS</Link>
                </Box>

                {/* To open sialog box for students register */}
                {/* handleOpenCLick - handles the opening of the disalog box, passes as prop to the component */}

                <Button
                    onClick={handleClickOpen}
                    variant="contained"
                    color="primary"
                    width="100%"
                >
                    Book Free Trial Now
                </Button>
            </List>
        </div>
    );

    return (
        <AppBar className={classes.appBar}>
            <CssBaseline />
            <Toolbar className={classes.toolBar}>
                <Box className={classes.brand}>
                    <Link to={"/"}>
                        <img src={logo} alt="" />
                    </Link>
                </Box>
                <div className={classes.rightItems}>
                    <Fragment key={anchor} style={{ marginLeft: 'auto' }}>
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
                                <span
                                    id="basic-button"
                                    style={{ marginLeft: "10px", cursor: "pointer" }}
                                    aria-controls={open ? 'basic-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClick}
                                >
                                    {studentData.name.trim().split(' ')[0]} &#9660;
                                </span>
                                <Menu
                                    id="basic-menu"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                    }}
                                    className="menu"
                                >
                                    <MenuItem onClick={handleClose}><Link to="/myprofile"> My Profile</Link></MenuItem>
                                    <MenuItem onClick={handleChangePassword}><img className={classes.keyIcon} src={keyIcon} alt="img" /> Change Password</MenuItem>
                                    <MenuItem onClick={handleClose}><Link to="/myprograms"> My Programs</Link></MenuItem>
                                    <MenuItem onClick={handleContact}>Contact US</MenuItem>
                                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                                </Menu>
                            </>)}

                        <IconButton
                            aria-label="Open Menu"
                            onClick={handlemenuOpen(true)}
                            edge="start"
                        >
                            <MenuIcon
                                fontSize="large"
                                style={{ color: "#fff", width: "40px", marginLeft: "20px" }}
                            />
                        </IconButton>
                        <SwipeableDrawer
                            anchor={anchor}
                            open={state}
                            onClose={handlemenuOpen(false)}
                            onOpen={handlemenuOpen(true)}
                        >
                            {list}
                        </SwipeableDrawer>
                    </Fragment>
                </div>

            </Toolbar>
        </AppBar>
    );
};

export default PhoneNavbar;
