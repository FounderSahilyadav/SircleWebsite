import Axios from "../Axios";
import qs from "qs";

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