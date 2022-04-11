const express = require("express");
const router = express.Router();
const { studentSchema } = require("../schema");
const ExpressError = require("../utils/ExpressError");
const connection = require("../mySqlConnection");
const { VerifyLogin } = require("../Middleware/VerifyLogin");
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const JWT_SECRET = process.env.JWT_SECRET;
const fetchuser = require("../Middleware/fetchuser");

const validateStudent = (req, res, next) => {
    const { error } = studentSchema.validate(req.body);
    if (error) {
        const msg = error.details.map((el) => el.message).join(", ");
        res.status(404).send(msg);
    } else {
        next();
    }
};

// router.get("/", VerifyLogin, (req, res) => {
//     connection.query(
//         "SELECT * FROM Students;",
//         function(err, results, fields) {
//             if (err) {
//                 res.status(400).send(err.message);
//             } else {
//                 res.status(202).send(results);
//             }
//         }
//     );
// });

router.post("/getstudent", fetchuser, (req, res) => {
    console.log("I ma getstudnet");
    try {
        var date = new Date();
        date = date.toISOString().slice(0, 19).replace('T', ' ');
        console.log(req.user.id);
        connection.query(
            `SELECT * FROM Students where id = '${req.user.id}' and expireAt > '${date}';`,
            function(err, results, fields) {
                if (err) {
                    res.status(400).send(err.message);
                } else {
                    res.status(202).json(results[0]);
                    console.log(results[0]);
                }
            }
        );
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.post("/register",
    validateStudent, async(req, res) => {
        let successful = false;
        try {
            const { name, email, phone, institute, grade, password } = req.body;
            const salt = await bcrypt.genSalt(10);
            const userPassword = await bcrypt.hash(password, salt);
            const expireAt = new Date(Date.now() + 3600000 * 24).toISOString().slice(0, 19).replace('T', ' ');
            connection.query(
                `SELECT * FROM Students WHERE email = '${email}' and phone = '${phone}';`,
                function(err, results, fields) {
                    if (err) {
                        res.status(400).send(err.message);
                    } else {
                        if (results.length === 0) {
                            connection.query(
                                `INSERT INTO Students(name, phone, grade, institute, email, password, expireAt) VALUES('${name}', '${phone}', '${grade}', '${institute}', '${email}', '${userPassword}', '${expireAt}');`,
                                function(err, results, fields) {
                                    if (err) {
                                        res.status(400).send(err.message);
                                    } else {
                                        const data = {
                                            user: {
                                                id: results.insertId
                                            }
                                        }
                                        const token = jwt.sign(data, JWT_SECRET);
                                        console.log(results);
                                        connection.query(
                                            `UPDATE Students SET token = '${token}' WHERE id = '${results.insertId}';`,
                                            function(err, results, fields) {
                                                if (err) {
                                                    res.status(400).send(err.message);
                                                } else {
                                                    console.log(results);
                                                    res.status(202).json({ token });
                                                }
                                            }
                                        );
                                    }
                                }
                            );
                        } else {
                            res.status(401).send("Student Email Already Registered");
                        }
                    }
                }
            );
        } catch (err) {
            console.log(err);
        }
    });

router.post("/login", (req, res) => {

    try {
        const { email, password } = req.body;
        connection.query(`SELECT * FROM Students WHERE email = '${email}';`,
            function(err, results, fields) {
                if (err) {
                    res.status(400).send(err.message);
                } else {
                    if (results.length === 0) {
                        res.status(401).send("Student Email Not Registered");
                    } else {
                        const student = results[0];
                        bcrypt.compare(password, student.password, function(err, result) {
                            if (err) {
                                res.status(400).send(err.message);
                            } else {
                                if (result) {
                                    const data = {
                                        user: {
                                            id: student.id
                                        }
                                    }
                                    const token = jwt.sign(data, JWT_SECRET);
                                    const expireAt = new Date(Date.now() + 3600000 * 24).toISOString().slice(0, 19).replace('T', ' ');
                                    connection.query(
                                        `UPDATE Students SET token = '${token}', expireAt = '${expireAt}' WHERE email = '${student.email}' or phone = '${student.email}';`,
                                        function(err, results, fields) {
                                            if (err) {
                                                res.status(400).send(err.message);
                                            } else {
                                                res.status(202).json({ token });
                                            }
                                        }
                                    );
                                } else {
                                    res.status(401).send("Student Password Incorrect");
                                }
                            }
                        });
                    }
                }
            });
    } catch (error) {
        res.status(400).send(error.message);
    }
});



module.exports = router;
// Create table
// CREATE TABLE Students(id int(6) PRIMARY KEY AUTO_INCREMENT, name text, phone text, grade text, institute text, email text);
// ALTER table Students add column token text, add expireAt datetime;