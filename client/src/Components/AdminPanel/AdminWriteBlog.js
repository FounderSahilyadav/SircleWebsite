import {
    Box,
    Button,
    CircularProgress,
    Container,
    TextField,
    Typography,
} from "@material-ui/core";
import React, { Fragment, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import AdminNav from "./AdminNav";
import { uploadBlog } from "../../utils/blogs";
import MuiAlert from "@material-ui/lab/Alert";
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
}));

const Alert = (props) => {
    return <MuiAlert {...props} />;
};

const AdminWriteBlog = () => {
    const classes = useStyles();
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [blogDetails, setBlogDetails] = useState({
        title: "",
        coverPicture: "",
    });
    const [blogLoader, setBlogLoader] = useState(false);
    const [blogError, setBlogError] = useState(null);
    const [blogSuccess, setBlogSuccess] = useState(null);

    const [{ admin }] = useStateValue();

    const onStateChange = (editorState) => {
        setEditorState(editorState);
    };
    const handleBlogDetailsChange = (event) => {
        setBlogDetails({
            ...blogDetails,
            [`${event.target.name}`]: event.target.value,
        });
    };

    const handleBlogSubmit = () => {
        const blogContent = {
            ...blogDetails,
            content: draftToHtml(convertToRaw(editorState.getCurrentContent())),
        };
        uploadBlog(blogContent, setBlogLoader, setBlogError, setBlogSuccess);
    };
    return admin ? (
        <Fragment>
            <AdminNav />
            <Box style={{ paddingTop: "72px", minHeight: "100vh" }}>
                <Container>
                    <Box className={classes.adminBlogHeader}>
                        <Typography variant={"h3"}>Write blog</Typography>
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
                                onClick={handleBlogSubmit}
                                variant="contained"
                                color="primary"
                            >
                                POST BLOG
                            </Button>
                        )}
                    </Box>
                    <Box>
                        <Typography
                            variant="h5"
                            style={{ fontWeight: "bold", marginBottom: "20px" }}
                        >
                            Blog Preview
                        </Typography>
                        <Box
                            className={classes.blogPreview}
                            dangerouslySetInnerHTML={{
                                __html: draftToHtml(
                                    convertToRaw(
                                        editorState.getCurrentContent()
                                    )
                                ),
                            }}
                        ></Box>
                    </Box>
                </Container>
            </Box>
        </Fragment>
    ) : (
        <AdminLogin />
    );
};

export default AdminWriteBlog;
