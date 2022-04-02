import axios from "axios";
import jwt_decode from "jwt-decode";
import Axios from "./Axios";

// Check if refresh token stored matches with admin refresh token in databse
export const refreshToken = async (setToken, setExpire) => {
    try {
        const response = await Axios({
            method: "GET",
            url: "/token",
            withCredentials: true,
            credentials: "include",
        });
        await setToken(response.data.accessToken);
        const decoded = jwt_decode(response.data.accessToken);
        await setExpire(decoded.exp);
        return true;
    } catch (error) {
        return false;
    }
};

// Getting the admin
export const getUsers = async (token, expire, setToken, setExpire) => {
    const axiosJWT = axios.create({ baseURL: "http://localhost:5000" });
    try {
        axiosJWT.interceptors.request.use(
            async (config) => {
                const currentDate = new Date();
                if (expire * 1000 < currentDate.getTime()) {
                    const response = await Axios({
                        method: "GET",
                        url: "/token",
                        withCredentials: true,
                        credentials: "include",
                    });
                    config.headers.Authorization = `Bearer ${response.data.accessToken}`;
                    await setToken(response.data.accessToken);
                    const decoded = jwt_decode(response.data.accessToken);
                    await setExpire(decoded.exp);
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );
        await axiosJWT({
            method: "GET",
            url: "/admin/get_admin",
            withCredentials: true,
            credentials: "include",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return true;
    } catch (err) {
        return false;
    }
};
