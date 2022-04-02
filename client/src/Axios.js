import axios from "axios";

// Axios file with base url
const Axios = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true,
    credentials: "include",
});

export default Axios;
