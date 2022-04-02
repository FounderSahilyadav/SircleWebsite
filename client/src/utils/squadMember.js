import Axios from "../Axios";
import qs from "qs";

const validateSquadMember = (squadMemberDetails, setError) => {
    const { name, designation, profile, instagram, facebook, linkedIn } =
        squadMemberDetails;
    if (!name || name.length === 0) {
        setError("Mentor name can't be empty");
        return false;
    }
    if (!designation || designation.length === 0) {
        setError("Mentor designation can't be empty");
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

// Get all squad members
export const getAllSquadMember = async () => {
    try {
        const result = await Axios({ method: "GET", url: "/squad" });
        return result.data;
    } catch (err) {
        return [];
    }
};

// Add new squadmember (admin)
export const addSquadMember = (
    squadMemberDetails,
    setLoader,
    setError,
    setSuccess
) => {
    setLoader(true);
    setError(null);
    setSuccess(null);
    try {
        if (validateSquadMember(squadMemberDetails, setError)) {
            Axios({
                method: "POST",
                url: "/squad/add_member",
                data: qs.stringify({ ...squadMemberDetails }),
                headers: {
                    "Content-type":
                        "application/x-www-form-urlencoded;charset=utf-8",
                },
            });
            setSuccess("Squad Member Added");
            setLoader(false);
        } else {
            setLoader(false);
        }
    } catch (err) {
        setError(err.response.data);
        setLoader(false);
    }
};

// Delete a squad member (adminn)
export const deleteSquadMember = (id, setError) => {
    try {
        if (id) {
            Axios({ method: "DELETE", url: `/sqad/delete_member?id=${id}` });
            return true;
        } else {
            setError("Squad Member id not available");
            return false;
        }
    } catch (err) {
        setError(err.response.data);
        return false;
    }
};
