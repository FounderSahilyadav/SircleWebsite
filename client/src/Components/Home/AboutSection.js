import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { OfflineBolt } from "@material-ui/icons";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

const useStyles = makeStyles((theme) => ({
    aboutSection: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        height: "100vh",
        [theme.breakpoints.down("md")]: {
            height: "auto",
        },
    },
    about: {
        display: "flex",
        width: "100%",
        height: "50%",
        [theme.breakpoints.down("md")]: {
            flexDirection: "column",
            height: "fit-content",
        },
    },
    aboutLeft: {
        margin: "auto",
        width: "60%",
        height: "100%",
        padding: "20px 0",
        background: "#1D2939",
        "& video": {
            maxHeight: "100%",
            objectFit: "cover",
        },
        [theme.breakpoints.down("md")]: {
            width: "100%",
        },
    },
    aboutRight: {
        display: "flex",
        flexDirection: "column",
        padding: "20px",
        width: "40%",
        height: "100%",
        background: "rgb(198, 246, 252)",
        [theme.breakpoints.down("md")]: {
            width: "100%",
            padding: "20px;",
        },
    },
    aboutDetails: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        [theme.breakpoints.down("md")]: {
            marginBottom: "30px",
        },
    },
    aboutDetailHeader: {
        fontWeight: "bold",
        margin: "30px 0px",
        color: "#101828",
    },
    aboutDetail: {
        display: "flex",
        alignItems: "flex-start",
        marginBottom: "10px",
        "& p": {
            fontSize: "12px",
            color: "#667085",
        },
    },
    videoFrame: {
        width: "100%",
        height: "100%",
    }
}));

const AboutSection = () => {
    const classes = useStyles();
    return (
        <Box className={classes.aboutSection}>
            <Box className={classes.about}>
                {/* Video for the left side of about section, not set yet */}
                <Box className={classes.aboutLeft}>
                    <iframe
                        className={classes.videoFrame}
                        src={`https://www.youtube.com/embed/muWv4jatUt8?autostart=0&modestbranding=0&rel=0&fs=0&showinfo=0`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </Box>
                <Box className={classes.aboutRight}>
                    <Box margin="auto 20px">
                        <Box variant={"span"}>
                            <OfflineBolt
                                style={{
                                    fill: "rgb(82, 229, 248)",
                                    marginRight: "10px",
                                }}
                                className={classes.icon}
                            />
                        </Box>

                        {/* List of details about sircle */}
                        <Box className={classes.aboutDetails}>
                            <Typography
                                className={classes.aboutDetailHeader}
                                variant="h5"
                            >
                                WHO WE ARE
                            </Typography>
                            <Box
                                className={classes.aboutDetail}
                                variant={"span"}
                            >
                                <CheckCircleIcon
                                    style={{
                                        fill: "rgb(82, 229, 248)",
                                        marginRight: "10px",
                                    }}
                                />
                                <Typography component={"p"}>
                                    We help students gaining essential skills.
                                </Typography>
                            </Box>
                            <Box
                                className={classes.aboutDetail}
                                component={"span"}
                            >
                                <CheckCircleIcon
                                    style={{
                                        fill: "rgb(82, 229, 248)",
                                        marginRight: "10px",
                                    }}
                                />
                                <Typography component={"p"}>
                                    Being a human in real sense.
                                </Typography>
                            </Box>
                            <Box
                                className={classes.aboutDetail}
                                component={"span"}
                            >
                                <CheckCircleIcon
                                    style={{
                                        fill: "rgb(82, 229, 248)",
                                        marginRight: "10px",
                                    }}
                                />
                                <Typography component={"p"}>
                                    Help them choose the future they are meant
                                    for.
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default AboutSection;
