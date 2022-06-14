const express = require("express");
const router = express.Router();

const authenticationService = require("../services/authentication.js");
const userController = require("../controller/userController");

router.post("/register", userController.insertUser);
//router.post("/login", userController.insertUser);

module.exports = router;