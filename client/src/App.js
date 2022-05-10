import "./App.css";
import "animate.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Components/Home/Home";
import React, { Fragment, useEffect, useState } from "react";
import Products from "./Components/Products/Products";
import Videos from "./Components/Videos/Videos";
import Footer from "./Components/Footer/Footer";
import { Box, CircularProgress } from "@material-ui/core";
import Navbar from "./Components/Navbar/Navbar";
import About from "./Components/About/About";
import Blogs from "./Components/Blogs/Blogs";
import StudentRegister from "./Components/StudentRegister/StudentRegister";
import Blog from "./Components/Blog/Blog";
import AdminFaq from "./Components/AdminPanel/AdminFaq";
import AdminVideos from "./Components/AdminPanel/AdminVideos";
import AdminInstituteQueries from "./Components/AdminPanel/AdminInstituteQueries";
import AdminWriteBlog from "./Components/AdminPanel/AdminWriteBlog";
import AdminBlogs from "./Components/AdminPanel/AdminBlogs";
import AdminBlog from "./Components/AdminPanel/AdminBlog";
import AdminTestimonials from "./Components/AdminPanel/AdminTestimonials";
import { getUsers, refreshToken } from "./Auth";
import { useStateValue } from "./StateProvider";
import { makeStyles } from "@material-ui/styles";
import AdminStudents from "./Components/AdminPanel/AdminStudents";
import AdminMentors from "./Components/AdminPanel/AdminMentors";
import AdminTeamMembers from "./Components/AdminPanel/AdminTeamMembers";
import StudentSign from "./Components/StudentRegister/StudentSign";
import { getStudentDetails } from "./utils/student";
import StudentProfile from "./Components/MyProfile/StudentProfile";
import ChangePassword from "./Components/StudentRegister/ChangePassword";
import ContactUsPopup from "./Components/Home/ContactUsPopup";
import WhatsApp from "./Components/WhatsApp";
import CourseBuy from "./Components/Home/CourseBuy";
import Myproducts from "./Components/Products/Myproducts";
import ResetPassword from "./Components/Home/ResetPassword";
import CallRequests from "./Components/AdminPanel/CallRequests";
import FreeTrial from "./Components/AdminPanel/FreeTrial";

const useStyles = makeStyles((theme) => ({
    circularProgress: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
    },
}));

function App() {
    const classes = useStyles();
    const [, dispatch] = useStateValue();
    const [open, setOpen] = useState(false);
    const [signOpen, setSignOpen] = useState(false);
    const [token, setToken] = useState("");
    const [expire, setExpire] = useState("");
    const [loader, setLoader] = useState(true);
    const [studentData, setStudentData] = useState({});
    const [openPassword, setOpenPassword] = useState(false);
    const [openContact, setOpenContact] = useState(false);
    const [resetPassword, setResetPassword] = useState(false);

    const handleSignOpen = () => {
        setSignOpen(true);
    }
    const handleSignClose = () => {
        setSignOpen(false);
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const [studentToken, setStudentToken] = useState("");
    useEffect(() => {
        console.log("host", process.env.REACT_APP_HOST);
        setLoader(true);
        // console.log("err");
        const fetchStudentDetails = async () => {
            refreshToken(setToken, setExpire).then((res) => {
                if (res) {
                    getUsers(token, expire, setToken, setExpire).then((res) => {
                        if (res) {
                            dispatch({ type: "SET_ADMIN" });
                        }
                    });
                }
            });

            if (localStorage.getItem("token")) {
                // console.log("running");
                setStudentToken(localStorage.getItem("token"));
                // console.log(studentToken);
                getStudentDetails(localStorage.getItem('token'), setStudentToken).then(res => {
                    setStudentData(res);
                    setLoader(false);
                }).catch(err => {
                    // console.log(err);
                });
            } else {
                setLoader(false);
            }
        }
        fetchStudentDetails();
        // console.log("here");
    }, [studentToken]);
    // useEffect(() => {

    const handleStudentToken = (token) => {
        window.location.reload();
    }
    return (
        <Router>
            {loader ? (
                <Box className={classes.circularProgress}>
                    <CircularProgress />
                </Box>
            ) : (
                <Fragment>
                    <Box component={"div"} className="App">
                        <Navbar handleClickOpen={handleClickOpen} handleSignOpen={handleSignOpen} studentToken={studentToken}
                            setStudentToken={handleStudentToken} studentData={studentData} setOpenPassword={setOpenPassword} setOpenContact={setOpenContact} />
                        <Routes>
                            <Route exact path="/" element={<Home />} />
                            <Route
                                path="/our-products"
                                element={<Products studentData={studentData} />}
                            />
                            <Route exact path="/myprofile" element={<StudentProfile studentData={studentData} studentToken={studentToken} />} />
                            <Route exact path="/videos" element={<Videos />} />
                            <Route exact path="/about" element={<About />} />
                            <Route exact path="/blogs" element={<Blogs />} />
                            <Route path="/blogs/:id" element={<Blog />} />
                            <Route
                                exact
                                path="/administrator"
                                element={<AdminFaq />}
                            />
                            <Route
                                exact
                                path="/administrator/callrequests"
                                element={<CallRequests />}
                            />
                            <Route
                                exact
                                path="/administrator/freetrail"
                                element={<FreeTrial />}
                            />
                            <Route
                                exact
                                path="/administrator/write_blog"
                                element={<AdminWriteBlog />}
                            />
                            <Route
                                exact
                                path="/administrator/blogs"
                                element={<AdminBlogs />}
                            />
                            <Route
                                exact
                                path="/administrator/blogs/:id"
                                element={<AdminBlog />}
                            />
                            <Route
                                exact
                                path="/administrator/videos"
                                element={<AdminVideos />}
                            />
                            <Route
                                exact
                                path="/administrator/institute-queries"
                                element={<AdminInstituteQueries />}
                            />
                            <Route
                                exact
                                path="/administrator/testimonials"
                                element={<AdminTestimonials />}
                            />
                            <Route
                                exact
                                path="/administrator/students"
                                element={<AdminStudents />}
                            />
                            <Route
                                exact
                                path="/administrator/mentors"
                                element={<AdminMentors />}
                            />
                            <Route
                                exact
                                path="/administrator/squad_members"
                                element={<AdminTeamMembers />}
                            />
                            <Route
                                exact
                                path="/course/fee"
                                element={<CourseBuy studentData={studentData} studentToken={studentToken} />}
                            />
                            <Route
                                exact
                                path="/myprograms"
                                element={<Myproducts studentToken={studentToken} />}
                            />

                        </Routes>
                        <Footer />
                    </Box>
                    <Box>
                        <StudentRegister
                            open={open}
                            handleClose={handleClose}
                        />
                        <StudentSign open={signOpen} handleClose={handleSignClose} setStudentToken={handleStudentToken} studentToken={studentToken} handleOpenReset={() => setResetPassword(true)} />
                        <ChangePassword open={openPassword} handleClose={() => setOpenPassword(false)} studentToken={studentToken} />
                        <ContactUsPopup open={openContact} handleClose={() => setOpenContact(false)} />
                        <ResetPassword open={resetPassword} handleClose={() => setResetPassword(false)} handleOpenPassword={() => setOpenPassword(true)} />
                    </Box>

                    <WhatsApp />
                </Fragment>
            )}{" "}
        </Router>
    );
}

export default App;
