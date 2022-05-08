import { Box, Button, Container, makeStyles } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React, { Fragment, useEffect, useState } from 'react';
import { deleteCall, fetchCalls } from '../../utils/callRequests';
import { useStateValue } from '../../StateProvider';
import AdminNav from "./AdminNav";
import AdminLogin from "./AdminLogin";



const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: '100px',
        border: '1px solid lightgray',
        borderRadius: '5px',
        padding: '20px',
    },
    item: {
        margin: '20px',
        marginBottom: '50px',
        border: '1px solid lightgray',
        padding: '20px',
        borderRadius: '5px',
    },
    itemAlign: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },


}));
const CallRequests = () => {
    const classes = useStyles();
    const [{ admin }] = useStateValue(); // Admin from context API

    const [loader, setLoader] = useState(false);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    useEffect(() => {
        fetchCalls(setLoader, setError, setSuccess, setData);
    }, []);
    const handleDelete = (id) => {
        console.log(id);
        deleteCall(id, setLoader, setError, setSuccess);
    }
    return admin ? (
        <Fragment>
            <AdminNav />
            <Container className={classes.container}>
                {loader ? (<div>Loading...</div>) : (
                    <div>
                        <h2>Call Requests</h2>
                        {error ? <Alert severity="error">{error}</Alert> : ""}
                        {success ? <Alert severity="success">{success}</Alert> : ""}
                        {data.length === 0 ? (<div>No data</div>) : null}
                        {data.map((item, index) => (
                            <Box key={index} className={classes.item}>
                                <div className={classes.itemAlign}>
                                    <span>Name : {item.name}</span>
                                    <span>Class : {item.className}</span>
                                </div>
                                <div>Phone : {item.phone}</div>
                                <br />
                                <Button variant='contained' color='primary' onClick={() => handleDelete(item.id)}>Delete</Button>
                            </Box>
                        ))}

                    </div>)}
            </Container>
        </Fragment>
    ) : (
        <AdminLogin />
    );
}

export default CallRequests