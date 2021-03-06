import Axios from "../Axios";
import qs from "qs";
const host = process.env.REACT_APP_HOST;

export const fetchCalls = async(setLoader, setError, setSuccess, setData) => {
    setLoader(true);
    setError(null);
    setSuccess(null);
    try {
        const result = await Axios({
            method: "POST",
            url: `${host}/api/all/callback`,
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

export const deleteCall = async(callId, setLoader, setError, setSuccess) => {
    setLoader(true);
    setError(null);
    setSuccess(null);
    try {
        const result = await Axios({
            method: "POST",
            url: `${host}/api/delete/callback`,
            data: qs.stringify({
                id: callId,
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