import Axios from "../Axios";
import qs from "qs";
const host = "http://localhost:5000";
let filter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export const changeEmail = async(
    newEmail,
    setLoader,
    setError,
    setSuccess,
    handleClose,
    studentToken,
    setEmail
) => {
    setLoader(true);
    setError(null);
    setSuccess(null);
    if (!newEmail || newEmail.length === 0 || !filter.test(newEmail)) {
        setError("Please enter a valid email address!");
        setLoader(false);
        return;
    }
    try {
        console.log(studentToken);
        const result = await Axios({
            method: "POST",
            url: `${host}/student/update/email`,
            data: qs.stringify({
                email: newEmail,
                token: studentToken
            }),
            withCredentials: true,
            credentials: "include",
            headers: {
                "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
            },
        });
        setEmail(newEmail);
        setLoader(false);
        setSuccess("Email updated!");
        handleClose();
    } catch (err) {
        setError(err.response.data);
        setLoader(false);
    }
}

export const changePhone = async(
    newPhone,
    otp,
    setLoader,
    setError,
    setSuccess,
    handleClose,
    studentToken,
    setPhone
) => {
    setLoader(true);
    setError(null);
    setSuccess(null);
    if (!newPhone || newPhone.length === 0) {
        setError("Please enter a valid phone number!");
        setLoader(false);
        return;
    }
    try {
        console.log(studentToken);
        const result = await Axios({
            method: "POST",
            url: `${host}/student/update/phone`,
            data: qs.stringify({
                phone: newPhone,
                otp: otp,
                token: studentToken
            }),
            withCredentials: true,
            credentials: "include",
            headers: {
                "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
            },
        });
        setPhone(newPhone);
        setLoader(false);
        setSuccess("Phone number updated!");
        handleClose();
    } catch (err) {
        setError(err.response.data);
        setLoader(false);
    }
}