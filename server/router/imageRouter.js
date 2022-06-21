const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const _ = require("lodash");
const uuid = require("uuid");

const authenticationService = require("../services/authentication.js");
const fileupload = require("../services/fileupload.js");


router.post("/temp/uploads/", authenticationService.authenticateAccess);
router.post("/temp/uploads/:groupOrder/", authenticationService.authenticateAccess);
router.get("/temp/uploads/", authenticationService.authenticateAccess);

router.post("/uploads/profile", async (req, res) => {
    await fileupload.uploadUserFile(req, res);
});

router.post("/uploads/:elementId/", async (req, res) => {
    let dir = "uploads/" + req.params.elementId + "/";
    await fileupload.uploadFiles(dir, req.params.elementId, req, res);
});


module.exports = router;
