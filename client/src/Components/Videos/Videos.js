import {
    Box,
    CircularProgress,
    Container,
    Typography,
} from "@material-ui/core";
import React, { Fragment, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { getAllPlayLists, getAllVideos } from "../../utils/videos";

const useStyles = makeStyles((theme) => ({
    videosPage: {
        marginTop: "50px",
        paddingTop: "80px",
    },
    videosContainer: {
        display: "flex",
        flexDirection: "column",
    },
    videosHeader: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        marginBottom: "50px",
        "& > h3": {
            color: "#42474C",
            fontWeight: "600",
            marginBottom: "10px",
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
    topVideo: {
        display: "flex",
        justifyContent: "center",
        marginBottom: "70px",
        alignSelf: "center",
    },
    videoFrame: {
        width: "560px",
        height: "315px",
        [theme.breakpoints.down(600)]: {
            width: "450px",
            height: "250px",
        },
        [theme.breakpoints.down(500)]: {
            width: "300px",
            height: "200px",
        },
    },
    videoPlayLists: {
        display: "flex",
        flexDirection: "column",
        marginBottom: "30px",
    },
    videoPlayList: {
        display: "flex",
        flexDirection: "column",
        marginBottom: "50px",
    },
    playListHeader: {
        marginBottom: "15px",
        "& h4": {
            fontWeight: "600",
        },
    },
    playList: {
        display: "flex",
        flexDirection: "row",
        overflow: "auto",
        marginBottom: "",
    },
    listVideo: {
        display: "flex",
        flexDirection: "column",
        width: "370px",
        padding: "10px",
        margin: "10px 20px",
        marginLeft: "0px",
        border: "0.5px solid lightgray",
        cursor: "pointer",

        "&:hover": {
            transitionDuration: "0.4s",
            transitionTimingFunction: "ease-in-out",
            transform: "scale(1.001)",
            boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        },
        [theme.breakpoints.down(400)]: {
            width: "80%",
        },
    },
    videoThumb: {
        display: "flex",
        alignItems: "center",
        width: "100%",
        height: "190px",
        marginBottom: "10px",
        "& img": {
            width: "100%",
        },
    },
    videoDetails: {
        display: "flex",
        flexDirection: "column",
        padding: "10px",
        "& > h6": {
            whiteSpace: "nowrap",
            lineHeight: "1em",
            overflow: "hidden",
            textOverflow: "ellipsis",
            marginBottom: "10px",
            fontSize: "14px",
            color: "#1A2E39",
            fontWeight: "600",
            wordWrap: "break-word",
        },
        "& > p": {
            height: "76px",
            minHeight: "76px",
            overflow: "hidden",
            fontSize: "12px",
            color: "#484848",
            textAlign: "justify",
        },
    },
    circularProgress: {
        display: "flex",
        justifyContent: "center",
        marginTop: "30vh",
    },
    noVideos: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "40vh",
    },
}));

const Videos = () => {
    const classes = useStyles();

    // Hooks for handling id of the top video
    const [topVideoId, setTopVideoId] = useState(null);

    // Hooks for handling playlist, videos fetch process
    const [playlists, setPlaylists] = useState([]); // Storing the playlists details
    const [videos, setVideos] = useState([]); // Storing all the videos
    const [videoLoader, setVideoLoader] = useState(true); // loader, while the playlists and videos are still fetched

    // Handling change in youtube video id for the top video
    const handleTopVideoChange = (videoId) => {
        setTopVideoId(videoId);
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    };

    // Scrolling to top while page renders
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0 });
    }, []);

    // Fetching all the playlist
    useEffect(() => {
        setVideoLoader(true);
        getAllPlayLists().then((res) => setPlaylists(res));
    }, []);

    // fetching all the videos
    useEffect(() => {
        setVideoLoader(true);
        getAllVideos().then((res) => setVideos(res));
        setVideoLoader(false);
    }, []);

    return (
        <Box className={classes.videosPage}>
            <Container className={classes.videosContainer}>
                <Box className={classes.videosHeader}>
                    <Typography variant="h3">Videos</Typography>
                    <Typography variant="body2" component={"p"}>
                        <Link className={classes.headerLink} to={"/"}>
                            Home
                        </Link>{" "}
                        &#9656; Videos
                    </Typography>
                </Box>
                {videoLoader ? (
                    // If the videos are still being fetched from database
                    <Box className={classes.circularProgress}>
                        <CircularProgress />
                    </Box>
                ) : videos.length === 0 ? (
                    // If videos hook empty
                    <Box className={classes.noVideos}>
                        <Typography variant="body2">
                            ~No videos to show yet~
                        </Typography>
                    </Box>
                ) : (
                    <Fragment>
                        {/* I frame for playing the video on top with selected if */}
                        <Box
                            boxShadow={1}
                            className={classes.topVideo}
                            component="div"
                        >
                            <iframe
                                className={classes.videoFrame}
                                src={`https://www.youtube.com/embed/${
                                    topVideoId
                                        ? topVideoId
                                        : videos[0]?.youtubeVidoeId // if value for top video Id is null, then set it to first video in videos
                                }?autostart=0&modestbranding=0&rel=0&fs=0&showinfo=0`}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </Box>

                        {/* Displaying all the videos and the playlists */}
                        <Box className={classes.videoPlayLists}>
                            {/* Maps through playing */}
                            {playlists.map((playlist) => (
                                <Box
                                    key={playlist.id}
                                    className={classes.videoPlayList}
                                >
                                    <Box className={classes.playListHeader}>
                                        <Typography variant="h4">
                                            {playlist.title}
                                        </Typography>
                                    </Box>
                                    <Box className={classes.playList}>
                                        {/* Maps through videos */}
                                        {videos.map((video) =>
                                            video.playListId === playlist.id ? ( //Selects videos with playlist equal to current playlist
                                                <Box
                                                    // On click to set id of top video as current video id
                                                    onClick={() =>
                                                        handleTopVideoChange(
                                                            video.youtubeVidoeId
                                                        )
                                                    }
                                                    key={video.id}
                                                    className={
                                                        classes.listVideo
                                                    }
                                                >
                                                    <Box
                                                        overflow={"hidden"}
                                                        className={
                                                            classes.videoThumb
                                                        }
                                                    >
                                                        <img
                                                            // https://img.youtube.com/vi/${video.youtubeVidoeId}/0.jpg, fetches the thumbnail for the video
                                                            src={`https://img.youtube.com/vi/${video.youtubeVidoeId}/0.jpg`}
                                                            alt=""
                                                        />
                                                    </Box>
                                                    <Box
                                                        className={
                                                            classes.videoDetails
                                                        }
                                                    >
                                                        {/* Video details */}
                                                        <Typography variant="h6">
                                                            {video.title}
                                                        </Typography>
                                                        <Typography
                                                            component={"p"}
                                                            variant="subtitle2"
                                                        >
                                                            {video.description}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            ) : (
                                                <Fragment></Fragment>
                                            )
                                        )}
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    </Fragment>
                )}
            </Container>
        </Box>
    );
};

export default Videos;
