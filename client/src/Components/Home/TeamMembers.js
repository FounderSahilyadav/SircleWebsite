import {
    Box,
    CircularProgress,
    Container,
    Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TeamMemberCard from "./TeamMemberCard";
import { getAllMentors } from "../../utils/mentors";

const useStyles = makeStyles((theme) => ({
    teamSection: {
        paddingTop: "40px",
        marginTop: "50px",
    },
    teamTop: {
        display: "flex",
        [theme.breakpoints.down("md")]: {
            flexDirection: "column",
        },
    },
    teamTopLeft: {
        width: "30%",
        "& p": {
            fontSize: "10px",
            fontWeight: "bolder",
            color: "#25AEE4",
            marginBottom: "15px",
        },
        "& h4": {
            fontWeight: "bolder",
            marginBottom: "15px",
        },
        [theme.breakpoints.down("md")]: {
            width: "100%",
        },
    },
    teamTopRight: {
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        width: "70%",
        "& p": {
            textAlign: "left",
            fontSize: "16px",
            lineHeight: "1.6",
            color: "#667085",
            maxWidth: "620px",
        },
        [theme.breakpoints.down("md")]: {
            width: "100%",
        },
        [theme.breakpoints.down("sm")]: {
            "& p": {
                fontSize: "14px",
            },
        },
    },
    teamBottom: {
        display: "flex",
        justifyContent: "flex-start",
        overflow: "auto",
        padding: "30px 0px",
    },
    circularProgress: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "20vh",
        width: "100%",
    },
    noMentor: {
        display: "flex",
        justifyContent: "center",
        width: "100%",
        padding: "20px",
        background: "lightgray",
    },
}));

const TeamMembers = () => {
    const classes = useStyles();

    // Hooks for storing and handling members
    const [teamMembers, setTeamMembers] = useState([]); // Storing team members
    const [teamMemberLoader, setTeamMemberLoader] = useState(true); // Loader, while the members are still being fetched

    // Fetch all the members from the database
    useEffect(() => {
        setTeamMemberLoader(true);
        getAllMentors().then((res) => setTeamMembers(res));
        setTeamMemberLoader(false);
    }, []);

    return (
        <Box className={classes.teamSection}>
            <Container>
                <Box className={classes.teamTop}>
                    <Box className={classes.teamTopLeft}>
                        <Typography component={"p"}>
                            WE HAVE BEST MENTORS
                        </Typography>
                        <Typography component={"h4"} variant="h4">
                            Meet Our Squad
                        </Typography>
                    </Box>
                    <Box className={classes.teamTopRight}>
                        <Typography component={"p"} variant="body2">
                            Our experts are young Achievers with an exemplary
                            acumen of their fields. Because a young talent
                            better knows about new hustles and have latest
                            skills, enthusiasm and ...... innovative ideas to
                            bring the best out of you."
                        </Typography>
                    </Box>
                </Box>
                <Box className={classes.teamBottom}>
                    {teamMemberLoader ? (
                        <Box className={classes.circularProgress}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        // Map through all the members
                        teamMembers.map((member, index) => (
                            <TeamMemberCard member={member} key={index} />
                        ))
                    )}
                    {!teamMemberLoader && teamMembers.length === 0 ? (
                        <Box className={classes.noMentor}>
                            <Typography variant="subtitle2">
                                ~No Squad Members to show yet~
                            </Typography>
                        </Box>
                    ) : (
                        <></>
                    )}
                </Box>
            </Container>
        </Box>
    );
};

export default TeamMembers;
