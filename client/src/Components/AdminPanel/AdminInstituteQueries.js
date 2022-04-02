import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    CircularProgress,
    Container,
    Typography,
} from "@material-ui/core";
import React, { Fragment, useEffect, useState } from "react";
import {
    getAllInstituteQueries,
    updateInstituteStatus,
} from "../../utils/institute";
import AdminNav from "./AdminNav";
import { makeStyles } from "@material-ui/core/styles";
import { ExpandMoreOutlined } from "@material-ui/icons";
import { useStateValue } from "../../StateProvider";
import AdminLogin from "./AdminLogin";

const useStyles = makeStyles((theme) => ({
    adminInstituteQueries: {
        paddingTop: "72px",
        minHeight: "60vh",
    },
    header: {
        margin: "60px 0px",
        "& > h5": {
            fontWeight: "bold",
        },
    },
    circularProgress: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "50vh",
    },
    queriesAccordian: {
        marginBottom: "50px",
        width: "100%",
    },
    queriesAccordianList: {
        maxHeight: "80vh",
        overflow: "auto",
        width: "100%",
    },
    instituteQueries: {
        marginBottom: "30px",
        width: "100%",
    },
    instituteQuery: {
        padding: "20px",
        marginTop: "10px",
        width: "100%",
    },
    queryField: {
        marginBottom: "10px",
        width: "100%",
        "& > p": {
            fontWeight: "bold",
        },
    },
}));

