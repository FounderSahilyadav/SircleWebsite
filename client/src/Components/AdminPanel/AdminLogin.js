import React, { useState } from "react";
import Axios from "../../Axios";
import qs from "qs";
import { makeStyles } from "@material-ui/core/styles";
import {
    Box,
    Button,
    Container,
    TextField,
    Typography,
} from "@material-ui/core";
import { useStateValue } from "../../StateProvider";

const useStyles = makeStyles((theme) => ({
    adminLogin: {
        marginTop: "50px",
        paddingTop: "72px",
        minHeight: "60vh",
    },
}));

const AdminLogin = () => {
    const classes = useStyles();
    const [key, setKey] = useState("");
    const [password, setPassword] = useState("");
    const [, dispatch] = useStateValue();

    const handleLogin = async () => {
        try {
            const result = await Axios({
                method: "POST",
                url: "/admin/login",
                data: qs.stringify({
                    key,
                    password,
                }),
                withCredentials: true,
                credentials: "include",
                headers: {
                    "Content-type":
                        "application/x-www-form-urlencoded;charset=utf-8",
                },
            });
            console.log(result.data);
            dispatch({ type: "SET_ADMIN" });
        } catch (err) {
            console.log(err.response);
        }
    };
    return (
        <Box className={classes.adminLogin}>
            <Container>
                <Box>
                    <Typography variant="h4">Admin Login</Typography>
                    <TextField
                        name="Key"
                        className={classes.textField}
                        placeholder="Admin Key"
                        type={"text"}
                        fullWidth
                        size="small"
                        margin="normal"
                        variant="outlined"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={key}
                        onChange={(e) => setKey(e.target.value)}
                    />
                    <TextField
                        name="password"
                        className={classes.textField}
                        placeholder="Admin Password"
                        type={"text"}
                        fullWidth
                        size="small"
                        margin="normal"
                        variant="outlined"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        onClick={handleLogin}
                        variant="contained"
                        color="primary"
                    >
                        LOG IN
                    </Button>
                </Box>
            </Container>
        </Box>
    );
};

export default AdminLogin;
