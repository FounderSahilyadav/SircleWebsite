const express = require("express");
const router = express.Router();
const { squadSchema } = require("../schema");
const ExpressError = require("../utils/ExpressError");
const connection = require("../mySqlConnection");
const { VerifyLogin } = require("../Middleware/VerifyLogin");

const validateSquadMember = (req, res, next) => {
    const { error } = squadSchema.validate(req.body);
    if (error) {
        const msg = error.details.map((el) => el.message).join(", ");
        res.status(404).send(msg);
    } else {
        next();
    }
};

router.get("/", (req, res) => {
    connection.query("SELECT * FROM SQUAD_MEMBERS;", (err, results) => {
        if (err) {
            res.status(404).send(err.message);
        } else {
            res.status(202).send(results);
        }
    });
});

router.post("/add_member", VerifyLogin, validateSquadMember, (req, res) => {
    const { name, designation, profile, instagram, facebook, linkedIn } =
    req.body;
    connection.query(
        `INSERT INTO SQUAD_MEMBERS(name, designation, profile, instagram, facebook, linkedIn) VALUES('${name}', '${designation}', '${profile}', '${instagram}', '${facebook}', '${linkedIn}');`,
        (err) => {
            if (err) {
                res.status(400).send(err.message);
            } else {
                res.status(200).send("Squad Member Added");
            }
        }
    );
});

router.delete("/delete_member", VerifyLogin, (req, res) => {
    const { id } = req.query;
    connection.query(
        `DELETE FROM SQUAD_MEMBERS WHERE id = '${id}' LIMIT 1;`,
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

// Create Squad Member table
// CREATE TABLE SQUAD_MEMBERS(id int(6) PRIMARY KEY AUTO_INCREMENT, name text, designation text, profile text, instagram text, facebook text, linkedIn text);