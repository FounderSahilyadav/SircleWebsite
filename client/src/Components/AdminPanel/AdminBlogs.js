import {
    Box,
    Button,
    CircularProgress,
    Container,
    Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import StackGrid from "react-stack-grid";
import { useMediaQuery, useTheme } from "@material-ui/core";
import { Fragment, useState } from "react";
import { deleteBlog, fetchAllBlogs } from "../../utils/blogs";
import AdminNav from "./AdminNav";
import MuiAlert from "@material-ui/lab/Alert";
import { useStateValue } from "../../StateProvider";
import AdminLogin from "./AdminLogin";

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
}));

const Alert = (props) => {
    return <MuiAlert {...props} />;
};

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

const AdminBlogs = () => {
    const classes = useStyles();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down(400));
    const isSmallerMobile = useMediaQuery(theme.breakpoints.down(300));

    const [blogs, setBlogs] = useState([]);
    const [blogsLoader, setBlogsLoader] = useState(true);
    const [blogsError, setBlogsError] = useState(null);

    const [{ admin }] = useStateValue();

    const handleBlogDelete = (id) => {
        if (deleteBlog(id)) {
            setBlogs(() => {
                return blogs.filter((blog) => blog.id !== id);
            });
        }
    };

    useState(() => {
        setBlogsLoader(true);
        fetchAllBlogs(setBlogsError).then((results) => setBlogs(results));
        setBlogsLoader(false);
    }, []);
    return admin ? (
        <Fragment>
            <AdminNav />
            <Box className={classes.blogsPage}>
                <Container>
                    <Box className={classes.blogsHeader}>
                        <Typography variant="h3">
                            Remark To Become Remarkable
                        </Typography>
                    </Box>
                    <Box className={classes.blogs}>
                        {blogsError ? (
                            <Alert severity="error">{blogsError}</Alert>
                        ) : (
                            ""
                        )}
                        {blogsLoader ? (
                            <Box className={classes.circularProgress}>
                                <CircularProgress />
                            </Box>
                        ) : (
                            <StackGrid
                                gutterWidth={30}
                                gutterHeight={50}
                                monitorImagesLoaded={true}
                                style={{ marginTop: "100px" }}
                                columnWidth={
                                    isMobile
                                        ? isSmallerMobile
                                            ? 200
                                            : 280
                                        : 370
                                }
                            >
                                {blogs.map((blog) => (
                                    <Box
                                        key={blog.id}
                                        className={classes.blog}
                                        style={{
                                            width: isMobile
                                                ? isSmallerMobile
                                                    ? "200px"
                                                    : "280px"
                                                : "370px",
                                        }}
                                    >
                                        <Box className={classes.blogTop}>
                                            <img
                                                src={blog.coverPicture}
                                                alt=""
                                            />
                                        </Box>
                                        <Box className={classes.blogBottom}>
                                            <Link to={`${blog.id}`}>
                                                <Typography variant="h5">
                                                    {blog.title}
                                                </Typography>
                                            </Link>
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
                                            <Button
                                                onClick={() =>
                                                    handleBlogDelete(blog.id)
                                                }
                                                variant="contained"
                                                color="primary"
                                            >
                                                DELETE BLOG
                                            </Button>
                                        </Box>
                                    </Box>
                                ))}
                            </StackGrid>
                        )}
                    </Box>
                </Container>
            </Box>
        </Fragment>
    ) : (
        <AdminLogin />
    );
};

export default AdminBlogs;
