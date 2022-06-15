const jwt = require("jsonwebtoken");
const ACCESS_TOKEN_SECRET = require("../secret.js").access_token_secret;
const userModel = require("../model/userModel.js");
const bcrypt = require("bcrypt");

async function checkPassword(password, hash,) {
    let pwCheck = await bcrypt.compare(password, hash);
    return pwCheck;
}

async function authenticateUser(req, res) {

    console.log("authenticate User")

    await userModel.getUser(req.body.email)
        .then(async (user) => {
            let checkedPw = await checkPassword(req.body.password, user.password)

            //Get password from the database and check it with the submitted one
            if(checkedPw) {
                const accessToken = jwt.sign({id: user.userId}, ACCESS_TOKEN_SECRET);
                res.json({code:200, message: "User id for sent credentials", accessToken: accessToken});
            } else {
                res.json({code:200, message: "No user found for this credentials", accessToken: false});
            }
        })
        .catch((error) => {
            console.log(error);
            res.json({code:500, message: "Could not get user-id: Server Error"})
        });
}

function authenticateAccess(req, res, next) {
    let token = req.get("accessToken");

    console.log("authenticate access")

    if(token) {
        jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
            if(err) res.json({code:401, message: "Could not verify"});
            req.body.userId = user.id;
            console.log(req.body.userId);
            console.log("You are authenticated");
            next();
        });
    } else {
        res.json({code:401, message: "Could not verify"});
    }
}

function authenticateJWT(req, res, next) {
    let token = req.get("accessToken");
    console.log("authenticate JWT")

    if(token) {
        jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
            if(err) res.json({code:401, message: "Could not verify"});
            console.log("You are authenticated")
            res.json({code:200, message: user});
        });
    } else {
        res.json({code:401, message: "Could not verify"});
    }
}

module.exports = {
    authenticateUser,
    authenticateJWT,
    authenticateAccess
}