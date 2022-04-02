import Axios from "../Axios";
import qs from "qs";

// Validate a testimonial details
const validateTestimonial = (testimonialDetails, setError) => {
    const { name, testimonial, profession, rating, youtubeVideoId } =
        testimonialDetails;
    if (!name || name.length === 0) {
        setError("Name is required");
        return false;
    }
    if (!profession || profession.length === 0) {
        setError("Name is required");
        return false;
    }
    if (!rating || rating.length === 0) {
        setError("Name is required");
        return false;
    }
    if (!youtubeVideoId || youtubeVideoId.length === 0) {
        setError("Name is required");
        return false;
    }
    if (!testimonial || testimonial.length === 0) {
        setError("Name is required");
        return false;
    }
    return true;
};

// Fetch all testimonials
export const getAllTestimonial = async (setError) => {
    setError(null);
    try {
        const result = await Axios({ method: "GET", url: "/testimonials" });
        return result.data;
    } catch (err) {
        setError("Couldn't Fetch Testimonials, Some error occured");
        return [];
    }
};

// Upload a new testimonial (adminn)
export const uploadTestimonial = (
    testimonialDetails,
    setLoader,
    setError,
    setSuccess
) => {
    setLoader(true);
    setError(null);
    setSuccess(null);
    try {
        if (validateTestimonial(testimonialDetails, setError)) {
            Axios({
                method: "POST",
                url: "/testimonials/new_testimonial",
                data: qs.stringify({ ...testimonialDetails }),
                headers: {
                    "Content-type":
                        "application/x-www-form-urlencoded;charset=utf-8",
                },
            });
            setSuccess("Testimonial Posted");
            setLoader(false);
        } else {
            setLoader(false);
        }
    } catch (err) {
        setError(err.response.data);
        setLoader(false);
    }
};

// Delete testimonial (admin)
export const deleteTestimonial = (id, setError, setSuccess) => {
    setError(null);
    setSuccess(null);
    try {
        if (id) {
            Axios({
                method: "DELETE",
                url: `/testimonials/delete_testimonial?id=${id}`,
            });
            setSuccess("Testimonial Deleted");
            return true;
        } else {
            setError("Testimonial Id not Available");
            return false;
        }
    } catch (err) {
        setError(err.response.data);
        return false;
    }
};
