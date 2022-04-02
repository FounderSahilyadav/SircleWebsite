import {
    Box,
    Button,
    CircularProgress,
    Container,
    Divider,
    TextField,
    Typography,
} from "@material-ui/core";
import React, { Fragment, useEffect, useState } from "react";
import AdminNav from "./AdminNav";
import { makeStyles } from "@material-ui/core/styles";
import {
    addNewPlayList,
    addNewVideo,
    deletePlayList,
    deleteVideo,
    getAllPlayLists,
    getAllVideos,
} from "../../utils/videos";
import MuiAlert from "@material-ui/lab/Alert";
import { useStateValue } from "../../StateProvider";
import AdminLogin from "./AdminLogin";

const useStyles = makeStyles((theme) => ({
    adminVideoPanel: {
        paddingTop: "72px",
        minHeight: "60vh",
    },
    adminVideoHeader: {
        width: "100%",
        margin: "50px 0px",
        "& > h5": {
            fontWeight: "bold",
            textAlign: "center",
        },
    },
    playlistsSection: {
        padding: "20px",
        marginBottom: "30px",
    },
    addPlaylists: {
        marginBottom: "30px",
    },
    allPlayLists: {
        marginBottom: "30px",
        "& > h5": {
            marginBottom: "20px",
        },
    },
    playlistholder: {
        maxHeight: "400px",
        overflow: "auto",
        border: "1px solid lightgray",
        padding: "20px",
    },
    playList: {
        marginBottom: "10px",
        padding: "10px",
        "& > p": {
            marginBottom: "10px",
        },
    },
    videosSection: {
        padding: "20px",
        marginBottom: "30px",
    },
    videoFrom: {
        marginBottom: "30px",
    },
    allVideos: {
        marginTop: "30px",
        "& > h5": {
            marginBottom: "40px",
        },
    },
    videoPlayList: {
        display: "flex",
        flexDirection: "column",
        marginBottom: "50px",
    },
    playListHeader: {
        marginBottom: "15px",
    },
    playListVideos: {
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
        },
    },
}));

const Alert = (props) => {
    return <MuiAlert {...props} />;
};

const videoInitialState = {
    title: "",
    description: "",
    youtubeVidoeId: "",
    playListId: "",
};

