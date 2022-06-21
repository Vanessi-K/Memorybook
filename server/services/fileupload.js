const authenticationService = require("../services/authentication.js");
const _ = require("lodash");
const uuid = require("uuid");
const fs = require("fs");
const memorybookModel = require("../model/memorybookModel.js")

async function uploadFiles(directory, elementId, req, res) {
    let uploadDirectory = "./public/" + directory ;
    let saveDirectory = "http://localhost:4000/" + directory;

    try{
        if(!req.files){
            res.json({code: false, message: "No file to upload"})
            //check if multiple files have been uploads
        } else if(req.files.files !== {}){
            if(!req.files.files[0]){
                let file = req.files.files;
                req.files.files = [];
                req.files.files.push(file);
            }

            _.forEach(_.keysIn(req.files.files), async (key) => {
                let img = req.files.files[key];

                let uuidString = uuid.v4();
                let extension = img.name.split('.').pop()
                let filename = uuidString + "." + extension;

                await img.mv(uploadDirectory + filename);

                memorybookModel.insertImage({path:saveDirectory + filename, description: ""}, elementId)

            });
            res.json({code: 200, message: "All files uploaded"});
        }
    }catch(error) {
        res.json({code: 500, message: error});
    }
}

function readFilesDirectory(readDirectory, appendPath, req, res) {
    if(fs.existsSync(readDirectory)){
        let savedFilesNames = fs.readdirSync(readDirectory);
        let savedFilesPaths = [];
        savedFilesNames.forEach(file => savedFilesPaths.push(appendPath + file));
        return savedFilesPaths;
    } else {
        return [];
    }

}

async function uploadUserFile(req, res) {
    try{
        let directory = "./public/users/";

        if(!req.files){
            res.json({code: 500, message: "No file to upload"})
        } else if(req.files.files !== {}){
            let img = req.files.files;
            let uuidString = uuid.v4();
            let extension = img.name.split('.').pop()
            let filename = uuidString + "." + extension;
            let filepath = directory + filename
            await img.mv(filepath);
            res.json({code: 200, message: "All files uploaded", file: "http://localhost:4000/users/" + filename});
        }
    }catch(error) {
        res.json({code: 500, message: error });
    }
}

async function uploadCoverFile(req, res) {
    try{
        let directory = "./public/uploads/" + req.params.memorybookId + "/";

        if(!req.files){
            res.json({code: 500, message: "No file to upload"})
        } else if(req.files.files !== {}){
            let img = req.files.files;
            let uuidString = uuid.v4();
            let extension = img.name.split('.').pop()
            let filename = uuidString + "." + extension;
            let filepath = directory + filename
            await img.mv(filepath);
            res.json({code: 200, message: "All files uploaded", file: "http://localhost:4000/uploads/" + req.params.memorybookId + "/"+ filename});
        }
    }catch(error) {
        res.json({code: 500, message: error });
    }
}

module.exports = {
    uploadFiles,
    readFilesDirectory,
    uploadUserFile,
    uploadCoverFile
}