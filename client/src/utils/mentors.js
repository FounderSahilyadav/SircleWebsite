import Axios from "../Axios";
import qs from "qs";

// Validate a mentor before uploading
const validateMentor = (mentorDetails, setError) => {
    const { name, designation, about, profile, instagram, facebook, linkedIn } =
        mentorDetails;
    if (!name || name.length === 0) {
        setError("Mentor name can't be empty");
        return false;
    }
    if (!designation || designation.length === 0) {
        setError("Mentor designation can't be empty");
        return false;
    }
    if (!about || about.length === 0) {
        setError("Mentor about can't be empty");
        return false;
    }
    if (!profile || profile.length === 0) {
        setError("Mentor profile pricture url is required");
        return false;
    }
    if (!instagram || instagram.length === 0) {
        setError("Mentor instagram id url can't be empty");
        return false;
    }
    if (!facebook || facebook.length === 0) {
        setError("Mentor facebook id url can't be empty");
        return false;
    }
    if (!linkedIn || linkedIn.length === 0) {
        setError("Mentor linkedIn id ur can't be empty");
        return false;
    }
    return true;
};

// Fetch all mentors from database
export const getAllMentors = async () => {
    try {
        const result = await Axios({ method: "GET", url: "/mentors" });
        return result.data;
    } catch (err) {
        return [];
    }
};

// Upload new mentor (admin)
export const addMentor = (mentorDetails, setLoader, setError, setSuccess) => {
    setLoader(true);
    setError(null);
    setSuccess(null);
    try {
        if (validateMentor(mentorDetails, setError)) {
            Axios({
                method: "POST",
                url: "/mentors/add_mentor",
                data: qs.stringify({ ...mentorDetails }),
                headers: {
                    "Content-type":
                        "application/x-www-form-urlencoded;charset=utf-8",
                },
            });
            setSuccess("Mentor Added");
            setLoader(false);
        } else {
            setLoader(false);
        }
    } catch (err) {
        setError(err.response.data);
        setLoader(false);
    }
};

// Delete a mentor (admin)
export const deleteMentor = (id, setError) => {
    try {
        if (id) {
            Axios({ method: "DELETE", url: `/mentors/delete_mentor?id=${id}` });
            return true;
        } else {
            setError("Mentor id not available");
            return false;
        }
    } catch (err) {
        setError(err.response.data);
        return false;
    }
};
