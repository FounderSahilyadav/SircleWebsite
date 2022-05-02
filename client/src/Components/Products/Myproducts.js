import React, { useEffect, useState } from 'react';
import { Alert } from '@material-ui/lab';
import Accelrator from '../Products/Accelrator';
import Champion from '../Products/Champion';
import { fetchCourse } from '../../utils/payment';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    orders: {
        display: "flex",
        justifyContent: "center",
        [theme.breakpoints.down(800)]: {
            flexDirection: "column",
        },
    },
    heading: {
        textAlign: 'center',
        marginTop: '80px',
    }
}));

const Myproducts = ({ studentToken }) => {
    const classes = useStyles();
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState(null); // If any error occured while registering the student
    const [success, setSuccess] = useState(null); // Set success message if thr student is successfully registered
    useEffect(() => {
        // console.log(query.get("course"));
        const set = async () => {
            if (studentToken) {
                fetchCourse(studentToken, setCourses, setError, setSuccess);
            }
        }
        if (studentToken)
            set();
    }, []);
    return (
        <div className='menu'>
            <h1>
                Your Course :
            </h1>
            {studentToken === "" ? (<h1>Please Login</h1>) :
                (<div>
                    <div className="Alert">
                        {error ? <Alert severity="error">{error}</Alert> : ""}
                        {success ? <Alert severity="success">{success}</Alert> : ""}
                    </div>
                    <h1 className={classes.heading}>CHAMPION</h1>
                    {courses.length === 0 ? <h3 className={classes.heading}>You Don't Purchase any champion Program</h3> : null}
                    <div className={classes.orders}>
                        {
                            courses.map((course) => {
                                return <>{(course.courseName === 'DISHA' || course.courseName === "SAKHA" || course.courseName === "PERSONA") ? (
                                    <Champion name={course.courseName} />
                                ) : null}</>
                            })
                        }
                    </div>
                    <h1 className={classes.heading}>ACCLERATOR</h1>
                    {courses.length === 0 ? <h3 className={classes.heading}>You Don't Purchase any Accelrator Program</h3> : null}
                    <div className={classes.orders}>
                        {
                            courses.map((course) => {
                                return <>{(course.courseName === 'DISHA_CRASH' || course.courseName === "ALL_COURSE") ? (
                                    <Accelrator name={course.courseName} />
                                ) : null}</>
                            })
                        }
                    </div>


                </div>)}
        </div>
    )
}

export default Myproducts