const AdminVideos = () => {
    const classes = useStyles();

    const [playlists, setPlayLists] = useState([]);
    const [playlistsLoader, setPlaylistsLoader] = useState(false);

    const [playlistTitle, setPlaylistTitle] = useState("");
    const [playListaddLoader, setPlayListaddLoader] = useState(false);
    const [playListaddError, setPlayListaddError] = useState(null);
    const [playListaddSuccess, setPlayListaddSuccess] = useState(null);

    const [playListDeleteError, setPlayListDeleteError] = useState(null);
    const [playListDeleteSuccess, setPlayListDeleteSuccess] = useState(null);

    // Videos
    const [videos, setVideos] = useState([]);
    const [videosLoader, setVideosLoader] = useState(false);

    const [newVideoDetails, setNewVideoDetails] = useState(videoInitialState);
    const [newVideoLoader, setNewVideoLoader] = useState(false);
    const [newVideoError, setNewVideoError] = useState(null);
    const [newVideoSuccess, setNewVideoSuccess] = useState(null);

    const [videoDeleteError, setVideoDeleteError] = useState(null);
    const [videoDeleteSuccess, setvideoDeleteSuccess] = useState(null);

    const [{ admin }] = useStateValue();

    const handleAddNewPlayList = () => {
        if (
            addNewPlayList(
                playlistTitle,
                setPlayListaddLoader,
                setPlayListaddError,
                setPlayListaddSuccess
            )
        ) {
            setPlaylistsLoader(true);
            getAllPlayLists().then((res) => setPlayLists(res));
            setPlaylistsLoader(false);
        }
    };

    const handleDeletePlayList = (id) => {
        if (deletePlayList(id)) {
            setPlayListDeleteError(null);
            setPlayListDeleteSuccess("Playlist deleted");
            setPlayLists(() => {
                return playlists.filter((playlist) => playlist.id !== id);
            });
        } else {
            setPlayListDeleteError("Playlist coudn't be deleted!");
            setPlayListDeleteSuccess(null);
        }
    };

    // Video details change
    const handleVideoDetailsChange = (event) => {
        setNewVideoDetails({
            ...newVideoDetails,
            [`${event.target.name}`]: event.target.value,
        });
    };

    const handleAddNewVideo = () => {
        if (
            addNewVideo(
                newVideoDetails,
                setNewVideoLoader,
                setNewVideoError,
                setNewVideoSuccess
            )
        ) {
            setVideosLoader(true);
            getAllVideos().then((res) => setVideos(res));
            setVideosLoader(false);
        }
    };

    const handleDeleteVideo = (id) => {
        if (deleteVideo(id, setVideoDeleteError, setvideoDeleteSuccess)) {
            setVideos(() => {
                return videos.filter((vid) => vid.id !== id);
            });
        }
    };

    useEffect(() => {
        setPlaylistsLoader(true);
        getAllPlayLists().then((res) => setPlayLists(res));
        setPlaylistsLoader(false);
    }, []);
    useEffect(() => {
        setVideosLoader(true);
        getAllVideos().then((res) => setVideos(res));
        setVideosLoader(false);
    }, []);
    return admin ? (
        <Fragment>
            <AdminNav />
            <Box className={classes.adminVideoPanel}>
                <Container>
                    <Box className={classes.adminVideoHeader}>
                        <Typography variant="h5">
                            PlayList and Videos
                        </Typography>
                    </Box>
                    <Box boxShadow={2} className={classes.playlistsSection}>
                        <Box className={classes.addPlaylists}>
                            <Typography variant="h5">
                                Add New Playlist
                            </Typography>
                            {playListaddError ? (
                                <Alert severity="error">
                                    {playListaddError}
                                </Alert>
                            ) : (
                                ""
                            )}
                            {playListaddSuccess ? (
                                <Alert severity="success">
                                    {playListaddSuccess}
                                </Alert>
                            ) : (
                                ""
                            )}
                            <TextField
                                name="title"
                                className={classes.textField}
                                placeholder="Playlist Title"
                                type={"text"}
                                fullWidth
                                size="small"
                                margin="normal"
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={playlistTitle}
                                onChange={(e) =>
                                    setPlaylistTitle(e.target.value)
                                }
                            />
                            {playListaddLoader ? (
                                <CircularProgress />
                            ) : (
                                <Button
                                    onClick={handleAddNewPlayList}
                                    variant="contained"
                                    color="primary"
                                >
                                    ADD PLAYLIST
                                </Button>
                            )}
                        </Box>
                        <Box className={classes.allPlayLists}>
                            <Typography variant="h5">All Playlists</Typography>
                            {playListDeleteError ? (
                                <Alert severity="error">
                                    {playListDeleteError}
                                </Alert>
                            ) : (
                                ""
                            )}
                            {playListDeleteSuccess ? (
                                <Alert severity="success">
                                    {playListDeleteSuccess}
                                </Alert>
                            ) : (
                                ""
                            )}
                            <Box className={classes.playlistholder}>
                                {playlistsLoader ? (
                                    <CircularProgress />
                                ) : (
                                    playlists.map((playlist) => (
                                        <Box
                                            key={playlist.id}
                                            boxShadow={2}
                                            className={classes.playList}
                                        >
                                            <Typography
                                                component={"p"}
                                                variant="body1"
                                            >
                                                {playlist.title}
                                            </Typography>
                                            <Button
                                                onClick={() =>
                                                    handleDeletePlayList(
                                                        playlist.id
                                                    )
                                                }
                                                variant="contained"
                                                color="primary"
                                            >
                                                Delete PLAYLIST
                                            </Button>
                                        </Box>
                                    ))
                                )}
                            </Box>
                        </Box>
                    </Box>

                    <Box boxShadow={2} className={classes.videosSection}>
                        <Box className={classes.videoFrom}>
                            <Typography variant="h5">Add New Video</Typography>
                            {newVideoError ? (
                                <Alert severity="error">{newVideoError}</Alert>
                            ) : (
                                ""
                            )}
                            {newVideoSuccess ? (
                                <Alert severity="success">
                                    {newVideoSuccess}
                                </Alert>
                            ) : (
                                ""
                            )}
                            <TextField
                                name="title"
                                className={classes.textField}
                                placeholder="Video Title"
                                type={"text"}
                                fullWidth
                                size="small"
                                margin="normal"
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={newVideoDetails.title}
                                onChange={handleVideoDetailsChange}
                            />
                            <TextField
                                select
                                name="playListId"
                                placeholder="Select Playlist"
                                helperText="Please select playlist id"
                                SelectProps={{
                                    native: true,
                                }}
                                size="small"
                                margin="normal"
                                value={newVideoDetails.playListId}
                                onChange={handleVideoDetailsChange}
                                fullWidth
                            >
                                <option value={""}>Select a playlist</option>
                                {playlists.map((playlist) => (
                                    <option
                                        key={playlist.id}
                                        value={playlist.id}
                                    >
                                        {playlist.title}
                                    </option>
                                ))}
                            </TextField>
                            <TextField
                                name="youtubeVidoeId"
                                className={classes.textField}
                                placeholder="Youtube video Id"
                                type={"text"}
                                fullWidth
                                size="small"
                                margin="normal"
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={newVideoDetails.youtubeVidoeId}
                                onChange={handleVideoDetailsChange}
                            />
                            <TextField
                                name="description"
                                className={classes.textField}
                                placeholder="Video Description"
                                type={"text"}
                                fullWidth
                                multiline
                                minRows={4}
                                margin="normal"
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={newVideoDetails.description}
                                onChange={handleVideoDetailsChange}
                            />
                            {newVideoLoader ? (
                                <CircularProgress />
                            ) : (
                                <Button
                                    onClick={handleAddNewVideo}
                                    variant="contained"
                                    color="primary"
                                >
                                    ADD Video
                                </Button>
                            )}
                        </Box>
                        <Divider />
                        <Box className={classes.allVideos}>
                            <Typography variant="h5">All videos</Typography>
                            {videoDeleteError ? (
                                <Alert severity="error">
                                    {videoDeleteError}
                                </Alert>
                            ) : (
                                ""
                            )}
                            {videoDeleteSuccess ? (
                                <Alert severity="success">
                                    {videoDeleteSuccess}
                                </Alert>
                            ) : (
                                ""
                            )}
                            <Box className={classes.videoPlayLists}>
                                {videosLoader ? (
                                    <CircularProgress />
                                ) : (
                                    playlists.map((playlist) => (
                                        <Box
                                            key={playlist.id}
                                            className={classes.videoPlayList}
                                        >
                                            <Box
                                                className={
                                                    classes.playListHeader
                                                }
                                            >
                                                <Typography variant="h6">
                                                    {playlist.title}
                                                </Typography>
                                            </Box>
                                            <Box
                                                className={
                                                    classes.playListVideos
                                                }
                                            >
                                                {videos.map((video, index) =>
                                                    video.playListId ===
                                                    playlist.id ? (
                                                        <Box
                                                            key={video.id}
                                                            className={
                                                                classes.listVideo
                                                            }
                                                        >
                                                            <Box
                                                                overflow={
                                                                    "hidden"
                                                                }
                                                                className={
                                                                    classes.videoThumb
                                                                }
                                                            >
                                                                <img
                                                                    src={`https://img.youtube.com/vi/${video.youtubeVidoeId}/0.jpg`}
                                                                    alt=""
                                                                />
                                                            </Box>
                                                            <Box
                                                                className={
                                                                    classes.videoDetails
                                                                }
                                                            >
                                                                <Typography variant="h6">
                                                                    {
                                                                        video.title
                                                                    }
                                                                </Typography>
                                                                <Typography
                                                                    component={
                                                                        "p"
                                                                    }
                                                                    variant="subtitle2"
                                                                >
                                                                    {
                                                                        video.description
                                                                    }
                                                                </Typography>
                                                                <Button
                                                                    onClick={() =>
                                                                        handleDeleteVideo(
                                                                            video.id
                                                                        )
                                                                    }
                                                                    variant="contained"
                                                                    color="primary"
                                                                >
                                                                    Delete Video
                                                                </Button>
                                                            </Box>
                                                        </Box>
                                                    ) : (
                                                        <Fragment
                                                            key={index}
                                                        ></Fragment>
                                                    )
                                                )}
                                            </Box>
                                        </Box>
                                    ))
                                )}
                            </Box>
                        </Box>
                    </Box>
                </Container>
            </Box>
        </Fragment>
    ) : (
        <AdminLogin />
    );
};

export default AdminVideos;
