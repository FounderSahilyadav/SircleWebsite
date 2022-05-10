import axios from "axios";

// Axios file with base url
const Axios = axios.create({
    baseURL: process.env.REACT_APP_HOST || "http://localhost:5000",
    withCredentials: true,
    credentials: "include",
});

export default Axios;