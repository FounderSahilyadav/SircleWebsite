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
} from "@material-ui/core";
import { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import { useState } from "react";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

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
}));

const AdminNav = () => {
    const classes = useStyles();
    const anchor = "left";
    const [state, setState] = useState(false);

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
            <List>
                <Box className={classes.brand}>
                    <img src={logo} alt="" />
                </Box>

                <ListItem button className={classes.listItem}>
                    <Link to={"/administrator"} className={classes.linkTag}>
                        <ListItemText primary={"Faqs"} />
                    </Link>
                </ListItem>
                <ListItem button className={classes.listItem}>
                    <Link
                        to={"/administrator/testimonials"}
                        className={classes.linkTag}
                    >
                        <ListItemText primary={"Testimonials"} />
                    </Link>
                </ListItem>
                <ListItem button className={classes.listItem}>
                    <Link
                        to={"/administrator/blogs"}
                        className={classes.linkTag}
                    >
                        <ListItemText primary={"Blogs"} />
                    </Link>
                </ListItem>
                <ListItem button className={classes.listItem}>
                    <Link
                        to={"/administrator/write_blog"}
                        className={classes.linkTag}
                    >
                        <ListItemText primary={"Write Blog"} />
                    </Link>
                </ListItem>
                <ListItem button className={classes.listItem}>
                    <Link
                        to={"/administrator/videos"}
                        className={classes.linkTag}
                    >
                        <ListItemText primary={"Videos"} />
                    </Link>
                </ListItem>
                <ListItem button className={classes.listItem}>
                    <Link
                        to={"/administrator/institute-queries"}
                        className={classes.linkTag}
                    >
                        <ListItemText primary={"Institute Queries"} />
                    </Link>
                </ListItem>
                <ListItem button className={classes.listItem}>
                    <Link
                        to={"/administrator/students"}
                        className={classes.linkTag}
                    >
                        <ListItemText primary={"Registered Students"} />
                    </Link>
                </ListItem>
                <ListItem button className={classes.listItem}>
                    <Link
                        to={"/administrator/mentors"}
                        className={classes.linkTag}
                    >
                        <ListItemText primary={"Mentors"} />
                    </Link>
                </ListItem>
                <ListItem button className={classes.listItem}>
                    <Link
                        to={"/administrator/squad_members"}
                        className={classes.linkTag}
                    >
                        <ListItemText primary={"Team Members"} />
                    </Link>
                </ListItem>
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
                <Fragment key={anchor}>
                    <IconButton
                        aria-label="Open Menu"
                        onClick={handlemenuOpen(true)}
                        edge="start"
                    >
                        <MenuIcon
                            fontSize="large"
                            style={{ color: "#fff", width: "40px" }}
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
            </Toolbar>
        </AppBar>
    );
};

export default AdminNav;
