const express = require("express");
const fetchuser = require("../Middleware/fetchuser");
const { VerifyLogin } = require("../Middleware/VerifyLogin");
const connection = require("../mySqlConnection");
const router = express.Router();

// Get all Call back request
router.post("/all/callback", VerifyLogin, (req, res) => {
    connection.query(
        `SELECT * FROM CALLBACK`,
        (err, results) => {
            if (err) {
                res.status(400).send(err.message);
            } else {
                res.status(200).json({ results });
            }
        }
    );
});

// Delete Callback request
router.post("/delete/callback", VerifyLogin, (req, res) => {
    const { id } = req.body;
    connection.query(
        `DELETE FROM CALLBACK WHERE id = '${id}'`,
        (err, results) => {
            if (err) {
                res.status(400).send(err.message);
            } else {
                res.status(200).send("Callback Deleted!");
            }
        }

    );
});



// Callback Request api /api/callback/request
router.post("/callback/request", fetchuser, (req, res) => {
    const { name, className, phone } = req.body;
    // console.log("I am called");
    if (!name || !className || !phone) {
        return res.status(404).send("Please Enter valid Credential");
    }
    var date = new Date();
    date = date.toISOString().slice(0, 19).replace('T', ' ');
    connection.query(
        `SELECT * FROM STUDENTS where id = '${req.user.id}' and expireAt > '${date}';`,
        function(err, results, fields) {
            if (err) {
                res.status(400).send(err.message);
            } else {
                if (results.length === 0) {
                    return res.status(402).send("User Not Found Login Again");
                }
                connection.query(
                    `SELECT * FROM CALLBACK where studentId = '${req.user.id}' and phone = '${phone}';`,
                    function(err, results, fields) {
                        if (err) {
                            return res.status(400).send(err.message);
                        }
                        // console.log(results);
                        if (results.length !== 0) {
                            return res.status(202).json({ msg: "Your call back already registered" });
                        }
                        connection.query(
                            `INSERT INTO CALLBACK(studentId, phone, className, name) VALUES('${req.user.id}', '${phone}', '${className}', '${name}');`,
                            function(err, results, fields) {
                                if (err) {
                                    res.status(400).send(err.message);
                                } else {
                                    // console.log(results);
                                    res.status(202).json({ msg: "You will soon received a Call Back..." });
                                }
                            }
                        );
                    }
                );

            }
        }
    );
})

// Book free trial api /api/free/trial
router.post("/free/trial", fetchuser, (req, res) => {
    const { name, phone, email, className, institute } = req.body;
    // console.log("I am called");
    if (!name || !phone) {
        return res.status(404).send("Please Enter valid Credential");
    }
    var date = new Date();
    date = date.toISOString().slice(0, 19).replace('T', ' ');
    connection.query(
        `SELECT * FROM STUDENTS where id = '${req.user.id}' and expireAt > '${date}';`,
        function(err, results, fields) {
            if (err) {
                res.status(400).send(err.message);
            } else {
                if (results.length === 0) {
                    return res.status(402).send("User Not Found Login Again");
                }
                connection.query(
                    `SELECT * FROM FREETRIAL where studentId = '${req.user.id}' and phone = '${phone}';`,
                    function(err, results, fields) {
                        if (err) {
                            return res.status(400).send(err.message);
                        }

                        if (results.length !== 0) {
                            return res.status(202).json({ msg: "Your free trial already registered" });
                        }
                        connection.query(
                            `INSERT INTO FREETRIAL(studentId, phone, name, email, className, institute) VALUES('${req.user.id}', '${phone}', '${name}', '${email}', '${className}', '${institute}');`,
                            function(err, results, fields) {
                                if (err) {
                                    res.status(400).send(err.message);
                                } else {
                                    // console.log(results);
                                    res.status(202).json({ msg: "You will soon received a free trial..." });
                                }
                            }
                        );
                    }
                );
            }
        }
    );
});

// Fetch all Free Trial booking
router.post("/all/freetrial", VerifyLogin, (req, res) => {
    connection.query(
        `SELECT * FROM FREETRIAL`,
        (err, results) => {
            if (err) {
                res.status(400).send(err.message);
            } else {
                res.status(200).json({ results });
            }
        }
    );
});

// Delete FreeTrial request
router.post("/delete/freetrial", VerifyLogin, (req, res) => {
    const { id } = req.body;
    connection.query(
        `DELETE FROM FREETRIAL WHERE id = '${id}'`,
        (err, results) => {
            if (err) {
                res.status(400).send(err.message);
            } else {
                res.status(200).send("Callback Deleted!");
            }
        }

    );
});

// CREATE TABLE CALLBACK(id int PRIMARY KEY AUTO_INCREMENT, studentId text not NULL, phone text not NULL, className text not NULL, name text not NULL);
// CREATE TABLE FreeTrial(id int PRIMARY KEY AUTO_INCREMENT, studentId text not NULL, phone text not NULL,  name text not NULL,email text, institute text, className text not NULL);

module.exports = router;