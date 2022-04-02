import {
    Box,
    Container,
    Typography,
    Accordion,
    AccordionDetails,
    AccordionSummary,
    CircularProgress,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ExpandMoreOutlined } from "@material-ui/icons";
import { getFaqs } from "../../utils/faqs";

const useStyles = makeStyles((theme) => ({
    faqSection: {
        marginTop: "50px",
        marginBottom: "50px",
    },
    faqHeader: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: "50px",
        textAlign: "center",
        "& h5": {
            fontWeight: "bold",
            marginBottom: "20px",
        },
        "& p": {
            fontWeight: "bold",
            color: "#667085",
            textAlign: "center",
        },
    },
    faqs: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: "1000px",
        margin: "0 auto",
    },
    faq: {
        marginBottom: "25px",
        width: "100%",
        border: "none",
        outline: "none",
        background: "none",
        boxShadow: "none",
        "&::before": {
            height: "0px",
        },
        "&:hover": {
            background: "rgba(211, 211, 211, 0.39)",
        },
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
        color: "#101828",
    },
    answer: {
        color: "#667085",
        fontSize: theme.typography.pxToRem(12),
    },
    circularProgress: {
        display: "flex",
        flexDirection: "center",
        width: "100%",
    },
}));

const FAQSection = () => {
    const classes = useStyles();

    // Hooks for handling faqs
    const [faqs, setFaqs] = useState([]); // Storing all the faqs
    const [faqLoader, setFaqLoader] = useState(false); // Loader, while the faqs are being fetched from database

    // Fetch faqs
    useEffect(() => {
        setFaqLoader(true);
        getFaqs().then((res) => setFaqs(res));
        setFaqLoader(false);
    }, []);

    return (
        <Box className={classes.faqSection}>
            <Container>
                <Box className={classes.faqHeader}>
                    <Typography variant="h5" component={"h5"}>
                        Frequently Asked Questions
                    </Typography>
                    <Typography variant="body2" component={"p"}>
                        Everything you need to know about our product and
                        services.
                    </Typography>
                </Box>
                <Box className={classes.faqs}>
                    {faqLoader ? (
                        // While the faqs are still fetched
                        <Box className={classes.circularProgress}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        // Maps through faqs
                        faqs.map((faq) => (
                            // Single faq
                            <Accordion key={faq.id} className={classes.faq}>
                                {/* AccordianSummary for faq question */}
                                <AccordionSummary
                                    expandIcon={<ExpandMoreOutlined />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography className={classes.heading}>
                                        {faq.question}
                                    </Typography>
                                </AccordionSummary>

                                {/* AccordionDetails for faq answer */}
                                <AccordionDetails>
                                    <Typography className={classes.answer}>
                                        {faq.answer}
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        ))
                    )}
                </Box>
            </Container>
        </Box>
    );
};

export default FAQSection;
