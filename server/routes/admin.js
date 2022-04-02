const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const { adminLoginSchema } = require("../schema");
const ExpressError = require("../utils/ExpressError");
const connection = require("../mySqlConnection");
const { verifyToken } = require("../Middleware/VerifyToken");

const validateAdmin = (req, res, next) => {
    const { error } = adminLoginSchema.validate(req.body);
    if (error) {
        const msg = error.details.map((el) => el.message).join(", ");
        res.status(404).send(msg);
    } else {
        next();
    }
};

router.get("/get_admin", verifyToken, (req, res) => {
    res.status(200).send("Admin Valid");
});

router.post("/login", validateAdmin, (req, res) => {
    const { key, password } = req.body;
    connection.query(
        `SELECT * FROM ADMIN WHERE login_key = '${key}'`,
        async (err, results) => {
            if (err) {
                res.status(400).send(err.message);
            } else if (results.length === 0) {
                res.status(409).send("Entered Key or password is incorrect");
            } else {
                const match = bcrypt.compare(password, results[0].password);
                if (!match) {
                    res.status(400).send("Wrong Password");
                } else {
                    const id = results[0].id;
                    const accessToken = jwt.sign(
                        { id, key },
                        process.env.ACCESS_TOKEN_SECRET,
                        {
                            expiresIn: "15s",
                        }
                    );
                    const refreshToken = jwt.sign(
                        { id, key },
                        process.env.REFRESH_TOKEN_SECRET,
                        {
                            expiresIn: "1d",
                        }
                    );
                    connection.query(
                        `UPDATE ADMIN SET refresh_token = '${refreshToken}' WHERE id = '${id}'`
                    );
                    res.cookie("refreshToken", refreshToken, {
                        httpOnly: true,
                        maxAge: 24 * 60 * 60 * 1000,
                    });
                    res.json({ accessToken });
                }
            }
        }
    );
});

// router.post("/register", validateAdmin, async (req, res) => {
//     const { key, password } = req.body;
//     const salt = await bcrypt.genSalt();
//     const hashPassword = await bcrypt.hash(password, salt);
//     try {
//         connection.query(
//             `INSERT INTO ADMIN(login_key, password) VALUES('${key}', '${hashPassword}');`,
//             (err, results) => {
//                 if (err) {
//                     res.status(401).send(err.message);
//                 } else {
//                     res.status(202).send("Registration Successful");
//                 }
//             }
//         );
//     } catch (error) {
//         console.log(error);
//     }
// });

module.exports = router;

// Create Admins table
// CREATE TABLE ADMIN(id int(6) PRIMARY KEY AUTO_INCREMENT, login_key text, password text, refresh_token text);
