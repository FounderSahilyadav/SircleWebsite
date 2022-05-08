import Axios from "../Axios";
import qs from "qs";
const host = "http://localhost:5000";

export const fetchFreetrial = async(setLoader, setError, setSuccess, setData) => {
    setLoader(true);
    setError(null);
    setSuccess(null);
    try {
        const result = await Axios({
            method: "POST",
            url: `${host}/api/all/freetrial`,
            withCredentials: true,
            credentials: "include",
            headers: {
                "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
            },
        });
        const response = result.data.results;
        await setData(response);
        setLoader(false);
        setSuccess("Calls fetched!");
    } catch (err) {
        setError(err.response.data);
        setLoader(false);
    }
}

export const deletefreetrial = async(Id, setLoader, setError, setSuccess) => {
    setLoader(true);
    setError(null);
    setSuccess(null);
    try {
        await Axios({
            method: "POST",
            url: `${host}/api/delete/freetrial`,
            data: qs.stringify({
                id: Id,
            }),
            withCredentials: true,
            credentials: "include",
            headers: {
                "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
            },
        });
        setLoader(false);
        setSuccess("Call deleted!");
    } catch (err) {
        setError(err.response.data);
        setLoader(false);
    }
}