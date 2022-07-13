import {
    Box,
    Container,
    Grid,
    List,
    ListItem,
    Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { HashLink } from "react-router-hash-link";
import dishaImg from "../../assets/dishaImg.jpg";
import personaImg from "../../assets/personaImg.jpg";
import sakhaImg from "../../assets/sakhaImg.jpg";

const useStyles = makeStyles((theme) => ({
    productSection: {
        marginTop: "50px",
    },
    productsHeader: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        marginBottom: "30px",
        "& > h5": {
            fontWeight: theme.typography.fontWeightBold,
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
    productPageNav: {
        marginBottom: "20px",
        marginTop: "auto",
        "& > a": {
            textDecoration: "none",
            color: "#fff",
        },
    },
}));

const ProductSection = () => {
    const classes = useStyles();
    return (
        // Product section for home page
        <Box className={classes.productSection}>
            <Container>
                <Grid className={classes.productsHeader}>
                    <Typography variant="h5">Our Products</Typography>
                </Grid>
                <Box className={classes.productsDetails}>
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
                                Opportunities are in bulk. How many careers do
                                you really know?
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
                                What career you should opt for entirenof your
                                working life?
                            </Typography>
                            <Typography
                                style={{ marginBottom: "20px" }}
                                component={"h6"}
                                variant="h6"
                                className={classes.sakhaHeader}
                            >
                                "A thing can't become your Passion if you have
                                never heard or done in before."
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
                                Know the most suitable career path by DISHA. We
                                are a one stop solution to All Councelling
                                Needs. We provide complete counselling to make
                                you know your Passion and Interest.
                            </Typography>
                        </Box>

                        {/* Redirects to the products page */}
                        <Box className={classes.productPageNav}>
                            <HashLink
                                smooth
                                style={{ color: "#18a9e2" }}
                                to={"/our-products#champion"}
                            >
                                <Typography variant="body1">
                                    Learn more &#10093;
                                </Typography>
                            </HashLink>
                        </Box>
                    </Box>
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
                                PERSONA MAKES YOU BETTER VERSIONS OF YOURSELF
                                BY-
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
                                        help you acquire good etiquettes, good
                                        body language and leadership qualities.
                                    </Typography>
                                </ListItem>
                                <ListItem>
                                    <Typography variant="subtitle2">
                                        <Typography component={"small"}>
                                            &#9741;
                                        </Typography>
                                        improving your communication skills and
                                        public speaking.
                                    </Typography>
                                </ListItem>
                            </List>
                        </Box>

                        {/* Redirects to the products page */}
                        <Box className={classes.productPageNav}>
                            <HashLink
                                smooth color="#fff" to={"/our-products#champion"}>
                                <Typography variant="body1">
                                    Learn more &#10093;
                                </Typography>
                            </HashLink>
                        </Box>
                    </Box>
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
                                        Helps you in emotional and mental health
                                        issues.
                                    </Typography>
                                </ListItem>
                                <ListItem>
                                    <Typography variant="subtitle2">
                                        <Typography component={"small"}>
                                            &#9741;
                                        </Typography>
                                        Helps you deal with addiction and bad
                                        habits.
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

                        {/* Redirects to the products page */}
                        <Box className={classes.productPageNav}>
                            <HashLink
                                smooth
                                style={{ color: "#18a9e2" }}
                                to={"/our-products#champion"}
                            >
                                <Typography variant="body1">
                                    Learn more &#10093;
                                </Typography>
                            </HashLink>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default ProductSection;
