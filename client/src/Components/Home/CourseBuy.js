import { makeStyles } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { updateCourse } from '../../utils/payment';
import Accelrator from '../Products/Accelrator';
import Champion from '../Products/Champion';

function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
}

const useStyles = makeStyles((theme) => ({
    alert: {
        position: 'fixed',
        top: '0px',
        left: '0px',
        width: '100%',
        zIndex: '1',
        marginTop: '70px',
    },
}));

const CourseBuy = ({ studentData, studentToken }) => {
    let query = useQuery();
    const classes = useStyles();
    const [course, setCourse] = useState(null);
    const [error, setError] = useState(null); // If any error occured while registering the student
    const [success, setSuccess] = useState(null); // Set success message if thr student is successfully registered
    useEffect(() => {
        // console.log(query.get("course"));
        const set = async () => {
            const courseName = localStorage.getItem("coursename");
            localStorage.removeItem("coursename");
            const status = query.get("status");
            // console.log(courseName, "status  :", status);
            if (courseName) {
                updateCourse(studentToken, courseName, studentData.id, studentData.phone, status, setError, setSuccess, setCourse);
            } else {
                setError("Payment Failed");
            }
        }
        if (studentToken)
            set();
    }, []);
    return (<div>
        <h1 >
            Your Course:
        </h1> {studentToken === "" ? (<h1> Please Login </h1>) :
            (<div>
                <div className={classes.Alert}>
                    {error ? (<> <Alert severity="error" > {error} </Alert> <h1> Payment Failed </h1></>) : ""}
                    {success ? <Alert severity="success" > {course} : {success} </Alert> : ""} </div> {
                    (course === 'DISHA' || course === "SAKHA" || course === "PERSONA") ? (<
                        Champion name={course}
                    />
                    ) : null
                } {
                    (course === 'DISHA_CRASH' || course === "ALL_COURSE") ? (<
                        Accelrator name={course}
                    />
                    ) : null
                }

            </div>)}
    </div>
    )
}

export default CourseBuy;