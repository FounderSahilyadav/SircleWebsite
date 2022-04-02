const express = require("express");
const router = express.Router();
const { commentSchema } = require("../schema");
const connection = require("../mySqlConnection");
const { VerifyLogin } = require("../Middleware/VerifyLogin");

const validateComment = (req, res, next) => {
    const { error } = commentSchema.validate(req.body);
    if (error) {
        const msg = error.details.map((el) => el.message).join(", ");
        res.status(404).send(msg);
    } else {
        next();
    }
};

// Get verified comments for a blog
router.get("/", (req, res) => {
    const { blogId } = req.query;
    connection.query(
        `SELECT * FROM COMMENTS WHERE blogId = '${blogId}' AND verified = 'true';`,
        (err, results) => {
            if (err) {
                res.status(401).send(err.message);
            } else {
                res.status(200).send(results);
            }
        }
    );
});

// Get unverified comments
router.get("/unverified_comments", VerifyLogin, (req, res) => {
    const { blogId } = req.query;
    connection.query(
        `SELECT * FROM COMMENTS WHERE blogId = '${blogId}' AND verified = 'false';`,
        (err, results) => {
            if (err) {
                res.status(401).send(err.message);
            } else if (results.length === 0) {
                res.status(404).send("No Unverified Comments");
            } else {
                res.status(200).send(results);
            }
        }
    );
});

router.post("/new_comment", validateComment, (req, res) => {
    const { name, email, comment, blogId, date } = req.body;
    connection.query(
        `SELECT * FROM BLOGS WHERE id = '${blogId}'`,
        (err, results) => {
            if (err) {
                res.status(401).send(err.message);
            } else if (results.length === 0) {
                res.status(404).send(`Couldn't find blog for id = ${blogId}`);
            } else {
                connection.query(
                    `INSERT INTO COMMENTS(name, email, comment, blogId, date, verified) VALUES('${name}', '${email}', '${comment}', '${blogId}', '${date}', '${false}');`,
                    (err, results) => {
                        if (err) {
                            res.status(400).send(err.message);
                        } else {
                            res.status(202).send("Comment Posted.");
                        }
                    }
                );
            }
        }
    );
});

router.patch("/verify_comment", VerifyLogin, (req, res) => {
    const { id } = req.query;
    if (id) {
        connection.query(
            `UPDATE COMMENTS SET verified = 'true' WHERE id = '${id}' LIMIT 1`,
            (err, results) => {
                if (err) {
                    res.status(401).send(err.message);
                } else {
                    res.status(200).send("Status Updated");
                }
            }
        );
    }
});

module.exports = router;

// Create a comments table
// CREATE TABLE COMMENTS(id int(6) PRIMARY KEY AUTO_INCREMENT, name text, email text, comment text, blogId text, date text, verified varchar(225));
