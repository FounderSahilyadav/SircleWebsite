import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    CircularProgress,
    Container,
    TextField,
    Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useParams } from "react-router-dom";
import MuiAlert from "@material-ui/lab/Alert";
import {
    fetchSingleBlog,
    getVerifiedCOmments,
    postComment,
} from "../../utils/blogs";
import { ExpandMoreOutlined } from "@material-ui/icons";

// MUI alerts for displaying altert messages (success or errors)
const Alert = (props) => {
    return <MuiAlert {...props} />;
};

const useStyles = makeStyles((theme) => ({
    blog: {
        paddingTop: "40px",
        marginTop: "72px",
        marginBottom: "50px",
    },
    blogHeader: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        marginBottom: "40px",
        textAlign: "center",
        "& > h3": {
            color: "#42474C",
            fontWeight: "600",
            margin: "0 50px",
            marginBottom: "20px",
            fontSize: "42px",
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
    blogContents: {
        marginBottom: "80px",
        minHeight: "60vh",
    },
    blogDetails: {
        margin: "10px 0px",
        color: "#5c656d",
    },
    blogPicture: {
        margin: "20px 0px",
        "& > img": {
            width: "100%",
            height: "auto",
        },
    },
    blogText: {
        display: "flex",
        flexDirection: "column",
        "& p": {
            margin: "15px 0",
            textAlign: "justify",
            lineHeight: "36px",
            color: "#5c656d",
            "& *": {
                fontSize: "18px !important",
            },
        },
        "& a": {
            color: "#0075c1 !important",
            fontWeight: "bolder !important",
            textDecoration: "none",
        },
        "& img": {
            alignSelf: "center",
        },
    },

    blogComment: {
        margin: "30px 0",
        padding: "20px",
        border: "1px solid lightgray",
        "& > h5": {
            margin: "20px 0",
        },
    },
    tiltedTriangle: {
        margin: "0 5px",
    },
    noBlogFound: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "60vh",
        "& > div": {
            width: "100%",
        },
    },
    circularProgress: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "70vh",
    },
    comments: {
        marginBottom: "40px",
    },
    commentsList: {
        display: "flex",
        flexDirection: "column",
    },
    comment: {
        padding: "10px 20px",
        marginBottom: "10px",
        "& > p": {
            marginBottom: "5px",
            fontWeight: "bold",
        },
        "& > small": {
            fontSize: "12px",
            color: "gray",
            fontStyle: "italic",
        },
    },
    noComments: {
        display: "flex",
        justifyContent: "center",
    },
}));

// Initial state for the blog
const initialState = {
    id: "",
    title: "",
    date: new Date(),
    content: "",
    coverPicture: "",
};

// Months array  for blog date
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

// Initial state for the comment
const commentInitialState = {
    name: "",
    email: "",
    comment: "",
};

