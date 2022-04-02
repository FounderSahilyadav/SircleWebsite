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
    const [token, setToken] = useState("");
    const [expire, setExpire] = useState("");
    const [loader, setLoader] = useState(true);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        setLoader(true);
        refreshToken(setToken, setExpire).then((res) => {
            if (res) {
                getUsers(token, expire, setToken, setExpire).then((res) => {
                    if (res) {
                        dispatch({ type: "SET_ADMIN" });
                    }
                });
            }
        });
        setLoader(false);
    }, []);
    return (
        <Router>
            {loader ? (
                <Box className={classes.circularProgress}>
                    <CircularProgress />
                </Box>
            ) : (
                <Fragment>
                    <Box component={"div"} className="App">
                        <Navbar handleClickOpen={handleClickOpen} />
                        <Routes>
                            <Route exact path="/" element={<Home />} />
                            <Route
                                path="/our-products"
                                element={<Products />}
                            />
                            <Route path="/videos" element={<Videos />} />
                            <Route path="/about" element={<About />} />
                            <Route exact path="/blogs" element={<Blogs />} />
                            <Route path="/blogs/:id" element={<Blog />} />
                            <Route
                                exact
                                path="/administrator"
                                element={<AdminFaq />}
                            />
                            <Route
                                path="/administrator/write_blog"
                                element={<AdminWriteBlog />}
                            />
                            <Route
                                path="/administrator/blogs"
                                element={<AdminBlogs />}
                            />
                            <Route
                                path="/administrator/blogs/:id"
                                element={<AdminBlog />}
                            />
                            <Route
                                path="/administrator/videos"
                                element={<AdminVideos />}
                            />
                            <Route
                                path="/administrator/institute-queries"
                                element={<AdminInstituteQueries />}
                            />
                            <Route
                                path="/administrator/testimonials"
                                element={<AdminTestimonials />}
                            />
                            <Route
                                path="/administrator/students"
                                element={<AdminStudents />}
                            />
                            <Route
                                path="/administrator/mentors"
                                element={<AdminMentors />}
                            />
                            <Route
                                path="/administrator/squad_members"
                                element={<AdminTeamMembers />}
                            />
                        </Routes>
                        <Footer />
                    </Box>
                    <Box>
                        <StudentRegister
                            open={open}
                            handleClose={handleClose}
                        />
                    </Box>
                </Fragment>
            )}{" "}
        </Router>
    );
}

export default App;
