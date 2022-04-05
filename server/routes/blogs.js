const express = require("express");
const router = express.Router();
const { blogSchema, commentSchema } = require("../schema");
const connection = require("../mySqlConnection");
const { VerifyLogin } = require("../Middleware/VerifyLogin");

const validateBlog = (req, res, next) => {
    const { error } = blogSchema.validate(req.body);
    if (error) {
        const msg = error.details.map((el) => el.message).join(", ");
        res.status(404).send(msg);
    } else {
        next();
    }
};

router.get("/", (req, res) => {
    const { id } = req.query;
    if (id) {
        connection.query(
            `SELECT * FROM BLOGS WHERE id = '${id}' LIMIT 1;`,
            function(err, results, fields) {
                if (err) {
                    res.status(400).send({
                        Error: err.message,
                    });
                } else {
                    res.status(202).send(results[0]);
                }
            }
        );
    } else {
        connection.query(
            "SELECT * FROM BLOGS;",
            function(err, results, fields) {
                if (err) {
                    res.status(400).send(err.message);
                } else {
                    res.status(202).send(results);
                }
            }
        );
    }
});

router.delete("/delete_blog", VerifyLogin, (req, res) => {
    const { blogId } = req.query;
    connection.query(
        `DELETE FROM COMMENTS WHERE blogId = '${blogId}'`,
        (err) => {
            if (err) {
                res.status(400).send(err.message);
            } else {
                connection.query(
                    `DELETE FROM BLOGS WHERE id = '${blogId}'`,
                    function(err, results, fields) {
                        if (err) {
                            res.status(400).send(err.message);
                        } else {
                            res.status(202).send("Blog Deleted!");
                        }
                    }
                );
            }
        }
    );
});

router.post("/new_blog", VerifyLogin, validateBlog, (req, res) => {
    const { title, content, coverPicture, date } = req.body;
    connection.query(
        `INSERT INTO BLOGS(title, content, coverPicture, date) VALUES('${title}', '${content}', '${coverPicture}', '${date}');`,
        function(err, results, fields) {
            if (err) {
                res.status(400).send(err.message);
            } else {
                res.status(202).send("Blog Posted");
            }
        }
    );
});

router.patch("/update_blog", VerifyLogin, validateBlog, (req, res) => {
    const { title, content, coverPicture, date } = req.body;
    const { id } = req.query;
    connection.query(
        `UPDATE BLOGS SET title = '${title}', content = '${content}', coverPicture = '${coverPicture}', date = '${date}' WHERE id = '${id}'`,
        (err) => {
            if (err) {
                res.status(404).send("Couldn't Update Blog");
            } else {
                res.status(200).send("Blog Updated");
            }
        }
    );
});

module.exports = router;

// Create a blogs table
// CREATE TABLE BLOGS(id int(6) PRIMARY KEY AUTO_INCREMENT, title text, content text, coverPicture text, date text);