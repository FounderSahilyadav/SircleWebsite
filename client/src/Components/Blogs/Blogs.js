import {
    Box,
    CircularProgress,
    Container,
    Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import StackGrid from "react-stack-grid";
import { useMediaQuery, useTheme } from "@material-ui/core";
import { useEffect, useState } from "react";
import { fetchAllBlogs } from "../../utils/blogs";
import MuiAlert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
    blogsPage: {
        paddingTop: "80px",
        marginTop: "72px",
        minHeight: "60vh",
    },
    blogsHeader: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        marginBottom: "20px",
        textAlign: "center",
        "& > h3": {
            color: "#42474C",
            fontWeight: "600",
            marginBottom: "10px",
            [theme.breakpoints.down(500)]: {
                fontSize: "30px",
            },
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
    blogs: {
        marginBottom: "50px",
    },
    blog: {
        maxWidth: "370px",
    },
    blogTop: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        width: "100%",
        borderRadius: "8px",
        marginBottom: "20px",
        "& > img": {
            width: "370px",
            maxWidth: "370px",
            height: "208px",
            borderRadius: "8px",
        },
    },
    blogBottom: {
        marginBottom: "10px",
        "& h5": {
            fontWeight: "600",
            fontSize: "22px",
            color: "#42474C",
            marginBottom: "15px",
            [theme.breakpoints.down(500)]: {
                fontSize: "18px",
            },
        },
        "& > a": {
            textDecoration: "none",
            fontWeight: "600",
        },
    },
    byLine: {
        display: "flex",
        flexWrap: "wrap",
        color: "#5c656d",
        marginBottom: "18px",
    },
    blogDescription: {
        height: "4.4em",
        overflow: "hidden",
        color: "#5c656d",
        fontSize: "16px",
        marginBottom: "10px",
        "& > p": {
            marginTop: "0px",
        },
    },
    circularProgress: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "50vh",
    },
    noBlogs: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "40vh",
    },
}));

const Alert = (props) => {
    return <MuiAlert {...props} />;
};

// Months array for displaying date for the blog
const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

const Blogs = () => {
    // Hooks for theme, checking display size
    const classes = useStyles();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down(400));
    const isSmallerMobile = useMediaQuery(theme.breakpoints.down(300));

    // Hooks for handling blogs details and fetching
    const [blogs, setBlogs] = useState([]); // Stores all the blogs
    const [blogsLoader, setBlogsLoader] = useState(true); // Hook for handling if the blogs are still loading
    const [blogsError, setBlogsError] = useState(null); // If an error ocuured while fetching the blog

    // Fetching the blogs
    useEffect(() => {
        setBlogsLoader(true);
        fetchAllBlogs(setBlogsError).then((results) => setBlogs(results));
        setBlogsLoader(false);
    }, []);

    // Scroll to top every time page loades
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0 });
    }, []);

    return (
        <Box className={classes.blogsPage}>
            <Container>
                <Box className={classes.blogsHeader}>
                    <Typography variant="h3">
                        Remark To Become Remarkable
                    </Typography>
                    <Typography variant="body2" component={"p"}>
                        <Link className={classes.headerLink} to={"/"}>
                            Home
                        </Link>{" "}
                        &#9656; Blogs
                    </Typography>
                </Box>
                <Box className={classes.blogs}>
                    {/* Error alert  if error ocuured while fetching the blog*/}
                    {blogsError ? (
                        <Alert severity="error">{blogsError}</Alert>
                    ) : (
                        ""
                    )}

                    {/* Loader if the blogs are not yet fetched from database */}
                    {blogsLoader ? (
                        <Box className={classes.circularProgress}>
                            <CircularProgress />
                            <Typography variant="body2">
                                Loading Blogs...
                            </Typography>
                        </Box>
                    ) : blogs.length === 0 ? (
                        // If no blogs are present in the database
                        <Box className={classes.noBlogs}>
                            <Typography variant="body2">
                                ~No blogs yet~
                            </Typography>
                        </Box>
                    ) : (
                        // Stackgrid library for displaying grid view of the blogs
                        <StackGrid
                            gutterWidth={30}
                            gutterHeight={50}
                            monitorImagesLoaded={true}
                            style={{ marginTop: "100px" }}
                            columnWidth={
                                isMobile ? (isSmallerMobile ? 200 : 280) : 370
                            }
                        >
                            {/* Mapping through the blogs array */}
                            {blogs.map((blog) => (
                                <Box
                                    key={blog.id}
                                    className={classes.blog}
                                    // Handles the width of each blog tab
                                    style={{
                                        width: isMobile
                                            ? isSmallerMobile
                                                ? "200px"
                                                : "280px"
                                            : "370px",
                                    }}
                                >
                                    <Box className={classes.blogTop}>
                                        {/* Blog cover picture */}
                                        <img src={blog.coverPicture} alt="" />
                                    </Box>
                                    <Box className={classes.blogBottom}>
                                        {/* DIrect to blogs page and display full blog */}
                                        <Link to={`${blog.id}`}>
                                            <Typography variant="h5">
                                                {blog.title}
                                            </Typography>
                                        </Link>

                                        {/* Blog by line, blog date */}
                                        <Box className={classes.byLine}>
                                            <Typography
                                                component={"p"}
                                                variant="subtitle2"
                                            >
                                                by Sircle
                                            </Typography>
                                            <Typography
                                                style={{
                                                    color: "#0075c1",
                                                    margin: "0 10px",
                                                }}
                                            >
                                                &#9656;
                                            </Typography>

                                            {/* Blog date */}
                                            <Typography>
                                                {
                                                    months[
                                                        new Date(
                                                            `${blog.date}`
                                                        ).getMonth()
                                                    ]
                                                }{" "}
                                                {new Date(
                                                    `${blog.date}`
                                                ).getDate()}
                                                ,{" "}
                                                {new Date(
                                                    `${blog.date}`
                                                ).getFullYear()}
                                            </Typography>
                                        </Box>

                                        {/* Setting up blog content */}
                                        <Box
                                            className={classes.blogDescription}
                                            dangerouslySetInnerHTML={{
                                                __html: blog.content,
                                            }}
                                        ></Box>

                                        {/* Direct to blog page */}
                                        <Link to={`${blog.id}`}>
                                            LEARN MORE &#10093;
                                        </Link>
                                    </Box>
                                </Box>
                            ))}
                        </StackGrid>
                    )}
                </Box>
            </Container>
        </Box>
    );
};

export default Blogs;
