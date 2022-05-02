const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const fetchstatus = async(req, res, next) => {
    // console.log(req.body);
    const { status } = req.body;
    if (!status) {
        return res.status(401).send("Stop messing with api");
    }
    try {
        var stat = await jwt.verify(status, JWT_SECRET);
        console.log(stat);
        req.stat = stat.user;
        console.log(req.stat);
        if (req.stat.id === 'TXN_SUCCESS') {
            next();
        } else
            return res.status(400).send("Transaction failed");
        // console.log(req.)
    } catch (error) {
        return res.status(401).send("Please do not interfare with api");
    }
}
module.exports = fetchstatus;