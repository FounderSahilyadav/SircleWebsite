const express = require("express");
const router = express.Router();
const { instituteSchema } = require("../schema");
const ExpressError = require("../utils/ExpressError");
const connection = require("../mySqlConnection");
const { VerifyLogin } = require("../Middleware/VerifyLogin");

const validateInstituteQuery = (req, res, next) => {
    const { error } = instituteSchema.validate(req.body);
    if (error) {
        const msg = error.details.map((el) => el.message).join(", ");
        res.status(404).send(msg);
    } else {
        next();
    }
};

router.get("/", VerifyLogin, (req, res) => {
    connection.query(`SELECT * FROM INSTITUTES;`, (err, results) => {
        if (err) {
            res.status(401).send(err.message);
        } else {
            res.status(202).send(results);
        }
    });
});

router.post("/register", validateInstituteQuery, (req, res) => {
    const { name, email, phone, query } = req.body;

    connection.query(
        `INSERT INTO INSTITUTES(name, email, phone, query, responded) VALUES('${name}', '${email}', '${phone}', '${query}', '${false}');`,
        (err, results) => {
            if (err) {
                res.status(401).send(err.message);
            } else {
                res.status(202).send("Query Sent Successfully.");
            }
        }
    );
});

router.patch("/update_status", VerifyLogin, (req, res) => {
    const { id } = req.query;
    connection.query(
        `UPDATE INSTITUTES SET responded = 'true' WHERE id = '${id}';`,
        (err, results) => {
            if (err) {
                res.status(401).send(err.message);
            } else {
                res.status(202).send("Query Status Updated Successfully.");
            }
        }
    );
});

module.exports = router;

//Create institutes table command
// CREATE TABLE INSTITUTES(id int(6) PRIMARY KEY AUTO_INCREMENT, name text, email text, phone varchar(225), query text, responded text);
