import { Box, Button, CircularProgress, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import heroBackground from "../../assets/hero_background.jpg";
import heroSectionAnim from "../../assets/Animation.mp4";
import { useEffect, useState } from "react";
import { Alert } from "@material-ui/lab";
import { requestCallBack } from "../../utils/student_update";


const useStyles = makeStyles((theme) => ({
    heroSectionBackground: {
        background: "#18a9e2",
    },
    heroSection: {
        minHeight: "calc(100vh - 72px)",
        marginTop: "72px",
        // marginBottom: "72px",
        color: "#25AEE4",
        background: `linear-gradient(to Right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)), url(${heroBackground})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        backgroundPosition: "right bottom",
        [theme.breakpoints.down("md")]: {
            height: "auto",
        },
    },
    heroContent: {
        width: "70%",
        position: "relative",
        maxWidth: "700px",
        textAlign: "center",
        color: "white",
        height: "100%",
        "& > video": {
            width: "100%",
            height: "500px",

            marginLeft: "50px",
            background: "none",
            marginTop: "-50px",

        },
        [theme.breakpoints.down("600")]: {
            "& > video": {
                marginLeft: "0px",
                width: "80%",
                marginTop: "-150px",
            },
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
        },
        [theme.breakpoints.between(600, 1000)]: {
            "& > video": {
                marginLeft: "0px",
                width: "80%",
                marginTop: "-100px",
            },
            width: "100%",
            height: "90%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
        },
    },
    form: {
        zIndex: "99",
        marginTop: "150px",
        marginLeft: "50px",
        borderRadius: "10px",
        outlineStyle: "solid",
        outlineColor: "rgba(63,81,181, 0.3)",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
        outlineWidth: "thick",
        padding: "20px",
        paddingBottom: "30px",
        width: "100%",
        transitionTimingFunction: "ease-in-out",
        transitionDuration: "0.4s",
        "&:hover": {
            transform: "scale(1.02)",
            borderRadius: "15px",
            boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        },
        [theme.breakpoints.down("600")]: {
            width: "80%",
            paddingLeft: "0px",
            marginLeft: "0px",
            marginTop: -100,
            marginBottom: "300px"
        },
        [theme.breakpoints.between(600, 1000)]: {
            width: "80%",
            paddingLeft: "0px",
            marginLeft: "100px",
            marginTop: "0px",
            marginBottom: "450px"
        },

    },
    ipt: {
        color: "white",
        background: "white",
        margin: "10px",
        borderRadius: "10px",
        width: "45%",
        [theme.breakpoints.down("600")]: {
            width: "100%",
        },
        [theme.breakpoints.between(600, 1000)]: {
            width: "100%",
        },
    },
    button: {
        marginTop: "30px",
        marginLeft: "200px",
        marginRight: "25px",
        [theme.breakpoints.down('600')]: {
            marginLeft: "0",
            marginRight: "0"
        },
        [theme.breakpoints.between(600, 1000)]: {
            marginLeft: 65
        },
    },
    tagline: {
        color: "white",
        width: "auto",

        fontSize: "1.5rem",
        [theme.breakpoints.down('600')]: {
            width: "100%",

        },
    },
    heading: {
        textAlign: "left",
        marginLeft: "30px",
        color: "#3F51B5",
        fontSize: "1.2rem",
        [theme.breakpoints.down('600')]: {
            marginLeft: "0",
            textAlign: "center",
        },
    },
    taglineOuter: {
        zIndex: "99",
        width: "100%",

        marginLeft: "50px",
        marginTop: "-200px",
        marginBottom: "200px",
        [theme.breakpoints.down('600')]: {
            marginLeft: "0px",
        }
    },

}));

const HeroSection = () => {
    const classes = useStyles();
    const [name, setName] = useState(null);
    const [className, setClassName] = useState(null);
    const [phone, setPhone] = useState(null);
    const [error, setError] = useState(null);
    const [loader, setLoader] = useState(false);
    const [success, setSuccess] = useState(null);
    const handleChange = (e) => {
        if (e.target.name === 'name') {
            setName(e.target.value);
        }
        if (e.target.name === 'className') {
            setClassName(e.target.value);
        }
        if (e.target.name === 'phone') {
            setPhone(e.target.value);
        }
    }
    const handleSubmit = () => {
        // console.log("You clicked submit");
        // console.log(name, className, phone);
        requestCallBack(name, className, phone, setLoader,
            setError, setSuccess);
    }

    useEffect(() => {
        setTimeout(() => {
            setError(null);
            setSuccess(null);
        }, 2000);
    }
        , [error, success]);


    // Yet to be completed
    return (
        <Box className={classes.heroSectionBackground}>
            <Box className={classes.heroSection}>
                {/* <Container> */}
                <Box className={classes.heroContent}>
                    <video autoPlay={true} controls={false} muted={true} >
                        <source src={heroSectionAnim} type="video/mp4" className={classes.video} />
                        Sorry, your browser doesn't support embedded videos.
                    </video>
                    <div className={classes.taglineOuter}>
                        <Button variant="text" className={classes.tagline}><i>From Now No Rat Race</i> </Button>
                    </div>
                    <div className={classes.form}>

                        {error ? <Alert severity="error">{error}</Alert> : ""}
                        {success ? <Alert severity="success">{success}</Alert> : ""}
                        <h3 className={classes.heading}>Request a call back</h3>
                        <TextField id="outlined-basic" label="Full Name" variant="outlined"
                            className={classes.ipt}
                            value={name} onChange={handleChange} name="name"
                        />
                        <TextField id="outlined-basic" label="Class ex-9th" variant="outlined" className={classes.ipt}
                            value={className} onChange={handleChange} name="className"
                        />
                        <TextField id="outlined-basic" label="Mobile No." variant="outlined" className={classes.ipt}
                            value={phone} name="phone" onChange={handleChange}
                        />{loader ? (
                            <CircularProgress className={classes.button} />
                        ) :
                            <Button variant="contained" color="primary" className={classes.button} onClick={handleSubmit}>Submit</Button>}

                    </div>
                    {/* <Button variant="text" className={classes.tagline1}><i>From Now No Rat Race</i> </Button> */}
                </Box>
                {/* </Container> */}
            </Box>
        </Box>
    );
};

export default HeroSection;
