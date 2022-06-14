const jwt = require("jsonwebtoken");
const ACCESS_TOKEN_SECRET = require("../secret.js").access_token_secret;
const userModel = require("../model/userModel.js");
const bcrypt = require("bcrypt");

async function checkPassword(password, hash,) {
    let pwCheck = await bcrypt.compare(password, hash);
    return pwCheck;
}

async function authenticateUser(req, res) {

    await userModel.getUser(req.body.email)
        .then(async (user) => {
            console.log(user);
            let checkedPw = await checkPassword(req.body.password, user.password)

            console.log(checkedPw);

            console.log(user);

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
    let token = req.body.accessToken;

    console.log(token);

    if(token) {
        jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
            if(err) res.json({code:401, message: "Could not verify"});
            console.log(user)
            res.json({code:200, message: user})
        });
    } else {
        res.json({code:401, message: "Could not verify"});
    }
}

function authenticateJWT(req, res, next) {
    const token = req.cookies["accessToken"];

    if(token) {
        jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
            if(err) return res.status(403).render("error", {error: {code: 403, message: "Unauthorised access"}});
            req.user = user;
            next();
        });
    } else {
        res.status(401).render("error", {error: {code: 401, message: "Unauthorised access"}});
    }
}

module.exports = {
    authenticateUser,
    authenticateJWT,
    authenticateAccess
}