const AdminInstituteQueries = () => {
    const classes = useStyles();
    const [instituteQueries, setInstituteQueries] = useState([]);
    const [instituteQueriesLoader, setInstituteQueriesLoader] = useState(true);

    const [{ admin }] = useStateValue();

    const handleMarkResponded = (id) => {
        if (updateInstituteStatus(id)) {
            setInstituteQueries(() => {
                return instituteQueries.map((instituteQuery) => {
                    if (instituteQuery.id === id) {
                        return { ...instituteQuery, responded: "true" };
                    }
                    return instituteQuery;
                });
            });
        }
    };

    useEffect(() => {
        setInstituteQueriesLoader(true);
        getAllInstituteQueries().then((res) => setInstituteQueries(res));
        setInstituteQueriesLoader(false);
    }, []);
    return admin ? (
        <Fragment>
            <AdminNav />
            <Box className={classes.adminInstituteQueries}>
                <Container>
                    <Box className={classes.header}>
                        <Typography variant="h5">
                            Queries from Institutes
                        </Typography>
                    </Box>
                    <Box>
                        {instituteQueriesLoader ? (
                            <Box className={classes.circularProgress}>
                                <CircularProgress />
                            </Box>
                        ) : (
                            <Fragment>
                                <Accordion className={classes.queriesAccordian}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreOutlined />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography className={classes.heading}>
                                            Un Responded Queries
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails
                                        className={classes.queriesAccordianList}
                                    >
                                        <Box
                                            className={classes.instituteQueries}
                                        >
                                            {instituteQueries.map(
                                                (instituteQuery) =>
                                                    instituteQuery.responded ===
                                                    "false" ? (
                                                        <Box
                                                            key={
                                                                instituteQuery.id
                                                            }
                                                            boxShadow={2}
                                                            className={
                                                                classes.instituteQuery
                                                            }
                                                        >
                                                            <Box
                                                                className={
                                                                    classes.queryField
                                                                }
                                                            >
                                                                <Typography variant="subtitle2">
                                                                    Institute's
                                                                    Name
                                                                </Typography>
                                                                <Typography
                                                                    component={
                                                                        "p"
                                                                    }
                                                                    variant="body1"
                                                                >
                                                                    {
                                                                        instituteQuery.name
                                                                    }
                                                                </Typography>
                                                            </Box>
                                                            <Box
                                                                className={
                                                                    classes.queryField
                                                                }
                                                            >
                                                                <Typography variant="subtitle2">
                                                                    Institute's
                                                                    Email (Click
                                                                    on the email
                                                                    to respond)
                                                                </Typography>
                                                                <Typography
                                                                    component={
                                                                        "p"
                                                                    }
                                                                    variant="body1"
                                                                >
                                                                    <a
                                                                        href={`mailto:${instituteQuery.email}`}
                                                                        target="_blank"
                                                                        rel="noreferrer"
                                                                    >
                                                                        {
                                                                            instituteQuery.email
                                                                        }
                                                                    </a>
                                                                </Typography>
                                                            </Box>
                                                            <Box
                                                                className={
                                                                    classes.queryField
                                                                }
                                                            >
                                                                <Typography variant="subtitle2">
                                                                    Institute's
                                                                    Phone
                                                                </Typography>
                                                                <Typography
                                                                    component={
                                                                        "p"
                                                                    }
                                                                    variant="body1"
                                                                >
                                                                    {
                                                                        instituteQuery.phone
                                                                    }
                                                                </Typography>
                                                            </Box>
                                                            <Box
                                                                className={
                                                                    classes.queryField
                                                                }
                                                            >
                                                                <Typography variant="subtitle2">
                                                                    Institute's
                                                                    Query
                                                                </Typography>
                                                                <Typography
                                                                    component={
                                                                        "p"
                                                                    }
                                                                    variant="body1"
                                                                >
                                                                    {
                                                                        instituteQuery.query
                                                                    }
                                                                </Typography>
                                                            </Box>
                                                            <Button
                                                                onClick={() =>
                                                                    handleMarkResponded(
                                                                        instituteQuery.id
                                                                    )
                                                                }
                                                                variant="contained"
                                                                color="primary"
                                                            >
                                                                Mark Responded
                                                            </Button>
                                                        </Box>
                                                    ) : (
                                                        ""
                                                    )
                                            )}
                                        </Box>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion className={classes.queriesAccordian}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreOutlined />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography className={classes.heading}>
                                            Responded Queries
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails
                                        className={classes.queriesAccordianList}
                                    >
                                        <Box
                                            className={classes.instituteQueries}
                                        >
                                            {instituteQueries.map(
                                                (instituteQuery) =>
                                                    instituteQuery.responded ===
                                                    "true" ? (
                                                        <Box
                                                            key={
                                                                instituteQuery.id
                                                            }
                                                            boxShadow={2}
                                                            className={
                                                                classes.instituteQuery
                                                            }
                                                        >
                                                            <Box
                                                                className={
                                                                    classes.queryField
                                                                }
                                                            >
                                                                <Typography variant="subtitle2">
                                                                    Institute's
                                                                    Name
                                                                </Typography>
                                                                <Typography
                                                                    component={
                                                                        "p"
                                                                    }
                                                                    variant="body1"
                                                                >
                                                                    {
                                                                        instituteQuery.name
                                                                    }
                                                                </Typography>
                                                            </Box>
                                                            <Box
                                                                className={
                                                                    classes.queryField
                                                                }
                                                            >
                                                                <Typography variant="subtitle2">
                                                                    Institute's
                                                                    Email
                                                                </Typography>
                                                                <Typography
                                                                    component={
                                                                        "p"
                                                                    }
                                                                    variant="body1"
                                                                >
                                                                    {
                                                                        instituteQuery.email
                                                                    }
                                                                </Typography>
                                                            </Box>
                                                            <Box
                                                                className={
                                                                    classes.queryField
                                                                }
                                                            >
                                                                <Typography variant="subtitle2">
                                                                    Institute's
                                                                    Phone
                                                                </Typography>
                                                                <Typography
                                                                    component={
                                                                        "p"
                                                                    }
                                                                    variant="body1"
                                                                >
                                                                    {
                                                                        instituteQuery.phone
                                                                    }
                                                                </Typography>
                                                            </Box>
                                                            <Box
                                                                className={
                                                                    classes.queryField
                                                                }
                                                            >
                                                                <Typography variant="subtitle2">
                                                                    Institute's
                                                                    Query
                                                                </Typography>
                                                                <Typography
                                                                    component={
                                                                        "p"
                                                                    }
                                                                    variant="body1"
                                                                >
                                                                    {
                                                                        instituteQuery.query
                                                                    }
                                                                </Typography>
                                                            </Box>
                                                        </Box>
                                                    ) : (
                                                        ""
                                                    )
                                            )}
                                        </Box>
                                    </AccordionDetails>
                                </Accordion>
                            </Fragment>
                        )}
                    </Box>
                </Container>
            </Box>
        </Fragment>
    ) : (
        <AdminLogin />
    );
};

export default AdminInstituteQueries;
