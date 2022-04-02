const connection = require("../mySqlConnection");

// Verify if the admi is still logged in
module.exports.VerifyLogin = (req, res, next) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        return res.sendStatus(401);
    } else {
        connection.query("SELECT * FROM ADMIN", (err, results) => {
            if (err) {
                return res.sendStatus(404);
            } else {
                if (refreshToken !== results[0].refresh_token) {
                    return res.sendStatus(401);
                } else {
                    next();
                }
            }
        });
    }
};
