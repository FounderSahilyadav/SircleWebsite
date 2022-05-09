import {
    Box,
    Button,
    Container,
    Grid,
    List,
    ListItem,
    Tab,
    Tabs,
    Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Alert } from '@material-ui/lab';
import PropTypes from "prop-types";
import { Fragment, useEffect, useState } from "react";
import dishaImg from "../../assets/dishaImg.jpg";
import personaImg from "../../assets/personaImg.jpg";
import sakhaImg from "../../assets/sakhaImg.jpg";
import { Link } from "react-router-dom";
import InstituteQuery from "../../Forms/InstituteQuery";
import StudentRegistration from "../../Forms/StudentRegistration";
import { onPayment } from "../../utils/payment";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`wrapped-tabpanel-${index}`}
            aria-labelledby={`wrapped-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `wrapped-tab-${index}`,
        "aria-controls": `wrapped-tabpanel-${index}`,
    };
}

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
        marginBottom: "70px",
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
        [theme.breakpoints.down(800)]: {
            margin: "10px 0px",
            justifyContent: "center",
        },
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
    alert: {
        position: 'fixed',
        top: '0px',
        left: '0px',
        width: '100%',
        zIndex: '1',
        marginTop: '70px',
    },
}));

const Products = ({ studentData }) => {
    const classes = useStyles();
    // Hooks for handling the tabs view of the query submission forms
    const [value, setValue] = useState("one");

    const [error, setError] = useState(null); // If any error occured while registering the student


    // handling change in tabs
    const handleTabsChange = (event, newValue) => {
        setValue(newValue);
    };
    const handlePayment = (amount, courseName) => {
        onPayment(amount, courseName, studentData, setError);
    }
    // Scroll to top when page loads
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0 });
    }, []);
    return (
        <>
            <div className={classes.alert}>
                {error ? (
                    <Alert severity="error">{error}</Alert>) : ""}
            </div>
            <Fragment>
                <Box paddingTop={"80px"} marginTop={"50px"}>
                    <Container>
                        <Grid className={classes.productsHeader}>
                            <Typography variant="h3">Our Products</Typography>
                            <Typography variant="body2" component={"p"}>
                                <Link className={classes.headerLink} to={"/"}>
                                    Home
                                </Link>{" "}
                                &#9656; Our Products
                            </Typography>
                        </Grid>

                        {/* Products detals section */}
                        <Box className={classes.productsDetails}>
                            {/* Details about the product */}
                            <Box
                                className={classes.product}
                                style={{ background: "none" }}
                            >
                                <Box className={classes.productHeader}>
                                    <Typography variant="h4">DISHA</Typography>
                                </Box>
                                <Box className={classes.productImage}>
                                    <img src={dishaImg} alt="" />
                                </Box>
                                <Box className={classes.productDetail}>
                                    <Typography component={"p"} variant="subtitle1">
                                        <Typography
                                            style={{
                                                lineHeight: "1.3",
                                            }}
                                            component={"small"}
                                        >
                                            &#9755;
                                        </Typography>{" "}
                                        Do you know your Superpower?
                                    </Typography>
                                    <Typography component={"p"} variant="subtitle1">
                                        <Typography
                                            style={{
                                                lineHeight: "1.3",
                                            }}
                                            component={"small"}
                                        >
                                            &#9755;
                                        </Typography>{" "}
                                        Opportunities are in bulk. How many careers
                                        do you really know?
                                    </Typography>
                                    <Typography component={"p"} variant="subtitle1">
                                        <Typography
                                            style={{
                                                lineHeight: "1.3",
                                            }}
                                            component={"small"}
                                        >
                                            &#9755;
                                        </Typography>{" "}
                                        What career you should opt for entirenof
                                        your working life?
                                    </Typography>
                                    <Typography
                                        style={{ marginBottom: "20px" }}
                                        component={"h6"}
                                        variant="h6"
                                        className={classes.sakhaHeader}
                                    >
                                        "A thing can't become your Passion if you
                                        have never heard or done in before."
                                    </Typography>
                                    <Typography component={"p"} variant="subtitle1">
                                        <Typography
                                            style={{
                                                lineHeight: "1.3",
                                            }}
                                            component={"small"}
                                        >
                                            &#9755;
                                        </Typography>{" "}
                                        Know the most suitable career path by DISHA.
                                        We are a one stop solution to All
                                        Councelling Needs. We provide complete
                                        counselling to make you know your Passion
                                        and Interest.
                                    </Typography>
                                </Box>
                            </Box>

                            {/* Details about the product */}
                            <Box className={classes.product}>
                                <Box className={classes.productHeader}>
                                    <Typography variant="h4">PERSONA</Typography>
                                </Box>
                                <Box className={classes.productImage}>
                                    <img src={personaImg} alt="" />
                                </Box>
                                <Box className={classes.productDetail}>
                                    <Typography component={"p"} variant="subtitle1">
                                        <Typography
                                            style={{
                                                lineHeight: "1.3",
                                            }}
                                            component={"small"}
                                        >
                                            &#9755;
                                        </Typography>{" "}
                                        Do you have stage phobia?
                                    </Typography>
                                    <Typography component={"p"} variant="subtitle1">
                                        <Typography
                                            style={{
                                                lineHeight: "1.3",
                                            }}
                                            component={"small"}
                                        >
                                            &#9755;
                                        </Typography>{" "}
                                        Have low self esteem?
                                    </Typography>
                                    <Typography component={"p"} variant="subtitle1">
                                        <Typography
                                            style={{
                                                lineHeight: "1.3",
                                            }}
                                            component={"small"}
                                        >
                                            &#9755;
                                        </Typography>{" "}
                                        Hesitate to communicate with new People?
                                    </Typography>
                                    <Typography
                                        style={{ marginBottom: "0px" }}
                                        component={"h6"}
                                        variant="h6"
                                        className={classes.sakhaHeader}
                                    >
                                        PERSONA MAKES YOU BETTER VERSIONS OF
                                        YOURSELF BY-
                                    </Typography>
                                    <List
                                        className={`${classes.productList} ${classes.middleProductList}`}
                                    >
                                        <ListItem>
                                            <Typography variant="subtitle2">
                                                <Typography component={"small"}>
                                                    &#9741;
                                                </Typography>
                                                improving your soft skills.
                                            </Typography>
                                        </ListItem>
                                        <ListItem>
                                            <Typography variant="subtitle2">
                                                <Typography component={"small"}>
                                                    &#9741;
                                                </Typography>
                                                embedding good ethics and values.
                                            </Typography>
                                        </ListItem>
                                        <ListItem>
                                            <Typography variant="subtitle2">
                                                <Typography component={"small"}>
                                                    &#9741;
                                                </Typography>
                                                help you acquire good etiquettes,
                                                good body language and leadership
                                                qualities.
                                            </Typography>
                                        </ListItem>
                                        <ListItem>
                                            <Typography variant="subtitle2">
                                                <Typography component={"small"}>
                                                    &#9741;
                                                </Typography>
                                                improving your communication skills
                                                and public speaking.
                                            </Typography>
                                        </ListItem>
                                    </List>
                                </Box>
                            </Box>

                            {/* Details about the product */}
                            <Box
                                style={{ background: "none" }}
                                className={classes.product}
                            >
                                <Box className={classes.productHeader}>
                                    <Typography variant="h4">SAKHA</Typography>
                                </Box>
                                <Box className={classes.productImage}>
                                    <img src={sakhaImg} alt="" />
                                </Box>
                                <Box className={classes.productDetail}>
                                    <Typography component={"p"} variant="subtitle1">
                                        <Typography
                                            style={{
                                                lineHeight: "1.3",
                                            }}
                                            component={"small"}
                                        >
                                            &#9755;
                                        </Typography>{" "}
                                        Are you stuck between your capabilities and
                                        family's expectations?
                                    </Typography>
                                    <Typography component={"p"} variant="subtitle1">
                                        <Typography
                                            style={{
                                                lineHeight: "1.3",
                                            }}
                                            component={"small"}
                                        >
                                            &#9755;
                                        </Typography>{" "}
                                        Are you mentally disturbed
                                    </Typography>
                                    <Typography component={"p"} variant="subtitle1">
                                        <Typography
                                            style={{
                                                lineHeight: "1.3",
                                            }}
                                            component={"small"}
                                        >
                                            &#9755;
                                        </Typography>{" "}
                                        Get stuck in bad habits?
                                    </Typography>
                                    <Typography component={"p"} variant="subtitle1">
                                        <Typography
                                            style={{
                                                lineHeight: "1.3",
                                            }}
                                            component={"small"}
                                        >
                                            &#9755;
                                        </Typography>{" "}
                                        Stressed or depressed?
                                    </Typography>
                                    <Typography
                                        className={classes.sakhaHeader}
                                        component={"h6"}
                                        variant="h6"
                                    >
                                        "HERE COMES SAKHA"
                                    </Typography>
                                    <List className={classes.productList}>
                                        <ListItem>
                                            <Typography variant="subtitle2">
                                                <Typography component={"small"}>
                                                    &#9741;
                                                </Typography>
                                                Helps you in emotional and mental
                                                health issues.
                                            </Typography>
                                        </ListItem>
                                        <ListItem>
                                            <Typography variant="subtitle2">
                                                <Typography component={"small"}>
                                                    &#9741;
                                                </Typography>
                                                Helps you deal with addiction and
                                                bad habits.
                                            </Typography>
                                        </ListItem>
                                        <ListItem>
                                            <Typography variant="subtitle2">
                                                <Typography component={"small"}>
                                                    &#9741;
                                                </Typography>
                                                Provide you 24*7 assistance.
                                            </Typography>
                                        </ListItem>
                                    </List>
                                </Box>
                            </Box>
                        </Box>

                        {/* Product purchase section */}
                        <Box className={classes.productPurchaseSection}>
                            <Box className={classes.productPurchaseSectionHeader}>
                                <Typography variant="h5">CHAMPION</Typography>
                            </Box>
                            <Box className={classes.purchaseProducts}>
                                {/* Addition details about product */}
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

                                    {/* Purchase product, not yet implemented */}
                                    <Button
                                        className={classes.purchaseButton}
                                        variant="contained"
                                        onClick={() => handlePayment(2400.00, "DISHA")}
                                    >
                                        BUY NOW
                                    </Button>
                                </Box>

                                {/* Addition details about product */}
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

                                    {/* Purchase product, not yet implemented */}
                                    <Button
                                        className={classes.purchaseButton}
                                        variant="contained"
                                        onClick={() => handlePayment(2400.00, "PERSONA")}
                                    >
                                        BUY NOW
                                    </Button>
                                </Box>

                                {/* Addition details about product */}
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

                                    {/* Purchase product, not yet implemented */}
                                    <Button
                                        className={classes.purchaseButton}
                                        variant="contained"
                                        onClick={() => handlePayment(2400.00, "SAKHA")}
                                    >
                                        BUY NOW
                                    </Button>
                                </Box>
                            </Box>

                            {/* Another product purchase section */}
                            <Box className={classes.productPurchaseSection}>
                                <Box
                                    className={classes.productPurchaseSectionHeader}
                                >
                                    <Typography variant="h5">ACCELRATOR</Typography>
                                </Box>

                                {/* Product additional details for the plan */}
                                <Box className={classes.purchaseProducts}>
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

                                        {/* Purchase product button, not yet implemented */}
                                        <Button
                                            className={classes.purchaseButton}
                                            variant="contained"
                                            onClick={() => handlePayment(690.00, "DISHA_CRASH")}
                                        >
                                            BUY NOW
                                        </Button>
                                    </Box>

                                    {/* Additional details for the combined product purchase plan */}
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
                                        <Button
                                            className={classes.purchaseButton}
                                            variant="contained"
                                            onClick={() => handlePayment(5400.00, "ALL_COURSE")}
                                        >
                                            BUY NOW
                                        </Button>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Container>
                </Box>

                {/* Forms for institute query and student registration */}
                <Box>
                    <Container>
                        <Box boxShadow={4} className={classes.contact}>
                            <Box>
                                {/* Tabs to select which form to display */}
                                <Tabs
                                    value={value}
                                    onChange={handleTabsChange}
                                    aria-label="Contact Forms"
                                >
                                    <Tab
                                        value="one"
                                        label="For Organisations"
                                        wrapped
                                        {...a11yProps("one")}
                                    />
                                    <Tab
                                        value="two"
                                        label="For Students"
                                        {...a11yProps("two")}
                                    />
                                </Tabs>
                            </Box>

                            {/* Tab panel for dispaying selected form */}
                            <TabPanel value={value} index="one">
                                {/* Institute query form */}
                                <InstituteQuery />
                            </TabPanel>

                            {/* Tab panel for student registration */}
                            <TabPanel value={value} index="two">
                                <StudentRegistration />
                            </TabPanel>

                            {/* Contact section an bottom of the forms */}
                            {/* Detals yet to be updated */}
                            <Box className={classes.contactLeft}>
                                <Box className={classes.contactLeftBottom}>
                                    <Typography variant="h5">CONTACT US</Typography>

                                    <Typography component={"p"} variant="body2">
                                        <a href="mailto:yash69sharma69@gmail.com">
                                            <span style={{ fontSize: "20px" }}>
                                                &#9993;</span> abc@gmail.com</a>
                                    </Typography>
                                    <Typography component={"p"} variant="body2">
                                        <a href="tel:+917673076073">
                                            <span style={{ fontSize: "15px", marginLeft: "4px" }}>&#9742; </span>
                                            +91 76 73 076 073</a>
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Container>
                </Box>
            </Fragment>
        </>
    );
};

export default Products;
