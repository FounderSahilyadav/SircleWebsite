import Axios from "../Axios";
import qs from "qs";

// Verify faq before uploading
const validateFaq = (faqDetails, setFaqError) => {
    const { question, answer } = faqDetails;
    if (!question || question.length === 0) {
        setFaqError("Question is required");
        return false;
    }
    if (!answer || answer.length === 0) {
        setFaqError("Answer is required");
        return false;
    }
    return true;
};

// Fetch all faqs
export const getFaqs = async () => {
    try {
        const result = await Axios({ method: "GET", url: "/faqs" });
        return result.data;
    } catch (err) {
        return [];
    }
};

// Add new faq (admin)
export const registerNewFaq = async (
    faqDetails,
    setFaqLoader,
    setFaqError,
    setFaqSuccess
) => {
    setFaqLoader(true);
    setFaqError(null);
    setFaqSuccess(null);

    if (validateFaq(faqDetails, setFaqError)) {
        try {
            await Axios({
                method: "POST",
                url: "/faqs/new_faq",
                data: qs.stringify({ ...faqDetails }),
                headers: {
                    "Content-type":
                        "application/x-www-form-urlencoded;charset=utf-8",
                },
            });
            setFaqSuccess("Faq Posted");
            setFaqLoader(false);
            return true;
        } catch (err) {
            setFaqError(err.response.data);
            setFaqLoader(false);
            return false;
        }
    } else {
        setFaqLoader(false);
        return false;
    }
};

// Delete a faq (admin)
export const deleteFaq = async (id) => {
    if (id) {
        try {
            await Axios({ method: "DELETE", url: `/faqs/delete_faq?id=${id}` });
        } catch (err) {
            return;
        }
    }
};
