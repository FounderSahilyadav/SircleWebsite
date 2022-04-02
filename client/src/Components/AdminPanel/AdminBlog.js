import {
    Box,
    Button,
    CircularProgress,
    Container,
    TextField,
    Typography,
} from "@material-ui/core";
import React, { Fragment, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
    EditorState,
    convertToRaw,
    convertFromHTML,
    convertFromRaw,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import AdminNav from "./AdminNav";
import {
    fetchSingleBlog,
    getUnVerifiedComments,
    updateBlog,
    verifyComment,
} from "../../utils/blogs";
import MuiAlert from "@material-ui/lab/Alert";
import { useParams } from "react-router-dom";
import { useStateValue } from "../../StateProvider";
import AdminLogin from "./AdminLogin";

const useStyles = makeStyles((theme) => ({
    adminBlogHeader: {
        margin: "50px 0px",
        "& > h3": {
            fontWeight: "bold",
        },
    },
    blogEditor: {
        marginBottom: "30px",
    },
    blogPreview: {
        display: "flex",
        flexDirection: "column",
        borderRadius: "10px",
        border: "1px solid lightgray",
        padding: "20px",
        marginBottom: "30px",
        width: "100%",
        "& > img": {
            alignSelf: "center",
        },
        "& span": {
            width: "100%",
        },
    },
    blogComments: {
        marginBottom: "40px",
        "& > h5": {
            marginBottom: "20px",
        },
    },
    blogCommentList: {
        maxHeight: "80vh",
        overflow: "auto",
    },
    blogComment: {
        padding: "10px 20px",
        marginBottom: "20px",
    },
}));

const Alert = (props) => {
    return <MuiAlert {...props} />;
};

const AdminBlog = () => {
    const classes = useStyles();
    const [{ admin }] = useStateValue(); // Admin from context API

    const { id } = useParams(); // Getting blog id from url

    // Blog content state and blog details handler
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [blogDetails, setBlogDetails] = useState({
        title: "",
        coverPicture: "",
        date: "",
    });

    // Blog fetch process handlers
    const [blogLoader, setBlogLoader] = useState(false); // Loader, while the blog is being updated
    const [blogError, setBlogError] = useState(null); // If an error occured while updating blog
    const [blogSuccess, setBlogSuccess] = useState(null); // If blog was updated successfully

    const [comments, setComments] = useState([]); // Unverified comments for the blog
    const [commentsError, setCommentsError] = useState(null); // If an error occured while fetching comments

    // On editor state change
    const onStateChange = (editorState) => {
        setEditorState(editorState);
    };

    // On other blog details change
    const handleBlogDetailsChange = (event) => {
        setBlogDetails({
            ...blogDetails,
            [`${event.target.name}`]: event.target.value,
        });
    };

    // Handle blog updates
    const handleBlogUpdate = () => {
        const blogContent = {
            ...blogDetails,
            content: draftToHtml(convertToRaw(editorState.getCurrentContent())),
        };
        updateBlog(
            blogContent,
            id,
            setBlogLoader,
            setBlogError,
            setBlogSuccess
        );
    };

    // handle Verifies comment in databse (update comment ststus)
    const handleVerifyComment = (id) => {
        if (verifyComment(id)) {
            setComments(() => {
                return comments.filter((comment) => comment.id !== id);
            });
        }
    };

    useEffect(() => {
        fetchSingleBlog(id, setBlogError).then((res) => {
            setBlogDetails({
                title: res.title,
                coverPicture: res.coverPicture,
                date: res.date,
            });
            const currentState = convertFromHTML(res.content);
            setEditorState(
                EditorState.createWithContent(
                    convertFromRaw({
                        entityMap: currentState.entityMap,
                        blocks: currentState.contentBlocks,
                    })
                )
            );
        });
    }, [id]);

    useEffect(() => {
        getUnVerifiedComments(id, setCommentsError).then((res) =>
            setComments(res)
        );
    }, [id]);

    return admin ? (
        <Fragment>
            <AdminNav />
            <Box style={{ paddingTop: "72px", minHeight: "100vh" }}>
                <Container>
                    <Box className={classes.adminBlogHeader}>
                        <Typography variant={"h3"}>Update/Edit blog</Typography>
                    </Box>
                    {blogError ? (
                        <Alert severity="error">{blogError}</Alert>
                    ) : (
                        ""
                    )}
                    {blogSuccess ? (
                        <Alert severity="success">{blogSuccess}</Alert>
                    ) : (
                        ""
                    )}
                    <Box className={classes.blogEditor}>
                        <TextField
                            name="title"
                            className={classes.textField}
                            placeholder="Blog Title"
                            type={"text"}
                            fullWidth
                            size="small"
                            margin="normal"
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={blogDetails.title}
                            onChange={handleBlogDetailsChange}
                        />
                        <TextField
                            name="coverPicture"
                            className={classes.textField}
                            placeholder="Blog cover picture url"
                            type={"url"}
                            fullWidth
                            size="small"
                            margin="normal"
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={blogDetails.coverPicture}
                            onChange={handleBlogDetailsChange}
                        />
                        <Editor
                            editorStyle={{
                                height: "300px",
                                border: "1px solid lightgray",
                                marginBottom: "30px",
                            }}
                            editorState={editorState}
                            onEditorStateChange={onStateChange}
                            wrapperClassName="demo-wrapper"
                            editorClassName="demo-editor"
                        />
                        {blogLoader ? (
                            <CircularProgress />
                        ) : (
                            <Button
                                onClick={handleBlogUpdate}
                                variant="contained"
                                color="primary"
                            >
                                UPDATE BLOG
                            </Button>
                        )}
                    </Box>
                    <Box className={classes.blogComments}>
                        <Typography variant="h5">Blog Comments</Typography>
                        {commentsError ? (
                            <Alert severity="error">{commentsError}</Alert>
                        ) : (
                            ""
                        )}
                        <Box className={classes.blogCommentList}>
                            {comments.map((comment) => (
                                <Box
                                    boxShadow={2}
                                    className={classes.blogComment}
                                    key={comment.id}
                                >
                                    <Typography variant="subtitle2">
                                        Name
                                    </Typography>
                                    <Typography variant="body2">
                                        {comment.name}
                                    </Typography>
                                    <Typography variant="subtitle2">
                                        Comment
                                    </Typography>
                                    <Typography variant="body2">
                                        {comment.comment}
                                    </Typography>
                                    <Button
                                        onClick={() =>
                                            handleVerifyComment(comment.id)
                                        }
                                        variant="contained"
                                        color="primary"
                                    >
                                        Verify Comment
                                    </Button>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </Container>
            </Box>
        </Fragment>
    ) : (
        <AdminLogin />
    );
};

export default AdminBlog;
