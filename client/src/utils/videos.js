import Axios from "../Axios";
import qs from "qs";

// Validate playlist details
const validatePlayList = (title, setError) => {
    if (!title || title.length === 0) {
        setError("Playlist title is required");
        return false;
    }
    return true;
};

// Validate video details
const validateVideo = (videoDetails, setError) => {
    const { title, description, youtubeVidoeId, playListId } = videoDetails;
    if (!title || title.length === 0) {
        setError("Video title is required!");
        return false;
    }
    if (!playListId || playListId.length === 0) {
        setError("Select Playlist!");
        return false;
    }
    if (!youtubeVidoeId || youtubeVidoeId.length === 0) {
        setError("Youtube video ID is required!");
        return false;
    }
    if (!description || description.length === 0) {
        setError("Video description is required!");
        return false;
    }
    return true;
};

// Fetch all playlists
export const getAllPlayLists = async () => {
    try {
        const response = await Axios({
            method: "GET",
            url: "/playlists",
        });
        return response.data;
    } catch (err) {
        return [];
    }
};

// Delete a playlist (admin)
export const deletePlayList = (id) => {
    if (id) {
        try {
            Axios({
                method: "DELETE",
                url: `/playlists/delete_playlist?playListId=${id}`,
            });
            return true;
        } catch (err) {
            return false;
        }
    }
};

// add new playlist (amdin)
export const addNewPlayList = (title, setLoader, setError, setSuccess) => {
    setError(null);
    setSuccess(null);
    setLoader(true);
    if (validatePlayList(title, setError)) {
        try {
            Axios({
                method: "POST",
                url: "/playlists/new_playlist",
                data: qs.stringify({ title }),
                headers: {
                    "Content-type":
                        "application/x-www-form-urlencoded;charset=utf-8",
                },
            });
            setSuccess("Playlist added");
            setLoader(false);
            return true;
        } catch (err) {
            setError(err.response.data);
            setLoader(false);
            return false;
        }
    } else {
        setLoader(false);
        return false;
    }
};

// Fetch all videos
export const getAllVideos = async () => {
    try {
        const result = await Axios({ method: "GET", url: "videos/all_videos" });
        return result.data;
    } catch (err) {
        return [];
    }
};

// Add a new video (admin)
export const addNewVideo = (videoDetails, setLoader, setError, setSuccess) => {
    setLoader(true);
    setError(null);
    setSuccess(null);

    if (validateVideo(videoDetails, setError)) {
        try {
            Axios({
                method: "POST",
                url: "/videos/new_video",
                data: qs.stringify({ ...videoDetails }),
                headers: {
                    "Content-type":
                        "application/x-www-form-urlencoded;charset=utf-8",
                },
            });
            setSuccess("Video saved!");
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

// Delete a video (admin)
export const deleteVideo = (id, setError, setSuccess) => {
    setError(null);
    setSuccess(null);
    try {
        if (id) {
            Axios({
                method: "DELETE",
                url: `/videos/delete_video?videoId=${id}`,
            });
            setSuccess("Video deleted");
            return true;
        } else {
            setError("Couldn't delete videos");
            return false;
        }
    } catch (err) {
        setError("Couldn't delete videos");
        return false;
    }
};
