import Axios from "../Axios";
import qs from "qs";

// Validate institute query
const validateInstituteQuery = (instituteDetails, setError) => {
    const { name, email, query } = instituteDetails;

    if (!name || name.length === 0) {
        setError("Please enter institute's name!");
        return false;
    }
    if (!email || email.length === 0) {
        setError("Please enter institute's email!");
        return false;
    }
    if (!query || query.length === 0) {
        setError("Please mention your query!");
        return false;
    }
    return true;
};

// Send a institute query
export const sendInstituteQuery = async (
    instituteDetails,
    setInstituteLoader,
    setInstituteError,
    setInstituteSuccess
) => {
    setInstituteError(null);
    setInstituteLoader(true);
    setInstituteSuccess(null);
    if (validateInstituteQuery(instituteDetails, setInstituteError)) {
        try {
            var phone = instituteDetails.phone;
            if (!phone || phone.length === 0) {
                phone = "N/A";
            }
            await Axios({
                method: "POST",
                url: "institute/register",
                data: qs.stringify({ ...instituteDetails, phone }),
                headers: {
                    "Content-type":
                        "application/x-www-form-urlencoded;charset=utf-8",
                },
            });
            setInstituteError(null);
            setInstituteLoader(false);
            setInstituteSuccess("Query Sent Successfully");
        } catch (err) {
            setInstituteError(err.response.data);
            setInstituteLoader(false);
            setInstituteSuccess(null);
        }
    } else {
        setInstituteLoader(false);
        setInstituteSuccess(null);
    }
};

// Get all institute queries (admin)
export const getAllInstituteQueries = async () => {
    try {
        const result = await Axios({ method: "GET", url: "/institute" });
        return result.data;
    } catch (err) {
        return [];
    }
};

// Update institute query status to responded (admin)
export const updateInstituteStatus = (id) => {
    try {
        if (id) {
            Axios({
                method: "PATCH",
                url: `/institute/update_status?id=${id}`,
            });
            return true;
        } else {
            return false;
        }
    } catch (err) {
        return false;
    }
};
