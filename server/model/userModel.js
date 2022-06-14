const db = require("../services/database").config;
const bcrypt = require("bcrypt");

let insertUser = (userData) => new Promise(async (resolve, reject) => {
    let encryptedPassword = await bcrypt.hash(userData.password, 10);

    let sql = "INSERT INTO User(username, email, profilePicture, password) values (" +
        "" + db.escape(userData.username) +
        "," + db.escape(userData.email) +
        "," + db.escape("/users/placeholder.png") +
        "," + db.escape(encryptedPassword) +
        ")";

    db.query(sql, function(err, user, fields) {
        if(err)
        {console.log(err); reject(err)}
        resolve(userData);
    });
});

let checkIfEmailIsUsed = (checkEmail) => new Promise((resolve, reject) => {

    db.query("SELECT email from User WHERE email=?", [checkEmail], (err, email, fields) => {
        if(err) {
            reject(err);
        } else {
            resolve(email[0]);
        }
    });

});

module.exports = {
    insertUser,
    checkIfEmailIsUsed
}