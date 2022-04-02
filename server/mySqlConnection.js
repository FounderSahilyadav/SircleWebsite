const mysql = require("mysql2");
require("dotenv").config();

// Create a connection to the database
const connection = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABSSE_USER,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
});

module.exports = connection;
