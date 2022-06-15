const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const _ = require("lodash");
const uuid = require("uuid");

const authenticationService = require("../services/authentication.js");

async function uploadFiles(directory, req, res) {
    try{
        if(!req.files){
            res.json({code: false, message: "No file to upload"})
        } else if(req.files.files !== {}){
            _.forEach(_.keysIn(req.files.files), async (key) => {
                let img = req.files.files[key];

                let uuidString = uuid.v4();
                let extension = img.name.split('.').pop()
                let filename = uuidString + "." + extension;

                let filepath = directory + filename

                await img.mv(filepath);
            });
        }
    }catch(error) {

    }
}

function readFiles(readDirectory, appendPath, req, res) {
    let savedFilesNames = fs.readdirSync(readDirectory);
    let savedFilesPaths = [];
    savedFilesNames.forEach(file => savedFilesPaths.push(appendPath + file));
    return savedFilesPaths;
}

router.use(authenticationService.authenticateAccess);

router.post("/uploads/profile", async (req, res) => {
    let dir = "./public/uploads/users/" + req.body.userId + "/";
    await uploadFiles(dir, req, res);
});

router.post("/temp/uploads/", async (req, res) => {
    let dir = "./public/uploads/temp/" + req.body.userId + "/";
    await uploadFiles(dir, req, res);

    res.json({code: 200, message: "All files uploaded"});
});

router.post("/temp/uploads/:groupOrder", async (req, res) => {
    let dir = "./public/uploads/temp/" + req.body.userId + "/" + req.params.groupOrder  + "/";
    await uploadFiles(dir, req, res);
});

router.get("/temp/uploads/", async (req, res) => {
    let dir = "./public/uploads/temp/" + req.body.userId + "/";
    let files = readFiles(dir,"http://localhost:4000/uploads/temp/"  + req.body.userId + "/" , req, res);
    res.json({code: 200,  message: "All images return", files:files});
});

module.exports = router;
