const express = require("express");
const router = express.Router();
const { faqSchema } = require("../schema");
const ExpressError = require("../utils/ExpressError");
const connection = require("../mySqlConnection");
const { VerifyLogin } = require("../Middleware/VerifyLogin");

const validatefaq = (req, res, next) => {
    const { error } = faqSchema.validate(req.body);
    if (error) {
        const msg = error.details.map((el) => el.message).join(", ");
        res.status(404).send(msg);
    } else {
        next();
    }
};

router.get("/", (req, res) => {
    connection.query("SELECT * FROM FAQS;", (err, results) => {
        if (err) {
            res.status(404).send(err.message);
        } else {
            res.status(202).send(results);
        }
    });
});

router.post("/new_faq", VerifyLogin, validatefaq, (req, res) => {
    const { question, answer } = req.body;
    connection.query(
        `INSERT INTO FAQS(question, answer) VALUES('${question}', '${answer}');`,
        (err) => {
            if (err) {
                res.status(404).send(err.message);
            } else {
                res.status(202).send("Faq uploaded!");
            }
        }
    );
});

router.delete("/delete_faq", VerifyLogin, (req, res) => {
    const { id } = req.query;
    if (id) {
        connection.query(
            `DELETE FROM FAQS WHERE id = '${id}' LIMIT 1;`,
            (err) => {
                if (err) {
                    res.status(404).send(err.message);
                } else {
                    res.status(202).send("Faq deleted!");
                }
            }
        );
    } else {
        res.status(404).send("Faq id not available!");
    }
});

module.exports = router;

// Create faqs table
// CREATE TABLE FAQS(id int(6) PRIMARY KEY AUTO_INCREMENT, question text, answer text);
