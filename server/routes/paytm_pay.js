const express = require("express");
const fetchuser = require("../Middleware/fetchuser");
const router = express.Router();
const https = require("https");
const qs = require("querystring");

const connection = require("../mySqlConnection");

const jwt = require('jsonwebtoken');

const checkSum_lib = require("../Paytm/checksum");
const PaytmChecksum = require("../Paytm/paytmChecksum");
const JWT_SECRET = process.env.JWT_SECRET;
const { response } = require("express");
const { readSync } = require("fs");
const fetchcourse = require("../Middleware/fetchuser");
const fetchstatus = require("../Middleware/fetchstatus");

// const config = require("./Paytm/config");
const parseUrl = express.urlencoded({ extended: false });
const parseJson = express.json({ extended: false });

router.post("/paynow", fetchuser, [parseUrl, parseJson], (req, res) => {
    // Route for making payment
    var paymentDetails = {
        amount: req.body.amount,
        customerId: req.body.Id,
        customerEmail: req.body.email,
        customerPhone: req.body.phone
    }
    console.log(paymentDetails);
    if (!paymentDetails.amount || !paymentDetails.customerId || !paymentDetails.customerEmail || !paymentDetails.customerPhone || req.body.Id != req.user.id) {
        return res.status(400).send('Payment failed');
    } else {
        connection.query(
            `SELECT * FROM Orders where studentId = '${req.user.id}' and courseName = '${req.body.courseName}';`,
            function(err, results, fields) {
                if (err) {
                    return res.status(400).send(err.message);
                } else {
                    // console.log(results);
                    if (results.length !== 0) {
                        return res.status(400).send("You have already Purchased this course");
                    } else {
                        var params = {};
                        params['MID'] = process.env.MERCHANT_ID;
                        params['WEBSITE'] = process.env.WEBSITE;
                        params['CHANNEL_ID'] = process.env.CHANNEL_ID;
                        params['INDUSTRY_TYPE_ID'] = 'Retail';
                        params['ORDER_ID'] = 'TEST_' + new Date().getTime();
                        params['CUST_ID'] = paymentDetails.customerId;
                        params['TXN_AMOUNT'] = paymentDetails.amount;
                        params['CALLBACK_URL'] = 'http://localhost:5000/api/payment/callback';
                        params['EMAIL'] = paymentDetails.customerEmail;
                        params['MOBILE_NO'] = paymentDetails.customerPhone;
                        // return res.send(params);
                        checkSum_lib.genchecksum(params, process.env.MERCHANT_KEY, function(err, checksum) {
                            console.log("checksum", checksum);
                            var par = {
                                ...params,
                                "CHECKSUMHASH": checksum
                            }
                            res.json(par);
                            console.log(par);
                        });
                    }
                }
            }
        );


    }
});

router.post("/callback", (req, res) => {
    var paytm_Checksum = "";
    var paytmParams = {};
    for (var key in req.body) {
        if (key == "CHECKSUMHASH") {
            paytm_Checksum = req.body[key];
        } else {
            paytmParams[key] = req.body[key];
        }
    }
    var isValidChecksum = checkSum_lib.verifychecksum(paytmParams, process.env.MERCHANT_KEY, paytm_Checksum);
    if (isValidChecksum) {
        console.log("checksum Matched");
        var paytmParams = {};
        paytmParams['MID'] = req.body.MID;
        paytmParams['ORDER_ID'] = req.body.ORDERID;
        PaytmChecksum.generateSignature(paytmParams, process.env.MERCHANT_KEY).then(function(checksum) {
            paytmParams["CHECKSUMHASH"] = checksum;
            let post_data = JSON.stringify(paytmParams);
            var option = {
                hostname: "securegw-stage.paytm.in",
                port: 443,
                path: "/order/status",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Content-Length": post_data.length
                }
            };
            var response = "";
            var post_req = https.request(option, function(post_res) {
                post_res.on('data', function(chunk) {
                    response += chunk;
                });
                post_res.on('end', function() {
                    console.log('Status: ', response);
                    var result = JSON.parse(response);
                    console.log(result.STATUS);
                    const data = {
                        user: {
                            id: result.STATUS
                        }
                    }
                    const token = jwt.sign(data, JWT_SECRET);
                    res.redirect(`http://localhost:3000/course/fee?status=${token}`);
                });
            });
            post_req.write(post_data);
            // res.json("success")
            post_req.end();
        })
    } else {
        console.log("checksum Not matched");
        res.json("Please do not interfere");
    }
})

router.post("/update/course", fetchuser, fetchstatus, (req, res) => {
    try {
        const { courseName, studentId, phone } = req.body;

        if (req.user.id != studentId) {
            return res.status(400).send("Plesase Authenticate using valid token");
        }
        if (!courseName || !phone) {
            return res.status(400).send("Please Purchase valid course");
        }
        connection.query(
            `SELECT * FROM Orders where studentId = '${req.user.id}' and courseName = '${courseName}';`,
            function(err, results, fields) {
                if (err) {
                    res.status(400).send(err.message);
                } else {
                    if (results.length !== 0) {
                        return res.status(202).json({ msg: "You have already Purchased this course" });
                    }
                    connection.query(
                        `INSERT INTO Orders(studentId, phone, courseName) VALUES('${studentId}', '${phone}', '${courseName}');`,
                        function(err, results, fields) {
                            if (err) {
                                res.status(400).send(err.message);
                            } else {
                                console.log(results);
                                res.status(202).json({ msg: "Course is Successfully Purchased" });
                            }
                        }
                    );
                }
            }
        );
    } catch (error) {
        res.send(error.message);
    }
});

router.post("/fetch/orders", fetchuser, async(req, res) => {
    connection.query(
        `SELECT courseName FROM Orders where studentId = '${req.user.id}'`,
        function(err, results, fields) {
            if (err) {
                res.status(400).send(err.message);
            } else {
                res.status(202).json(results);
            }
        }
    );
});


module.exports = router;

// CREATE TABLE Orders(id int PRIMARY KEY AUTO_INCREMENT, studentId text not NULL, phone text not NULL, courseName text not NULL);