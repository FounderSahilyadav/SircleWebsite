const express = require("express");
const router = express.Router();
const { testimonialSchema } = require("../schema");
const ExpressError = require("../utils/ExpressError");
const connection = require("../mySqlConnection");
const { VerifyLogin } = require("../Middleware/VerifyLogin");

const validateTestimonial = (req, res, next) => {
    const { error } = testimonialSchema.validate(req.body);
    if (error) {
        const msg = error.details.map((el) => el.message).join(", ");
        res.status(404).send(msg);
    } else {
        next();
    }
};

router.get("/", (req, res) => {
    connection.query("SELECT * FROM TESTIMONIALS;", (err, results) => {
        if (err) {
            res.status(401).send(err.message);
        } else {
            res.status(202).send(results);
        }
    });
});

router.post(
    "/new_testimonial",
    VerifyLogin,
    validateTestimonial,
    (req, res) => {
        const { name, testimonial, profession, rating, youtubeVideoId } =
            req.body;
        connection.query(
            `INSERT INTO TESTIMONIALS(name, testimonial, profession, rating, youtubeVideoId) VALUES('${name}', '${testimonial}', '${profession}', '${rating}', '${youtubeVideoId}');`,
            (err, results) => {
                if (err) {
                    res.status(401).send(err.message);
                } else {
                    res.status(202).send("Testimonial posted.");
                }
            }
        );
    }
);

router.delete("/delete_testimonial", VerifyLogin, (req, res) => {
    const { id } = req.query;
    if (id) {
        connection.query(
            `DELETE FROM TESTIMONIALS WHERE id = '${id}'`,
            (err) => {
                if (err) {
                    res.status(401).send(err.message);
                } else {
                    res.status(202).send("Testimonial deleted successfully.");
                }
            }
        );
    } else {
        res.status(409).send("Please provide the testimonial id.");
    }
});

module.exports = router;

// Create testimonials table
// CREATE TABLE TESTIMONIALS(id int(6) PRIMARY KEY AUTO_INCREMENT, name text, testimonial text, profession text, rating int, youtubeVideoId varchar(225));
