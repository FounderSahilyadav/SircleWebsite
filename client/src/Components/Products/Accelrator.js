import { Box, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
const useStyles = makeStyles((theme) => ({
    productsHeader: {
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
    productsDetails: {
        display: "flex",
        justifyContent: "space-between",
        [theme.breakpoints.down(800)]: {
            flexDirection: "column",
        },
    },
    product: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        width: "32%",
        padding: "30px 30px",
        borderRadius: "24px",
        background: "#18a9e2",
        border: "2px solid #18a9e2",
        transitionTimingFunction: "ease-in-out",
        transitionDuration: "0.4s",
        cursor: "pointer",
        "&:hover": {
            transform: "scale(1.02)",
            borderRadius: "15px",
            boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        },
        [theme.breakpoints.down(800)]: {
            width: "98%",
            margin: "20px 0",
            "&:hover": {
                transform: "none",
            },
        },
    },
    productHeader: {
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
    productImage: {
        display: "flex",
        width: "100%",
        "& img": {
            width: "200px",
            height: "200px",
            margin: "0px auto",
            marginBottom: "20px",
            borderRadius: "50%",
        },
    },
    productDetail: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        "& p": {
            display: "flex",
            fontSize: "14px",
            fontWeight: "600",
            lineHeight: "1.5",
            marginBottom: "25px",
            "& small": {
                marginRight: "5px",
            },
        },
        [theme.breakpoints.down("md")]: {
            width: "100%",
        },
    },
    productList: {
        "& li": {
            padding: "4px",
            paddingLeft: "20px",
            "& h6": {
                display: "flex",
                fontSize: "13px",
                fontWeight: "600",
                color: "#667085",
                "& small": {
                    marginRight: "5px",
                },
            },
        },
    },
    middleProductList: {
        "& li": {
            "& h6": {
                color: "lightgray !important",
            },
        },
    },
    sakhaHeader: {
        fontStyle: "italic",
        fontWeight: "bold",
        margin: "0px auto",
        marginBottom: "10px",
        textAlign: "center",
        color: "orangered",
    },
    appointment: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        marginTop: "50px",
        marginBottom: "30px",
        background: "rgb(198, 246, 252)",
        padding: "30px 0",
        "& img": {
            width: "70%",
            [theme.breakpoints.down(600)]: {
                width: "100%",
            },
        },
    },
    contact: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        marginBottom: "30px",
        border: "1px solid lightgray",
    },
    contactLeft: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        background: "#1A2E39",
    },
    contactLeftTop: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "50%",
        "& img": {
            width: "70%",
        },
    },
    contactLeftBottom: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        "& > h5": {
            color: "#fff",
            marginBottom: "20px",
            marginTop: "auto",
        },
        "& > p": {
            color: "#fff",
            textAlign: "center",
            marginBottom: "10px",
        },
    },
    contactRight: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        padding: "50px 30px",
        paddingTop: "10px",
        background: "#fff",
        "& > h5": {
            color: "#000",
            textAlign: "center",
            fontWeight: "600",
            marginBottom: "20px",
        },
        "& > h6": {
            marginBottom: "10px",
            fontWeight: "500",
        },
        "& > p": {
            color: "lightgray",
            fontStyle: "italic",
            marginBottom: "5px",
        },
        "& > small": {
            color: "red",
        },
    },
    studentForm: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        padding: "30px 30px",
        paddingTop: "10px",
        borderRight: "1px solid lightgray",
        "& > h5": {
            color: "#000",
            fontWeight: "600",
            marginBottom: "20px",
        },
        "& > h6": {
            marginBottom: "10px",
            fontWeight: "500",
        },
        "& > p": {
            color: "lightgray",
            fontStyle: "italic",
            marginBottom: "5px",
        },
        "& > small": {
            color: "red",
        },
        [theme.breakpoints.down(700)]: {
            border: "none",
            borderTop: "1px solid lightgray",
        },
    },
    productPurchaseSection: {
        marginTop: "70px",
    },
    productPurchaseSectionHeader: {
        marginBottom: "20px",
        "& > h5": {
            fontWeight: "bold",
        },
    },
    purchaseProducts: {
        display: "flex",
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
        width: "100%",
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
    purchaseButton: {
        justifySelf: "flex-end",
        marginTop: "auto",
        color: "#fff",
        backgroundColor: "orangered",
    },
    lineThroughPrice: {
        color: "gray !important",
        textDecoration: "line-through",
    },
    combinedProduct: {
        width: "170%",
        [theme.breakpoints.down(800)]: {
            width: "100%",
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
        width: "40rem",
    }
}));

const Accelrator = ({ name }) => {

    const classes = useStyles();
    return (
        <div className={classes.container}>
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
        </div>
    )
}

export default Accelrator;