import { Box, Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import contactMiddle from "../../assets/contactMiddle.jpg";
import contactImg from "../../assets/contactImg.png";
import StudentRegistration from "../../Forms/StudentRegistration";
import InstituteQuery from "../../Forms/InstituteQuery";

const useStyles = makeStyles((theme) => ({
    contactSection: {
        marginTop: theme.spacing(15),
        marginBottom: theme.spacing(15),
    },
    contactHeader: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: theme.spacing(5),
        textAlign: "center",
        "& small": {
            fontSize: theme.typography.pxToRem(10),
            fontWeight: theme.typography.fontWeightBold,
            color: "#25AEE4",
            marginBottom: theme.spacing(1),
            background: "#ECFDFF",
            padding: "6px",
            borderRadius: "5px",
        },
        "& h5": {
            fontSize: theme.typography.pxToRem(20),
            fontWeight: theme.typography.fontWeightBold,
            color: "#101828",
            marginBottom: theme.spacing(1),
        },
    },
    contactMiddle: {
        display: "flex",
        justifyContent: "center",
        width: "100%",
        height: "300px",
        background: "#fff",
        "& > img": {
            height: "100%",
            maxWidth: "100%",
        },
    },
    contact: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        marginTop: "30px",
    },

    contactTop: {
        display: "flex",
        flexDirection: "row",
        background: "#1A2E39",
        [theme.breakpoints.down(700)]: {
            flexDirection: "column",
        },
    },
    contactTopLeft: {
        display: "flex",
        justifyContent: "center",
        width: "100%",
        "& > img": {
            height: "250px",
            [theme.breakpoints.down(400)]: {
                width: "95%",
                height: "auto",
            },
        },
    },

    contactTopRight: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        textAlign: "center",
        "& > h5": {
            color: "#fff",
            marginBottom: "20px",
        },
        "& > p": {
            color: "#fff",
            textAlign: "center",
            marginBottom: "10px",
        },
    },

    contactSections: {
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        background: "#fff",
        [theme.breakpoints.down(700)]: {
            flexDirection: "column",
        },
    },

    textField: {
        // fontSize: "12px",
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: "#fff",
    },
}));
const ContactUs = () => {
    const classes = useStyles();

    return (
        <Box className={classes.contactSection}>
            <Container>
                <Box className={classes.contactHeader}>
                    <Typography component={"small"}>Contact Us</Typography>
                    <Typography component={"h5"}>
                        We'd love to hear from you
                    </Typography>
                </Box>

                <Box className={classes.contactMiddle}>
                    <img src={contactMiddle} alt="" />
                </Box>
                <Box boxShadow={2} className={classes.contact}>
                    <Box className={classes.contactTop}>
                        <Box className={classes.contactTopLeft}>
                            <img src={contactImg} alt="" />
                        </Box>
                        <Box className={classes.contactTopRight}>
                            <Typography variant="h5">CONTACT US</Typography>
                            <Typography
                                variant="body2"
                                style={{
                                    fontStyle: "italic",
                                    color: "rgba(211, 211, 211, 0.801)",
                                    margin: "0px 50px",
                                    marginBottom: "30px",
                                }}
                            >
                                Need to get in touch with us? Either fill out
                                the form with your inquiry or find the email
                                you'd like to contact below.
                            </Typography>
                            <Typography component={"p"} variant="body2">
                                <a href="mailto:yash69sharma69@gmail.com">
                                    &#9993; abc@gmail.com</a>
                            </Typography>
                            <Typography component={"p"} variant="body2">
                                <a href="tel:+917673076073">&#9742; +91 76 73 076 073</a>
                            </Typography>
                        </Box>
                    </Box>
                    <Box className={classes.contactSections}>
                        {/* Student registration form */}
                        <StudentRegistration />

                        {/* Institute query form */}
                        <InstituteQuery />
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default ContactUs;
