const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const fetchuser = async(req, res, next) => {
    const { token } = req.body;
    console.log(token);
    if (!token) {
        return res.status(401).json({ error: "Please authenticate using valid token" });
    }
    try {
        var data = await jwt.verify(token, JWT_SECRET);
        console.log(data);
        req.user = data.user;
        next();
    } catch (error) {
        return res.status(401).json({ error: "Please authenticate using valid token" });
    }
}

module.exports = fetchuser;