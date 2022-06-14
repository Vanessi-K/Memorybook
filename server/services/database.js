const mysql = require("mysql");
const secrets = require("../secret.js");

const config = mysql.createConnection({
    host: "atp.fhstp.ac.at",
    port: 8007,
    user: secrets.dbUser,
    password: secrets.dbPassword,
    database: "cc211026"
});

config.connect((err) => {
    if(err) throw err;
    console.log("Database connected");
});

module.exports = {config};
