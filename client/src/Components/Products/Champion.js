import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
    purchaseProducts: {
        display: "flex",
        maxWidth: "450px",
        justifyContent: "center",
        [theme.breakpoints.down(800)]: {
            flexDirection: "column",
            alignItems: "center",
        },
    },
    purchaseProduct: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        padding: "40px 30px",
        border: "2px solid #18a9e2",
        borderRadius: "24px",
        margin: "10px 10px",
    },
    purchaseProductHeader: {
        display: "flex",
        justifyContent: "center",
        marginBottom: "20px",
        "& > h6": {
            fontWeight: "bold",
            color: "orangered",
        },
    },
    purchaseProductFeatureList: {
        marginBottom: "30px",
    },
    purchaseProductFeature: {
        display: "flex",
        fontWeight: "500",
        marginBottom: "20px",
        "& > span": {
            marginRight: "10px",
        },
    },
    purchasePlanType: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        alignSelf: "center",
        marginBottom: "40px",
        "& > p": {
            fontStyle: "italic",
            fontWeight: "600",
            textAlign: "center",
        },
        "& > h6": {
            fontWeight: "600",
            textAlign: "center",
            color: "orangered",
        },
    }
}));

const Champion = ({ name }) => {
    const classes = useStyles();
    return (

        <Box className={classes.purchaseProducts}>
            {/* Addition details about product */}
            {name === 'DISHA' ? (
                <Box className={classes.purchaseProduct}>
                    <Box className={classes.purchaseProductHeader}>
                        <Typography variant="h6">DISHA</Typography>
                    </Box>
                    <Box className={classes.purchasePlanType}>
                        <Typography component={"p"} variant="body1">
                            A Year-Long student Development Program
                        </Typography>
                        <Typography variant="h6">
                            <sup>₹</sup>2,400 Only/-
                        </Typography>
                    </Box>
                    <Box
                        className={
                            classes.purchaseProductFeatureList
                        }
                    >
                        <Typography
                            className={
                                classes.purchaseProductFeature
                            }
                            variant="subtitle2"
                        >
                            <Box component={"span"}> &#9755;</Box>
                            Interactive Premium Career Guidance
                            Workshops Highly-Researched Content on
                            hundreds of Career options.
                        </Typography>
                        <Typography
                            className={
                                classes.purchaseProductFeature
                            }
                            variant="subtitle2"
                        >
                            <Box component={"span"}>&#9755;</Box>
                            Exclusive manually designed career
                            report. <br /> Detailed report of
                            mentors containing top career matches &
                            personalised development plans.
                        </Typography>
                        <Typography
                            className={
                                classes.purchaseProductFeature
                            }
                            variant="subtitle2"
                        >
                            <Box component={"span"}>&#9755;</Box>
                            Strategy Sessions <br />
                            Face to Face Q&A with Field Experts &
                            Rankers
                        </Typography>
                    </Box>

                </Box>
            ) : null}
            {name === 'PERSONA' ? (

                <Box className={classes.purchaseProduct}>
                    <Box className={classes.purchaseProductHeader}>
                        <Typography variant="h6">
                            PERSONA
                        </Typography>
                    </Box>
                    <Box className={classes.purchasePlanType}>
                        <Typography component={"p"} variant="body1">
                            A Year-Long student Development Program
                        </Typography>
                        <Typography variant="h6">
                            <sup>₹</sup>2,400 Only/-
                        </Typography>
                    </Box>
                    <Box
                        className={
                            classes.purchaseProductFeatureList
                        }
                    >
                        <Typography
                            className={
                                classes.purchaseProductFeature
                            }
                            variant="subtitle2"
                        >
                            <Box component={"span"}> &#9755;</Box>
                            Premium New Era Skill Development
                            workshops. <br />
                            Easy to learn content with tricks &
                            visuals
                        </Typography>
                        <Typography
                            className={
                                classes.purchaseProductFeature
                            }
                            variant="subtitle2"
                        >
                            <Box component={"span"}>&#9755;</Box>
                            Open-Mic. <br />
                            Supply your learnings & improve your
                            speaking skills on live stage.
                        </Typography>
                        <Typography
                            className={
                                classes.purchaseProductFeature
                            }
                            variant="subtitle2"
                        >
                            <Box component={"span"}>&#9755;</Box>
                            Practise on Stage in Audience. <br />
                            Practicals on good etiquettes, body
                            language, decision making, problem
                            solving abilities.
                        </Typography>
                    </Box>

                </Box>
            ) : null}
            {name === 'SAKHA' ? (

                <Box className={classes.purchaseProduct}>
                    <Box className={classes.purchaseProductHeader}>
                        <Typography variant="h6">SAKHA</Typography>
                    </Box>
                    <Box className={classes.purchasePlanType}>
                        <Typography component={"p"} variant="body1">
                            A Year-Long student Development Program
                        </Typography>
                        <Typography variant="h6">
                            <sup>₹</sup>2,400 Only/-
                        </Typography>
                    </Box>
                    <Box
                        className={
                            classes.purchaseProductFeatureList
                        }
                    >
                        <Typography
                            className={
                                classes.purchaseProductFeature
                            }
                            variant="subtitle2"
                        >
                            <Box component={"span"}> &#9755;</Box>
                            Emotional & Mental Wellness
                            Consultation. <br />
                            One to One completely confediential
                            meetups with psychology experts.
                        </Typography>
                        <Typography
                            className={
                                classes.purchaseProductFeature
                            }
                            variant="subtitle2"
                        >
                            <Box component={"span"}>&#9755;</Box>
                            Challenge workshops. <br />
                            Bad habits & Addictions vanishing
                            guidance & mentoring.
                        </Typography>
                        <Typography
                            className={
                                classes.purchaseProductFeature
                            }
                            variant="subtitle2"
                        >
                            <Box component={"span"}>&#9755;</Box>
                            24X7 Direct Call Support. <br />
                            Not able to take life decisions,
                            misunderstanding with parents, have
                            stuck in any bad situation line with
                            goons or lost at any place. <br />
                            Don't be worry. <br />
                            Together we beat the problems.
                        </Typography>
                    </Box>

                </Box>
            ) : null}
        </Box>
    )
}

export default Champion