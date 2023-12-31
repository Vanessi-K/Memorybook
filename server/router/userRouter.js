const express = require("express");
const router = express.Router();

const authenticationService = require("../services/authentication.js");
const userController = require("../controller/userController");

router.post("/email/", userController.checkIfEmailIsUsed);


module.exports = router;