import {
    Box,
    Button,
    CircularProgress,
    Container,
    TextField,
    Typography,
} from "@material-ui/core";
import React, { Fragment, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AdminNav from "./AdminNav";
import { deleteFaq, getFaqs, registerNewFaq } from "../../utils/faqs";
import MuiAlert from "@material-ui/lab/Alert";
import { useStateValue } from "../../StateProvider";
import AdminLogin from "./AdminLogin";

const useStyles = makeStyles((theme) => ({
    adminFaqSection: {
        marginTop: "100px",
    },
    faqRegisterForm: {
        marginBottom: "100px",
        border: "1px solid lightgray",
        padding: "20px",
        "& > h5": {
            marginBottom: "30px",
            fontWeight: "bold",
        },
    },
    faqs: {
        margin: "40px 0px",
        "& > h4": {
            marginBottom: "20px",
        },
    },
    faq: {
        marginBottom: "20px",
        borderRadius: "10px",
        padding: "20px",
        "& > p": {
            marginBottom: "10px",
        },
    },
}));

const Alert = (props) => {
    return <MuiAlert {...props} />;
};

const AdminFaq = () => {
    const classes = useStyles();
    const [faq, setFaq] = useState({ question: "", answer: "" });
    const [faqRegisterLoader, setFaqRegisterLoader] = useState(false);
    const [faqRegisterError, setFaqRegisterError] = useState(null);
    const [faqRegisterSuccess, setFaqRegisterSuccess] = useState(null);

    const [faqs, setFaqs] = useState([]);
    const [faqsLoader, setFaqsLoader] = useState(false);

    const [{ admin }] = useStateValue();

    useEffect(() => {
        setFaqsLoader(true);
        getFaqs().then((res) => setFaqs(res));
        setFaqsLoader(false);
    }, []);

    const handleFAQChange = (event) => {
        setFaq({ ...faq, [`${event.target.name}`]: event.target.value });
    };

    const handleFAQRegister = () => {
        if (
            registerNewFaq(
                faq,
                setFaqRegisterLoader,
                setFaqRegisterError,
                setFaqRegisterSuccess
            )
        ) {
            setFaqsLoader(true);
            getFaqs().then((res) => setFaqs(res));
            setFaqsLoader(false);
        }
    };

    const handleFAQDelete = (id) => {
        deleteFaq(id);
        setFaqs(() => {
            return faqs.filter((f) => f.id !== id);
        });
    };

    return (
        <Fragment>
            {admin ? (
                <Box>
                    <AdminNav />
                    <Container style={{ marginTop: "72px" }}>
                        <Box className={classes.adminFaqSection}>
                            <Box
                                component={"form"}
                                className={classes.faqRegisterForm}
                            >
                                <Typography component={"h5"} variant="h5">
                                    Add new FAQ
                                </Typography>
                                {faqRegisterError ? (
                                    <Alert severity="error">
                                        {faqRegisterError}
                                    </Alert>
                                ) : (
                                    ""
                                )}
                                {faqRegisterSuccess ? (
                                    <Alert severity="success">
                                        {faqRegisterSuccess}
                                    </Alert>
                                ) : (
                                    ""
                                )}
                                <TextField
                                    fullWidth
                                    size="small"
                                    margin="normal"
                                    variant="outlined"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    name="question"
                                    placeholder="FAQ Question"
                                    type={"text"}
                                    value={faq.question}
                                    onChange={handleFAQChange}
                                />
                                <TextField
                                    fullWidth
                                    multiline
                                    size="small"
                                    margin="normal"
                                    variant="outlined"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    name="answer"
                                    placeholder="FAQ Answer"
                                    type={"text"}
                                    value={faq.answer}
                                    onChange={handleFAQChange}
                                />
                                {faqRegisterLoader ? (
                                    <CircularProgress />
                                ) : (
                                    <Button
                                        onClick={handleFAQRegister}
                                        variant="contained"
                                        color="primary"
                                    >
                                        Register
                                    </Button>
                                )}
                            </Box>
                            <Box className={classes.faqs}>
                                <Typography variant="h4">All Faqs</Typography>
                                {faqsLoader ? (
                                    <Box>
                                        <CircularProgress />
                                    </Box>
                                ) : (
                                    faqs.map((f) => (
                                        <Box
                                            boxShadow={2}
                                            className={classes.faq}
                                            key={f.id}
                                        >
                                            <Typography
                                                component={"p"}
                                                variant="body1"
                                            >
                                                {f.question}
                                            </Typography>
                                            <Typography
                                                component={"p"}
                                                variant="subtitle1"
                                            >
                                                {f.answer}
                                            </Typography>
                                            <Button
                                                onClick={() =>
                                                    handleFAQDelete(f.id)
                                                }
                                                variant="contained"
                                                color="primary"
                                            >
                                                Delete FAQ
                                            </Button>
                                        </Box>
                                    ))
                                )}
                            </Box>
                        </Box>
                    </Container>
                </Box>
            ) : (
                <AdminLogin />
            )}
        </Fragment>
    );
};

export default AdminFaq;
