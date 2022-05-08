import { Box, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
const useStyles = makeStyles((theme) => ({

    purchaseProducts: {
        display: "flex",
        maxWidth: "450px",
        justifyContent: "center",
        [theme.breakpoints.down(800)]: {
            flexDirection: "column",
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
    },
    lineThroughPrice: {
        color: "gray !important",
        textDecoration: "line-through",
    },
    combinedProduct: {
        width: "170%",
        [theme.breakpoints.down(800)]: {
            width: "auto",
        },
    },
    combinedProductList: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: "20px",
        "& > h5": {
            color: "orangered",
            fontStyle: "italic",
        },
    },
    combinedPlan: {
        backgroundColor: "lightgray",
        padding: "10px 50px",
        margin: "5px 0",
        fontWeight: "bold",
        border: "1px solid #000",
        transform: "skewX(-20deg)",
    },
    container: {
        margin: "40px",
    }
}));

const Accelrator = ({ name }) => {

    const classes = useStyles();
    return (
        <>
            <Box className={classes.purchaseProducts}>
                {name === "DISHA_CRASH" ? (
                    <Box className={classes.purchaseProduct}>
                        <Box
                            className={
                                classes.purchaseProductHeader
                            }
                        >
                            <Typography variant="h6">
                                DISHA(Crash Course)
                            </Typography>
                        </Box>
                        <Box className={classes.purchasePlanType}>
                            <Typography
                                component={"p"}
                                variant="body1"
                            >
                                15 days Career Counselling Progran
                            </Typography>
                            <Typography variant="h6">
                                <sup>₹</sup>690 Only/-
                                <Typography variant="body2">
                                    (Special Price)
                                </Typography>
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
                                <Box component={"span"}>
                                    {" "}
                                    &#9755;
                                </Box>
                                Premium career workshops with Q&A.{" "}
                                <br />
                                Well researched 150+ career options
                                (all with high pay).
                            </Typography>
                            <Typography
                                className={
                                    classes.purchaseProductFeature
                                }
                                variant="subtitle2"
                            >
                                <Box component={"span"}>
                                    &#9755;
                                </Box>
                                Detailed Career Report. <br />{" "}
                                Contain roadmap about opportunities,
                                enterance exams, scholarships, etc.
                            </Typography>
                        </Box>
                    </Box>
                ) : null}
                {name === "ALL_COURSE" ? (
                    <Box
                        className={`${classes.purchaseProduct} ${classes.combinedProduct}`}
                    >
                        <Box
                            className={
                                classes.purchaseProductHeader
                            }
                        >
                            <Typography variant="h6">
                                ACHIEVER
                            </Typography>
                        </Box>
                        <Box
                            className={classes.combinedProductList}
                        >
                            <Box className={classes.combinedPlan}>
                                <Typography variant="body1">
                                    DISHA
                                </Typography>
                            </Box>
                            <Typography variant="h5">+</Typography>
                            <Box className={classes.combinedPlan}>
                                <Typography variant="body1">
                                    PERSONA
                                </Typography>
                            </Box>
                            <Typography variant="h5">+</Typography>
                            <Box className={classes.combinedPlan}>
                                <Typography variant="body1">
                                    SAKHA
                                </Typography>
                            </Box>
                        </Box>
                        <Box className={classes.purchasePlanType}>
                            <Typography
                                component={"p"}
                                variant="body1"
                            >
                                Exclusive Complete Student
                                Development Program.
                            </Typography>
                            <Box className={classes.fullPrice}>
                                <Typography variant="h6">
                                    <sup>₹</sup>{" "}
                                    <Typography
                                        className={
                                            classes.lineThroughPrice
                                        }
                                        component={"span"}
                                    >
                                        7200 Only/-
                                    </Typography>
                                </Typography>
                                <Typography variant="body2">
                                    (25% Discount)
                                </Typography>
                            </Box>
                            <Typography variant="h6">
                                <sup>₹</sup>5400 Only/-
                                <Typography variant="body2">
                                    (Limited Time Offer)
                                </Typography>
                            </Typography>
                        </Box>

                        {/* Purchase product button, not yet implemented */}
                    </Box>
                ) : null}
                {/* Product additional details for the plan */}


                {/* Additional details for the combined product purchase plan */}
            </Box>
        </>
    )
}

export default Accelrator;