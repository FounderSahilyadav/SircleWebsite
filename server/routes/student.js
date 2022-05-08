const express = require("express");
const router = express.Router();
const { studentSchema, phoneSchema } = require("../schema");
const ExpressError = require("../utils/ExpressError");
const connection = require("../mySqlConnection");
const { VerifyLogin } = require("../Middleware/VerifyLogin");
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const JWT_SECRET = process.env.JWT_SECRET;
const fetchuser = require("../Middleware/fetchuser");
const fast2sms = require('fast-two-sms');


const validateStudent = (req, res, next) => {
    const { error } = studentSchema.validate(req.body);
    if (error) {
        const msg = error.details.map((el) => el.message).join(", ");
        console.log(msg);
        res.status(404).send(msg);
    } else {
        next();
    }
};
const validatePhone = (req, res, next) => {
    const { error } = phoneSchema.validate(req.body);
    if (error) {
        const msg = error.details.map((el) => el.message).join(", ");
        res.status(404).send(msg);
    } else {
        next();
    }
}


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
                    if (results.length > 0) {
                        console.log(results[0]);
                        res.status(202).json(results[0]);
                    } else {
                        res.status(404).send("No student found");
                    }
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
            const { name, email, phone, institute, grade, password, otp } = req.body;
            const salt = await bcrypt.genSalt(10);
            const userPassword = await bcrypt.hash(password, salt);
            const expireAt = new Date(Date.now() + 3600000 * 24).toISOString().slice(0, 19).replace('T', ' ');
            const date = new Date().toISOString().slice(0, 19).replace('T', ' ');
            connection.query(
                `SELECT * FROM Students WHERE email = '${email}' or phone = '${phone}';`,
                function(err, results, fields) {
                    if (err) {
                        res.status(400).send(err.message);
                    } else {
                        if (results.length === 0) {
                            connection.query(
                                `SELECT * FROM PhoneVerify WHERE phone = '${phone}';`,
                                function(err, results, fields) {
                                    if (err) {
                                        res.status(400).send(err.message);
                                    } else {
                                        if (results.length === 0) {
                                            res.status(400).send("Phone number not verified");
                                        } else {
                                            if (date > results[0].expireAt) {
                                                return res.status(400).send("OTP expired");
                                            } else {
                                                bcrypt.compare(`${otp}`, results[0].otp, function(err, result) {
                                                    if (err) {
                                                        res.status(400).send(err.message);
                                                    } else {
                                                        if (result) {
                                                            const verify = 1;
                                                            connection.query(
                                                                `INSERT INTO Students(name, phone, grade, institute, email, password, verify, expireAt) VALUES('${name}', '${phone}', '${grade}', '${institute}', '${email}', '${userPassword}', '${verify}', '${expireAt}');`,
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
                                                            res.status(400).send("OTP is not correct");
                                                        }
                                                    }
                                                });
                                            }

                                        }
                                    }
                                }
                            );
                        } else {
                            res.status(401).send("Student Phone Number Already Registered");
                        }
                    }
                });

        } catch (err) {
            res.status(400).send(err.message);
        }
    }
);

