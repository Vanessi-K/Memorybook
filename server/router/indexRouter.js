const express = require("express");
const router = express.Router();

const authenticationService = require("../services/authentication.js");
const userController = require("../controller/userController");

router.post("/register", userController.insertUser);
router.post("/login", authenticationService.authenticateUser);
router.post("/authenticate", authenticationService.authenticateAccess);

module.exports = router;