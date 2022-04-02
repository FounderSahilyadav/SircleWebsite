const express = require("express");
const router = express.Router();
const { videosSchema } = require("../schema");
const ExpressError = require("../utils/ExpressError");
const connection = require("../mySqlConnection");
const { VerifyLogin } = require("../Middleware/VerifyLogin");

const validateVideo = (req, res, next) => {
    const { error } = videosSchema.validate(req.body);
    if (error) {
        const msg = error.details.map((el) => el.message).join(", ");
        res.status(404).send(msg);
    } else {
        next();
    }
};

// Get all the videos
router.get("/all_videos", (req, res) => {
    connection.query("SELECT * FROM VIDEOS;", function (err, results, fields) {
        if (err) {
            res.status(400).send(err.message);
        } else {
            res.status(202).send(results);
        }
    });
});

// Delete a video
router.delete("/delete_video", VerifyLogin, (req, res) => {
    const { videoId } = req.query;
    connection.query(
        `SELECT * FROM VIDEOS WHERE id = '${videoId}'`,
        function (err, results, fields) {
            if (err) {
                res.status(409).send(err.message);
            } else if (results.length === 0) {
                res.status(400).send("Video not found");
            } else {
                connection.query(
                    `DELETE FROM VIDEOS WHERE id = '${videoId}'`,
                    function (err, results, fields) {
                        if (err) {
                            res.status(400).send(err.message);
                        } else {
                            res.status(202).send("Video deleted");
                        }
                    }
                );
            }
        }
    );
});

// Add a new video
router.post("/new_video", VerifyLogin, validateVideo, (req, res) => {
    const { title, description, youtubeVidoeId, playListId } = req.body;
    connection.query(
        `SELECT * FROM PLAYLISTS WHERE id = '${playListId}'`,
        function (err, results) {
            if (err) {
                res.status(400).send(err.message);
            } else if (results.length === 0) {
                res.status(400).send("Playlist Not found");
            } else {
                connection.query(
                    `INSERT INTO VIDEOS(title, description, youtubeVidoeId, playListId) VALUES('${title}', '${description}', '${youtubeVidoeId}', '${playListId}');`,
                    function (err, results, fields) {
                        if (err) {
                            res.status(400).send(err.message);
                        } else {
                            res.status(202).send("Video Saved");
                        }
                    }
                );
            }
        }
    );
});

module.exports = router;

//Create table command
// CREATE TABLE VIDEOS(id int(6) PRIMARY KEY AUTO_INCREMENT, title varchar(225), description text, youtubeVidoeId varchar(225), playListId int);
