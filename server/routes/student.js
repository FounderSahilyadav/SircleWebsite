const express = require("express");
const router = express.Router();
const { studentSchema } = require("../schema");
const ExpressError = require("../utils/ExpressError");
const connection = require("../mySqlConnection");
const { VerifyLogin } = require("../Middleware/VerifyLogin");

const validateStudent = (req, res, next) => {
    const { error } = studentSchema.validate(req.body);
    if (error) {
        const msg = error.details.map((el) => el.message).join(", ");
        res.status(404).send(msg);
    } else {
        next();
    }
};

router.get("/", VerifyLogin, (req, res) => {
    connection.query(
        "SELECT * FROM Students;",
        function (err, results, fields) {
            if (err) {
                res.status(400).send(err.message);
            } else {
                res.status(202).send(results);
            }
        }
    );
});

router.post("/register", validateStudent, (req, res) => {
    try {
        const { name, email, phone, institute, grade } = req.body;
        connection.query(
            `SELECT * FROM Students WHERE email = '${email}'`,
            function (err, results, fields) {
                if (err) {
                    res.send(400).send(err.message);
                } else {
                    if (results.length === 0) {
                        connection.query(
                            `INSERT INTO Students(name, phone, grade, institute, email) VALUES('${name}', '${phone}', '${grade}', '${institute}', '${email}');`,
                            function (err, results, fields) {
                                if (err) {
                                    res.status(400).send(err.message);
                                } else {
                                    res.status(202).send("Student Registered");
                                }
                            }
                        );
                    } else {
                        res.status(401).send(
                            "Student Email Already Registered"
                        );
                    }
                }
            }
        );
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;
