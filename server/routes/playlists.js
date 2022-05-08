const express = require("express");
const router = express.Router();
const { playListSchema } = require("../schema");
const ExpressError = require("../utils/ExpressError");
const connection = require("../mySqlConnection");
const { VerifyLogin } = require("../Middleware/VerifyLogin");

const validatePlayList = (req, res, next) => {
    const { error } = playListSchema.validate(req.body);
    if (error) {
        const msg = error.details.map((el) => el.message).join(", ");
        res.status(404).send(msg);
    } else {
        next();
    }
};

// Get all the playlists
router.get("/", (req, res) => {
    connection.query(
        "SELECT * FROM PLAYLISTS",
        function(err, results, fields) {
            if (err) {
                res.status(400).send(err.message);
            } else {
                res.status(202).send(results);
            }
        }
    );
});

// Add a new playlist
router.post("/new_playList", VerifyLogin, validatePlayList, (req, res) => {
    const { title } = req.body;
    connection.query(
        `INSERT INTO PLAYLISTS(title) VALUES('${title}')`,
        function(err, results, fields) {
            if (err) {
                res.status(400).send(err.message);
            } else {
                res.status(202).send("New Playlist Created!");
            }
        }
    );
});

//Delete a playlist
router.delete("/delete_playlist", VerifyLogin, (req, res) => {
    const { playListId } = req.query;
    if (playListId) {
        connection.query(
            `SELECT * FROM PLAYLISTS WHERE id = '${playListId}'`,
            function(err, results, fields) {
                if (err) {
                    res.status(400).send(err.message);
                } else if (results.length === 0) {
                    res.status(400).send("Playlist not found.");
                } else {
                    connection.query(
                        `DELETE FROM VIDEOS WHERE playListId = '${playListId}'`
                    );
                    connection.query(
                        `DELETE FROM PLAYLISTS WHERE id = '${playListId}'`
                    );
                    res.status(202).send("Playlist deleted.");
                }
            }
        );
    } else {
        res.status(400).send("Please Provide Playlist id");
    }
});

module.exports = router;

//Create table command
// CREATE TABLE VIDEOS(id int(6) PRIMARY KEY AUTO_INCREMENT, title varchar(225), description text, youtubeVidoeId varchar(225), playListId int);
// CREATE TABLE PLAYLISTS(id int(6) PRIMARY KEY AUTO_INCREMENT, title varchar(225));