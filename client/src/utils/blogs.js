import Axios from "../Axios";
import qs from "qs";

// Validate a comment before posting
const validateComment = (commentDetails, setError) => {
    const { name, comment } = commentDetails;
    if (!name || name.length === 0) {
        setError("Please enter your name.");
        return false;
    }
    if (!comment || comment.length === 0) {
        setError("Comment is required.");
        return false;
    }
    return true;
};

// Validate a blog before posting
const validateBlog = (blogDetails, setError) => {
    const { title, coverPicture, content } = blogDetails;
    if (!title || title.length === 0) {
        setError("Blog title is required");
        return false;
    }
    if (!coverPicture || coverPicture.length === 0) {
        setError("Blog cover picture url is required");
        return false;
    }
    if (!content || content.length === 0) {
        setError("Blog content is required");
        return false;
    }
    return true;
};

// fetch single blog by id
export const fetchSingleBlog = async (id, setError) => {
    setError(null);
    try {
        const results = await Axios({
            method: "GET",
            url: `blogs?id=${id}`,
        });
        return results.data;
    } catch (err) {
        setError("Couldn't fetch blog....");
    }
};

// Get  all blogs
export const fetchAllBlogs = async (setBlogsError) => {
    setBlogsError(null);
    try {
        const results = await Axios({ method: "GET", url: "blogs" });
        setBlogsError(null);
        return results.data;
    } catch (err) {
        console.log(err.message);
        setBlogsError("Couldn't load blogs. Some error occured");
        return [];
    }
};

// Upload new blog (admin)
export const uploadBlog = (blogDetails, setLoader, setError, setSuccess) => {
    setLoader(true);
    setError(null);
    setSuccess(null);
    if (validateBlog(blogDetails, setError)) {
        try {
            Axios({
                method: "POST",
                url: "/blogs/new_blog",
                data: qs.stringify({ ...blogDetails, date: new Date() }),
                headers: {
                    "Content-type":
                        "application/x-www-form-urlencoded;charset=utf-8",
                },
            });
            setSuccess("Blog Posted");
            setLoader(false);
            return true;
        } catch (err) {
            setLoader(false);
            setError(err.response.data);
            return false;
        }
    } else {
        setLoader(false);
        return false;
    }
};

// Update a blog (admin)
export const updateBlog = (
    blogDetails,
    id,
    setLoader,
    setError,
    setSuccess
) => {
    setLoader(true);
    setError(null);
    setSuccess(null);
    if (validateBlog(blogDetails, setError)) {
        try {
            Axios({
                method: "PATCH",
                url: `/blogs/update_blog?id=${id}`,
                data: qs.stringify({ ...blogDetails }),
                headers: {
                    "Content-type":
                        "application/x-www-form-urlencoded;charset=utf-8",
                },
            });
            setSuccess("Blog Updated");
            setLoader(false);
            return true;
        } catch (err) {
            setLoader(false);
            setError(err.response.data);
            return false;
        }
    } else {
        setLoader(false);
        return false;
    }
};

// Delete a blog (Admin)
export const deleteBlog = (id) => {
    if (id) {
        try {
            Axios({ method: "DELETE", url: `blogs/delete_blog?blogId=${id}` });
            return true;
        } catch (err) {
            return false;
        }
    } else {
        return false;
    }
};

// Post a comment
export const postComment = async (
    commentDetails,
    blogId,
    setLoader,
    setError,
    setSuccess
) => {
    setLoader(true);
    setError(null);
    setSuccess(null);
    if (validateComment(commentDetails, setError)) {
        try {
            const { name, comment, email } = commentDetails;
            if (!email || email.length === 0) {
                await Axios({
                    method: "POST",
                    url: "comments/new_comment",
                    data: qs.stringify({
                        name,
                        comment,
                        blogId,
                        date: new Date(),
                    }),
                    headers: {
                        "Content-type":
                            "application/x-www-form-urlencoded;charset=utf-8",
                    },
                });
            } else {
                await Axios({
                    method: "POST",
                    url: "blogs/new_comment",
                    data: qs.stringify({
                        ...commentDetails,
                        blogId,
                        date: new Date(),
                    }),
                });
            }

            setLoader(false);
            setSuccess("Comment Posted! Comment will appear once verified.");
        } catch (err) {
            setError(err.response.data);
            setLoader(false);
        }
    } else {
        setLoader(false);
    }
};

// Fetches verified comments for the database
export const getVerifiedCOmments = async (id, setError) => {
    setError(null);
    try {
        if (id) {
            const result = await Axios({
                method: "GET",
                url: `/comments?blogId=${id}`,
            });
            return result.data;
        } else {
            setError("Blog Id not available");
            return [];
        }
    } catch (err) {
        setError(err.response.data);
        return [];
    }
};

// Fetches unverified comments from the database
export const getUnVerifiedComments = async (id, setError) => {
    setError(null);
    try {
        if (id) {
            const result = await Axios({
                method: "GET",
                url: `/comments/unverified_comments?blogId=${id}`,
            });
            return result.data;
        } else {
            setError("Id not available");
            return [];
        }
    } catch (err) {
        setError(err.response.data);
        return [];
    }
};

// Verify a comment (Admin)
export const verifyComment = (id) => {
    try {
        if (id) {
            Axios({ method: "PATCH", url: `comments/verify_comment?id=${id}` });
            return true;
        } else {
            return false;
        }
    } catch (err) {
        return false;
    }
};