router.post("/login", (req, res) => {

    try {
        const { email, password } = req.body;
        console.log('called');
        console.log(email, password);
        connection.query(`SELECT * FROM Students WHERE email = '${email}' or phone = '${email}';`,
            function(err, results, fields) {
                if (err) {
                    res.status(400).send(err.message);
                } else {
                    if (results.length === 0) {
                        res.status(401).send("Student Email or Phone Number Not Registered");
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
                                                console.log(token);
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

// Verify Number
router.post("/verify/phone", validatePhone, (req, res) => {
    try {
        const { phone } = req.body;
        let date = new Date(Date.now() + 1000 * 60 * 10);
        date = date.toISOString().slice(0, 19).replace('T', ' ');
        connection.query(
            `SELECT * FROM PhoneVerify WHERE phone = '${phone}'`,
            async function(err, results, fields) {
                if (err) {
                    res.status(400).send(err.message);
                } else {
                    const code = Math.floor(Math.random() * (9999 - 1000)) + 1000;
                    var options = { authorization: process.env.SMS_KEY, message: `Your one time Password (OTP) for phone verification is ${code}. Only valid for 10 min...\nThankyou, Team Sircle`, numbers: [`${phone}`] }
                    const response = await fast2sms.sendMessage(options);
                    // const response = { return: false };
                    const salt = await bcrypt.genSalt(10);
                    const otp = await bcrypt.hash(`${code}`, salt);
                    if (response.return) {
                        if (results.length === 0) {
                            connection.query(
                                `INSERT INTO PhoneVerify(phone, otp, expireAt) VALUES('${phone}', '${otp}', '${date}');`,
                                function(err, results, fields) {
                                    if (err) {
                                        res.status(400).send(err.message);
                                    } else {
                                        console.log(code);
                                        res.status(202).json({ message: "OTP Sent" });
                                    }
                                }
                            );
                        } else {
                            connection.query(
                                `UPDATE PhoneVerify SET otp = '${otp}', expireAt = '${date}' WHERE id = '${results[0].id}';`,
                                function(err, update, fields) {
                                    if (err) {
                                        res.status(400).send(err.message);
                                    } else {
                                        // conosole.log(code);
                                        console.log(results);
                                        res.status(202).json({ message: "OTP Sent" });
                                    }
                                }
                            );
                        }
                    } else {
                        res.status(400).send("SMS Not Sent. Please Check Your Phone Number...");
                    }
                }
            });
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.post("/update/phone", fetchuser, async(req, res) => {
    try {
        const { otp, phone } = req.body;
        let date = new Date();
        date = date.toISOString().slice(0, 19).replace('T', ' ');
        connection.query(
            `SELECT * FROM Students WHERE phone = '${phone}'`,
            async function(err, results, fields) {
                if (err) {
                    res.status(400).send(err.message);
                } else {
                    if (results.length === 0) {
                        connection.query(
                            `SELECT * FROM Students WHERE id='${req.user.id}';`,
                            function(err, results, fields) {
                                if (err) {
                                    res.status(400).send(err.message);
                                } else {
                                    if (results.length === 0) {
                                        res.status(401).send("Student Not Found");
                                    } else {
                                        const oldphone = results[0].phone;
                                        if (oldphone === phone) {
                                            res.status(401).send("Phone Number Already Verified");
                                        } else {
                                            connection.query(
                                                `SELECT * FROM PhoneVerify WHERE phone = '${phone}';`,
                                                function(err, results, fields) {
                                                    if (err) {
                                                        res.status(400).send(err.message);
                                                    } else {
                                                        if (results.length === 0) {
                                                            res.status(401).send("Phone Number Not Verified");
                                                        } else {
                                                            const verify = results[0];
                                                            bcrypt.compare(otp, verify.otp, function(err, result) {
                                                                if (err) {
                                                                    res.status(400).send(err.message);
                                                                } else {
                                                                    if (result) {
                                                                        connection.query(
                                                                            `UPDATE Students SET phone = '${phone}' WHERE id = '${req.user.id}';`,
                                                                            function(err, results, fields) {
                                                                                if (err) {
                                                                                    res.status(400).send(err.message);
                                                                                } else {
                                                                                    connection.query(
                                                                                        `DELETE FROM PhoneVerify WHERE phone = '${oldphone}';`);
                                                                                    res.status(202).json({ message: "Phone Number Verified" });
                                                                                }
                                                                            });
                                                                    } else {
                                                                        res.status(401).send("OTP Incorrect");
                                                                    }
                                                                }
                                                            });
                                                        }
                                                    }
                                                }
                                            );
                                        }
                                    }
                                }
                            }
                        );
                    } else {
                        const student = results[0];
                        res.status(400).send("Phone Number Already Registered");
                    }
                }
            }
        );



    } catch (error) {
        res.status(400).send(error.message);
    }
});


// Update Email
router.post("/update/email", fetchuser, async(req, res) => {
    try {
        const { email } = req.body;
        connection.query(
            `SELECT * FROM Students WHERE email = '${email}';`,
            function(err, results, fields) {
                if (err) {
                    res.status(400).send(err.message);
                } else {
                    if (results.length === 0) {
                        connection.query(
                            `UPDATE Students SET email = '${email}' WHERE id = '${req.user.id}';`,
                            function(err, results, fields) {
                                if (err) {
                                    res.status(400).send(err.message);
                                } else {
                                    res.status(202).json({ message: "Email Updated" });
                                }
                            }
                        );
                    } else {
                        res.status(400).send("Email Already Registered");
                    }
                }
            }
        );
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Update Education
router.post("/update/education", fetchuser, async(req, res) => {
    try {
        const { institute, grade, board, year } = req.body;
        connection.query(
            `UPDATE Students SET institute = '${institute}', grade = '${grade}', board = '${board}', year = '${year}' WHERE id = '${req.user.id}';`,
            function(err, results, fields) {

                if (err) {
                    res.status(400).send(err.message);
                } else {
                    res.status(202).json({ message: "Education Updated" });
                }
            }
        );
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Update Password
router.post("/update/password", fetchuser, async(req, res) => {
    try {
        const { newpassword } = req.body;
        if (newpassword.length < 7) {
            return res.status(400).send("Password Must Be Atleast 8 Characters Long");
        }
        connection.query(
            `SELECT * FROM Students WHERE id = '${req.user.id}';`,
            async function(err, results, fields) {
                if (err) {
                    res.status(400).send(err.message);
                } else {
                    if (results.length === 0) {
                        res.status(401).send("Student Not Found");
                    } else {
                        const salt = await bcrypt.genSalt(10);
                        const userPassword = await bcrypt.hash(newpassword, salt);
                        connection.query(
                            `UPDATE Students SET password = '${userPassword}' WHERE id = '${req.user.id}';`,
                            function(err, results, fields) {
                                if (err) {
                                    res.status(400).send(err.message);
                                } else {
                                    res.status(202).json({ message: "Password Updated" });
                                }
                            }
                        );
                    }
                }
            });
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// reset password
router.post("/reset/password", async(req, res) => {
    try {
        const { phone, otp } = req.body;
        connection.query(
            `SELECT * FROM Students WHERE phone = '${phone}';`,
            function(err, results, fields) {
                if (err) {
                    res.status(400).send(err.message);
                } else {
                    if (results.length === 0) {
                        res.status(401).send("Invalid OTP or Phone Number");
                    } else {
                        const student = results[0];
                        connection.query(
                            `SELECT * FROM PhoneVerify WHERE phone = '${phone}';`,
                            function(err, results, fields) {
                                if (err) {
                                    res.status(400).send(err.message);
                                } else {
                                    if (results.length === 0) {
                                        res.status(401).send("Invalid OTP or Phone Number");
                                    } else {
                                        const verify = results[0];
                                        bcrypt.compare(otp, verify.otp, function(err, result) {
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
                                                        `UPDATE Students SET token = '${token}', expireAt = '${expireAt}' WHERE  phone = '${student.phone}';`,
                                                        function(err, results, fields) {
                                                            if (err) {
                                                                res.status(400).send(err.message);
                                                            } else {
                                                                res.status(202).json({ token });
                                                            }
                                                        }
                                                    );
                                                } else {
                                                    res.status(401).send("Invalid OTP or Phone Number");
                                                }
                                            }
                                        });
                                    }
                                }
                            }
                        );
                    }
                }
            }
        );
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;
// Create table
// CREATE TABLE Students(id int(6) PRIMARY KEY AUTO_INCREMENT, name text not NULL, phone text not NULL, grade text not NULL, institute text, email text, password text, token text, expireAt text, verify bool DEFAULT false);
// Create table phoneVerify(id int(6) PRIMARY KEY AUTO_INCREMENT, phone text not NULL, otp text, expireAt datetime);
// Alter TABLE Students ADD Board text, Year text;