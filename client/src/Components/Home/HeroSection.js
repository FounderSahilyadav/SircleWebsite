import { Box, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import heroBackground from "../../assets/heroBackground.jpg";
import heroSectionAnim from "../../assets/heroSectionAnim.mp4";

const useStyles = makeStyles((theme) => ({
    heroSectionBackground: {
        background: "#18a9e2",
    },
    heroSection: {
        minHeight: "calc(100vh - 72px)",
        marginTop: "72px",
        color: "#25AEE4",
        background: `linear-gradient(to Right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)), url(${heroBackground})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        backgroundPosition: "right bottom",
        [theme.breakpoints.down("md")]: {
            height: "auto",
        },
    },
    heroContent: {
        width: "50%",
        maxWidth: "700px",
        height: "100%",
        "& > video": {
            // width: "60%",
            height: "250px",
            marginTop: "40px",
            background: "none",
        },
    },
}));

const HeroSection = () => {
    const classes = useStyles();

    // Yet to be completed
    return (
        <Box className={classes.heroSectionBackground}>
            <Box className={classes.heroSection}>
                <Container>
                    <Box className={classes.heroContent}>
                        <video autoPlay={true} controls={false} muted={true}>
                            <source src={heroSectionAnim} type="video/mp4" />
                            Sorry, your browser doesn't support embedded videos.
                        </video>
                    </Box>
                </Container>
            </Box>
        </Box>
    );
};

export default HeroSection;
