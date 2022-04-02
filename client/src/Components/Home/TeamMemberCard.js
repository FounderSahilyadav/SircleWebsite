import { Typography, IconButton, Box } from "@material-ui/core";
import { Facebook, Instagram, LinkedIn } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    memberCard: {
        width: "300px",
        minWidth: "280px",
        margin: "10px 10px",
    },
    memberCardTop: {
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        width: "300px",
        minWidth: "280px",
        height: "300px",
        marginBottom: "15px",
        overflow: "hidden",
        background: "lightgray",
        "& > img": {
            height: "100%",
        },
    },
    memberCardBottom: {
        "& > p": {
            color: "#25AEE4",
            marginBottom: "20px",
        },
        "& > small": {
            color: "#667085",
        },
    },
}));

// Card view for single mentor/member
const TeamMemberCard = ({ member }) => {
    const { name, designation, about, instagram, facebook, linkedIn, profile } =
        member; // Member passed as prop
    const classes = useStyles();
    return (
        <Box className={classes.memberCard}>
            {/* Member/Mentor picture */}
            <Box className={classes.memberCardTop}>
                <img src={profile} alt="" />
            </Box>

            {/* Member/mentor details */}
            <Box className={classes.memberCardBottom}>
                <Typography variant="h6" component={"h6"}>
                    {name}
                </Typography>
                <Typography variant="body1" component={"p"}>
                    {designation}
                </Typography>
                <Typography variant="subtitle2" component={"small"}>
                    {about}
                </Typography>
                <Box component={"div"}>
                    <a href={instagram} target={"_blank"} rel="noreferrer">
                        <IconButton style={{ paddingLeft: "0" }}>
                            <Instagram style={{ color: "#fb3958" }} />
                        </IconButton>
                    </a>
                    <a href={linkedIn} target={"_blank"} rel="noreferrer">
                        <IconButton>
                            <LinkedIn style={{ color: "#0A66C2" }} />
                        </IconButton>
                    </a>
                    <a href={facebook} target={"_blank"} rel="noreferrer">
                        <IconButton>
                            <Facebook style={{ color: "#1877F2" }} />
                        </IconButton>
                    </a>
                </Box>
            </Box>
        </Box>
    );
};

export default TeamMemberCard;
