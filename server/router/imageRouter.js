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

router.post("/temp/uploads/", async (req, res) => {
    let dir = "./public/uploads/temp/" + req.body.userId + "/";
    await fileupload.uploadFiles(dir, req, res);
});

router.post("/temp/uploads/:groupOrder/", async (req, res) => {
    let dir = "./public/uploads/temp/" + req.body.userId + "/" + req.params.groupOrder  + "/";
    await fileupload.uploadFiles(dir, req, res);
});

router.get("/temp/uploads/", async (req, res) => {
    let dir = "./public/uploads/temp/" + req.body.userId + "/";
    let files = fileupload.readFiles(dir,"http://localhost:4000/uploads/temp/"  + req.body.userId + "/" , req, res);
    res.json({code: 200,  message: "All images return", files:files});
});

module.exports = router;
