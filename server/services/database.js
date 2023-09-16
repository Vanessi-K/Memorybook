const mysql = require("mysql");
const secrets = require("../secret.js");

const config = mysql.createConnection({
    host: "", //TODO: add database host
    port: 8007,
    user: secrets.dbUser,
    password: secrets.dbPassword,
    database: "" //TODO: add database name
});

config.connect((err) => {
    if(err) throw err;
    console.log("Database connected");
});

module.exports = {config};
