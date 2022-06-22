const userModel = require("../model/userModel.js");
const utility = require("../services/utility.js");
const path = require("path");

async function insertUser(req, res) {
    userModel.insertUser(req.body)
        .then((user) => res.json({code:200, message: "New user registered"}))
        .catch((error) => res.json({code:500, message: "Could not create a new user"}));
}

async function checkIfEmailIsUsed(req, res) {
    userModel.checkIfEmailIsUsed(req.body.email)
        .then((email) => {
           res.json({code:200, message: "Email is already used", email: (email !== undefined)});
        })
        .catch((error) => {
            console.log(error)
            res.json({code:500, message: "Could not check the email: Server Error"})
        });
}




module.exports = {
    insertUser,
    checkIfEmailIsUsed
}