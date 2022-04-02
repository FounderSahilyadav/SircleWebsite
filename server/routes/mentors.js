const express = require("express");
const router = express.Router();
const { mentorSchema } = require("../schema");
const ExpressError = require("../utils/ExpressError");
const connection = require("../mySqlConnection");
const { VerifyLogin } = require("../Middleware/VerifyLogin");

const validateMentor = (req, res, next) => {
    const { error } = mentorSchema.validate(req.body);
    if (error) {
        const msg = error.details.map((el) => el.message).join(", ");
        res.status(404).send(msg);
    } else {
        next();
    }
};

router.get("/", (req, res) => {
    connection.query("SELECT * FROM MENTORS;", (err, results) => {
        if (err) {
            res.status(404).send(err.message);
        } else {
            res.status(202).send(results);
        }
    });
});

router.post("/add_mentor", VerifyLogin, validateMentor, (req, res) => {
    const { name, designation, about, profile, instagram, facebook, linkedIn } =
        req.body;
    connection.query(
        `INSERT INTO MENTORS(name, designation, about, profile, instagram, facebook, linkedIn) VALUES('${name}', '${designation}', '${about}', '${profile}', '${instagram}', '${facebook}', '${linkedIn}');`,
        (err) => {
            if (err) {
                res.status(400).send(err.message);
            } else {
                res.status(200).send("Mentor Added");
            }
        }
    );
});

router.delete("/delete_mentor", VerifyLogin, (req, res) => {
    const { id } = req.query;
    connection.query(
        `DELETE FROM MENTORS WHERE id = '${id}' LIMIT 1;`,
        (err) => {
            if (err) {
                res.status(400).send(err.message);
            } else {
                res.status(200).send("Mentor Removed");
            }
        }
    );
});

module.exports = router;

// Create mentors table
// CREATE TABLE MENTORS(id int(6) PRIMARY KEY AUTO_INCREMENT, name text, designation text, about text, profile text, instagram text, facebook text, linkedIn text);
