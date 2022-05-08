const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const connection = require("../mySqlConnection");

// Check for refresh token
router.get("/", (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken)
            return res.status(401).send("No Refresh Token found");
        connection.query(
            `SELECT * FROM ADMIN WHERE refresh_token = '${refreshToken}';`,
            (err, results) => {
                if (err) {
                    res.status(401).send(err.message);
                } else {
                    if (!results[0]) return res.sendStatus(403);
                    jwt.verify(
                        refreshToken,
                        process.env.REFRESH_TOKEN_SECRET,
                        (err, decoded) => {
                            if (err) return res.sendStatus(403);
                            const id = results[0].id;
                            const key = results[0].login_key;
                            const accessToken = jwt.sign({ id, key },
                                process.env.ACCESS_TOKEN_SECRET, {
                                    expiresIn: "15s",
                                }
                            );
                            res.status(200).send({ accessToken });
                        }
                    );
                }
            }
        );
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;