const Blog = () => {
    const classes = useStyles();

    // Blog details and fetching handler hooks
    const [blog, setBlog] = useState(initialState); // Hooks for storing all the blog details
    const [loader, setLoader] = useState(true); // Loader hook while the comment is still being loaded
    const [blogError, setBlogError] = useState(null); //If any error occured while fetching the blog

    // Getting the blog id from the url
    const { id } = useParams(); // useParam hook from react-router-dom

    // Hooks for loading the comments for the blog
    const [comments, setComments] = useState([]); // Holding all the comment
    const [commentsLoader, setCommentsLoader] = useState(true); // Loader while the comments are being fetched
    const [commentsError, setCommentsError] = useState(true); // If any error occured while fetching comments

    // Hooks for handling details and upload process results of new comment
    const [commentDetails, setCommentDetails] = useState(commentInitialState); // New Comment details hook
    const [commentError, setCommentError] = useState(null); // If an error occured while submitting the comment
    const [commentLoader, setCommentLoader] = useState(false); // While the comment submission is still in process
    const [commentSuccess, setCommentSuccess] = useState(null); // If comment submission was successfull

    // Scroll to top at rendering of the page
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0 });
    }, []);

    // Fetching the blog from the databse
    useEffect(() => {
        setLoader(true);
        fetchSingleBlog(id, setBlogError).then((data) => setBlog(data)); // fetchSingleBlog function for fetching single blog by id
        setLoader(false);
    }, [id]); // dependency array, change id triggers the use effect

    // Fetching all the verified comments from the databse
    useEffect(() => {
        setCommentsLoader(true);
        getVerifiedCOmments(id, setCommentsError).then((res) =>
            setComments(res)
        );
        setCommentsLoader(false);
    }, [id]);

    // Handling change in details of new comments
    // Saving details in commentDetails hook
    const handleCommentDetailsChange = (event) => {
        setCommentDetails({
            ...commentDetails,
            [`${event.target.name}`]: event.target.value,
        });
    };

    // Handling submission of a new comment
    const handleCommentSubmit = () => {
        postComment(
            commentDetails,
            id,
            setCommentLoader,
            setCommentError,
            setCommentSuccess
        );
    };
    return (
        <Box className={classes.blog}>
            {/* Loader while the blog is being fetched from the database */}
            {loader ? (
                <Box className={classes.circularProgress} open={loader}>
                    <CircularProgress color="inherit" />
                    <Typography variant="h6">Loading...</Typography>
                </Box>
            ) : blog ? (
                <Container>
                    <Box className={classes.blogHeader}>
                        <Typography variant="h3">{blog.title}</Typography>
                        <Typography variant="body2" component={"p"}>
                            <Link className={classes.headerLink} to={"/"}>
                                Home
                            </Link>{" "}
                            <Box
                                component={"span"}
                                className={classes.tiltedTriangle}
                            >
                                &#9656;
                            </Box>
                            <Link className={classes.headerLink} to={"/blogs"}>
                                Blogs
                            </Link>{" "}
                            <Box
                                component={"span"}
                                className={classes.tiltedTriangle}
                            >
                                &#9656;
                            </Box>{" "}
                            {blog.title}
                        </Typography>
                    </Box>
                    <Box className={classes.blogContents}>
                        {/* Cover picture for the blog */}
                        <Box className={classes.blogPicture}>
                            <img src={blog.coverPicture} alt="" />
                        </Box>

                        {/* Contents of the blog */}
                        <Box className={classes.blogContent}>
                            {/* Blog post date details */}
                            <Box className={classes.blogDetails}>
                                <Typography component={"p"} variant="body2">
                                    {
                                        months[
                                            new Date(`${blog.date}`).getMonth()
                                        ]
                                    }{" "}
                                    {new Date(`${blog.date}`).getDate()},{" "}
                                    {new Date(`${blog.date}`).getFullYear()}
                                    <Box
                                        component={"span"}
                                        className={classes.tiltedTriangle}
                                    >
                                        &#9656;
                                    </Box>{" "}
                                    by Sircle
                                </Typography>
                            </Box>

                            {/* Setting up the blog fetched from the database */}
                            {/* Using dangerouslySetInnerHTML to set blog details from a string  of html tags*/}
                            <Box
                                dangerouslySetInnerHTML={{
                                    __html: blog.content,
                                }}
                                className={classes.blogText}
                            ></Box>
                        </Box>
                    </Box>

                    {/* For all the comments for the blog */}
                    <Box className={classes.comments}>
                        {/* Material UI accordian, provides a drop down option */}
                        <Accordion className={classes.commentsAccordian}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreOutlined />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography
                                    className={classes.commentsAccordianHeading}
                                >
                                    Comments
                                </Typography>
                            </AccordionSummary>

                            {/* Displaying all the comments as a list */}
                            <AccordionDetails className={classes.commentsList}>
                                {/* Displaying error alert if couldn't fetch comments from the databse */}
                                {commentsError ? (
                                    <Alert severity="error">
                                        {commentsError}
                                    </Alert>
                                ) : (
                                    ""
                                )}
                                {commentsLoader ? (
                                    <Box className={classes.commentsProgress}>
                                        <CircularProgress />
                                    </Box>
                                ) : (
                                    // Mapping through comments array
                                    comments.map((comment) => (
                                        <Box
                                            boxShadow={1}
                                            className={classes.comment}
                                        >
                                            <Typography variant="body2">
                                                {comment.name}
                                            </Typography>
                                            <Typography
                                                component={"small"}
                                                variant="subtitle2"
                                            >
                                                "{comment.comment}"
                                            </Typography>
                                        </Box>
                                    ))
                                )}
                                {/* If no comments for the blog */}
                                {!commentsLoader && comments.length === 0 ? (
                                    <Box className={classes.noComments}>
                                        <Typography variant="body2">
                                            No Comments
                                        </Typography>
                                    </Box>
                                ) : (
                                    <></>
                                )}
                            </AccordionDetails>
                        </Accordion>
                    </Box>

                    {/* Comment form for the blog */}
                    <Box className={classes.blogComment}>
                        <Typography variant="h5">Leave a Comment!</Typography>
                        <Typography variant="body2">
                            Your email address will not be published. Required
                            fields are marked *
                        </Typography>

                        {/* Alerts for comment submission result */}
                        {commentError ? (
                            <Alert severity="error">{commentError}</Alert>
                        ) : (
                            ""
                        )}
                        {commentSuccess ? (
                            <Alert severity="success">{commentSuccess}</Alert>
                        ) : (
                            ""
                        )}

                        {/* Comment Fields */}
                        <Box className={classes.commentForm}>
                            <TextField
                                name="name"
                                className={classes.textField}
                                placeholder="Name *"
                                fullWidth
                                size="small"
                                margin="normal"
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={commentDetails.name}
                                onChange={handleCommentDetailsChange}
                            />
                            <TextField
                                name="email"
                                className={classes.textField}
                                placeholder="Email"
                                fullWidth
                                size="small"
                                margin="normal"
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={commentDetails.email}
                                onChange={handleCommentDetailsChange}
                            />
                            <TextField
                                name="comment"
                                className={classes.textField}
                                placeholder="Leave a comment *"
                                type={"number"}
                                fullWidth
                                multiline
                                minRows={4}
                                margin="normal"
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={commentDetails.comment}
                                onChange={handleCommentDetailsChange}
                            />
                            {commentLoader ? (
                                <CircularProgress />
                            ) : (
                                <Button
                                    onClick={handleCommentSubmit}
                                    style={{ marginTop: "15px" }}
                                    variant="contained"
                                    color="primary"
                                    width="100%"
                                >
                                    Post Comment
                                </Button>
                            )}
                        </Box>
                    </Box>
                </Container>
            ) : (
                // If couldn't find blog for the id or some error occured
                <Container className={classes.noBlogFound}>
                    <Alert severity="error">{blogError}</Alert>
                </Container>
            )}
        </Box>
    );
};

export default Blog;
