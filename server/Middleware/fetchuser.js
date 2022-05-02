const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const fetchuser = async(req, res, next) => {
    // console.log(req.body);
    const { token } = req.body;
    if (!token) {
        return res.status(401).send("Please authenticate using valid token");
    }
    try {
        // console.log(token);
        var data = await jwt.verify(token, JWT_SECRET);
        // console.log(data);
        req.user = data.user;
        next();
    } catch (error) {
        return res.status(401).send("Please authenticate using valid token");
    }
}

module.exports = fetchuser;