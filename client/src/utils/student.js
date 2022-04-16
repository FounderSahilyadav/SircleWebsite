import Axios from "../Axios";
import qs from "qs";

let filter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
let filter1 = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
const host = "http://localhost:5000";
// Validate student details
const validateStudentDetails = (studentDetails, setError) => {
    const { name, grade, institute, email, phone } = studentDetails;

    if (!name || name.length === 0) {
        setError("Student name is required!");
        return false;
    }
    if (!email || email.length === 0) {
        setError("Student email is required!");
        return false;
    }
    if (!phone || phone.length === 0) {
        setError("Student phone number is required!");
        return false;
    }

    if (!grade || grade.length === 0) {
        setError("Please select your grade!");
        return false;
    }

    if (!institute || institute.length === 0) {
        setError("Plase fill in your institute name!");
        return false;
    }

    return true;
};

const validateOtp = (studentDetails) => {
    const { phone } = studentDetails;
    if (!phone || phone.length !== 10 || !filter1.test(phone)) {
        return false;
    }
    return true;
}

export const sendOtp = async(studentDetails, setLoader, setError, setSuccess) => {
    const { phone } = studentDetails;
    setLoader(true);
    if (validateOtp(studentDetails)) {
        try {
            const result = await Axios({
                method: "POST",
                url: `${host}/student/verify/phone`,
                data: qs.stringify({
                    phone: phone
                }),
                withCredentials: true,
                credentials: "include",
                headers: {
                    "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
                },
            });
            setLoader(false);
            setSuccess(result.data.message);
        } catch (error) {
            setError(error.response.data);
            setLoader(false);
        }
    } else {
        console.log("Invalid phone number");
        setError("Please enter a valid phone number!");
        setLoader(false);
    }
}





const validateStudentSign = (studentDetails, setError) => {
    const { email, password } = studentDetails;
    if (password.length < 7 || password.length > 20) {
        setError("Password must be between 7 and 20 characters and must match!");
        return false;
    }
    if (email.length !== 0) {
        var a = (!(filter.test(email) || filter1.test(email)));
        console.log(a);
        if (!(filter.test(email) || filter1.test(email))) {
            setError("Please enter a valid email! or phone number");
            return false;
        }
    }
    return true;
}

const validateStudentSignUp = (studentDetails, setError) => {
    const { name, grade, phone, password, confirmPassword, otp } = studentDetails;
    if (!name || name.length === 0) {
        setError("Student name is required!");
        return false;
    }
    if (phone.length !== 10 || phone.length === 0 || !filter1.test(phone)) {
        setError("Please enter phone number");
        return false;
    }
    if (!otp || otp.length === 0) {
        setError("Please enter your OTP!");
        return false;
    }
    if (password.length < 7 || password.length > 20 || password !== confirmPassword) {
        setError("Password must be between 7 and 20 characters and must match!");
        return false;
    }
    if (!grade || grade.length === 0) {
        setError("Please select your grade!");
        return false;
    }
    return true;
}

// Get student details
export const getStudentDetails = async(studentToken, setStudentToken) => {
    try {
        const result = await Axios({
            method: "POST",
            url: `${host}/student/getstudent`,
            data: qs.stringify({
                token: studentToken
            }),
            withCredentials: true,
            credentials: "include",
            headers: {
                "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
            },
        });
        console.log("get student details", result.data);
        return result.data;
    } catch (error) {
        console.log(error);
        localStorage.removeItem('token');
        setStudentToken("");
    }
}

// Login a student
export const loginStudent = async(
    studentDetails,
    setLoader,
    setError,
    setSuccess,
    setStudentToken,
    handleClose,
    studentToken
) => {
    setLoader(true);
    setError(null);
    setSuccess(null);
    if (validateStudentSign(studentDetails, setError)) {
        try {
            console.log("working");
            const result = await Axios({
                method: "POST",
                url: `${host}/student/login`,
                data: qs.stringify({
                    email: studentDetails.email,
                    password: studentDetails.password,
                }),
                withCredentials: true,
                credentials: "include",
                headers: {
                    "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
                },
            });
            localStorage.setItem('token', result.data.token);
            console.log(result.data.token);
            setStudentToken(result.data.token);
            setLoader(false);
            setSuccess("Logged in!");
            console.log({ "studentToken": studentToken });
            handleClose();
        } catch (err) {
            setError(err.response.data);
            setLoader(false);
        }

    } else {
        setLoader(false);
    }
}

// Sign up a student
export const signUpStudent = async(
    studentDetails,
    setLoader,
    setError,
    setSuccess,
    setStudentToken,
    handleClose
) => {
    setLoader(true);
    setError(null);
    setSuccess(null);
    if (validateStudentSignUp(studentDetails, setError)) {
        try {
            console.log("working");
            const result = await Axios({
                method: "POST",
                url: `${host}/student/register`,
                data: qs.stringify({
                    name: studentDetails.name,
                    email: studentDetails.email,
                    phone: studentDetails.phone,
                    password: studentDetails.password,
                    institute: studentDetails.institute,
                    grade: studentDetails.grade,
                    otp: studentDetails.otp,
                }),
                withCredentials: true,
                credentials: "include",
                headers: {
                    "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
                }
            });
            localStorage.setItem('token', result.data.token);
            setStudentToken(result.data.token);
            setLoader(false);
            setSuccess("Successfully signed up!");
            handleClose();
        } catch (err) {
            setError(err.response.data);
            setLoader(false);
        }
    } else {
        setLoader(false);
    }
}



// Register a student
export const registerStudent = async(
    studentDetails,
    setLoader,
    setError,
    setSuccess
) => {
    setLoader(true);
    setError(null);
    setSuccess(null);
    if (validateStudentDetails(studentDetails, setError)) {
        try {
            await Axios({
                method: "POST",
                url: "/student/register",
                data: qs.stringify({
                    ...studentDetails,
                }),
                headers: {
                    "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
                },
            });
            setSuccess("Registered!");
            setLoader(false);
        } catch (err) {
            setError(err.response.data);
            setLoader(false);
        }
    } else {
        setLoader(false);
    }
};

// Get all registered students for demo session (admin)
export const getAllStudents = async() => {
    try {
        const result = await Axios({ method: "GET", url: "/student" });
        return result.data;
    } catch (err) {
        return [];
    }
};