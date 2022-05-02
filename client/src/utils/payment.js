import Axios from "../Axios";
import qs from "qs";
const host = "http://localhost:5000";

function isDate(val) {
    // Cross realm comptatible
    return Object.prototype.toString.call(val) === '[object Date]'
}

function isObj(val) {
    return typeof val === 'object'
}

function stringifyValue(val) {
    if (isObj(val) && !isDate(val)) {
        return JSON.stringify(val)
    } else {
        return val
    }
}

function buildForm({ action, params }) {
    const form = document.createElement('form')
    form.setAttribute('method', 'post')
    form.setAttribute('action', action)

    Object.keys(params).forEach(key => {
        const input = document.createElement('input')
        input.setAttribute('type', 'hidden')
        input.setAttribute('name', key)
        input.setAttribute('value', stringifyValue(params[key]))
        form.appendChild(input)
    })

    return form
}

function post(details) {
    const form = buildForm(details)
    document.body.appendChild(form)
    form.submit()
    form.remove()
}

export const onPayment = async(amount, courseName, studentData, setError) => {
    try {
        const phone = studentData.phone;
        const email = studentData.email;
        const token = localStorage.getItem("token");
        const Id = studentData.id;
        setError(null);
        localStorage.setItem("coursename", courseName);
        console.log(token);
        let result = await Axios({
            method: "POST",
            url: `${host}/api/payment/paynow`,
            data: qs.stringify({
                token: token,
                email: email,
                amount: amount,
                courseName: courseName,
                phone: phone,
                Id: Id,
            }),
            withCredentials: true,
            credentials: "include",
            headers: {
                "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
            },
        });
        console.log("RES", result);
        // const newRes = await Axios.get(`${result.data.CALLBACK_URL}`)
        // console.log("NEW RES", newRes);
        // const response = await result.data.json;
        // console.log(response);
        localStorage.setItem("coursename", courseName);
        var details = {
            action: " https://securegw-stage.paytm.in/order/process",
            params: result.data
        }
        post(details);
    } catch (error) {
        console.log(error.response.data);
        setError(error.response.data);
    }
}

export const updateCourse = async(
    token,
    courseName,
    studentId,
    phone,
    status,
    setError,
    setSuccess,
    setCourse,
) => {
    setError(null);
    setSuccess(null);
    try {
        const result = await Axios({
            method: "POST",
            url: `${host}/api/payment/update/course`,
            data: qs.stringify({
                token: token,
                status: status,
                courseName: courseName,
                phone: phone,
                studentId: studentId,
            }),
            withCredentials: true,
            credentials: "include",
            headers: {
                "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
            }
        });
        console.log(result.data);
        setSuccess(result.data.msg);
        setCourse(courseName);
    } catch (error) {
        console.log("err:", error.response.data);
        setError(error.response.data);
    }
}

export const fetchCourse = async(token, setCourses, setError, setSuccess) => {
    setError(null);
    setSuccess(null);
    try {
        const result = await Axios({
            method: "POST",
            url: `${host}/api/payment/fetch/orders`,
            data: qs.stringify({
                token: token,
            }),
            withCredentials: true,
            credentials: "include",
            headers: {
                "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
            }
        });
        console.log("data", result.data);
        console.log(typeof(result.data));
        const response = result.data;
        console.log(response.length);
        setCourses(response);
    } catch (error) {
        console.log("err:", error.response.data);
        setError(error.response.data);
    }
}