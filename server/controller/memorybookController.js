const memorybookModel = require("../model/memorybookModel.js");
const utility = require("../services/utility.js");
const path = require("path");

async function createEmptyElement(req, res, next) {
    console.log("Create a new Element")
    memorybookModel.createEmptyElement()
        .then((elementId) => {req.body.elementId = elementId; next()})
        .catch((error) => {console.log(error); res.json({code:500, message: "Could not create a new element"})});
}

async function createMemorybook(req, res) {

    console.log("Create a new Memory")
    console.log(req.body.elementId);

    memorybookModel.createEmptyMemorybook(req.body.elementId, req.body.userId)
        .then((result) => res.json({code:200, message: "New memorybook created", id: req.body.elementId}))
        .catch((error) => {console.log(error) ;res.json({code:500, message: "Could not create a new memorybook"})});
}

async function createGroup(req, res) {
    console.log("Create a new Group")

    memorybookModel.createEmptyGroup(req.body.elementId, req.body.memorybookId, req.body.orderId)
        .then((result) => res.json({code:200, message: "New group created", id: req.body.elementId}))
        .catch((error) => {console.log(error) ;res.json({code:500, message: "Could not create a new group"})});
}

async function getMemorybook(req, res) {

    console.log("Parameter");
    console.log(req.params.memorybookId);

    memorybookModel.getMemorybook(req.params.memorybookId, req.body.userId)
        .then((result) => {
            if(result !== undefined) {res.json({code:200, message: "Return Memorybook", memorybook: result})}
            else{res.json({code:404, message: "Could not find a memorybook", memorybook: null})}
        })
        .catch((error) => {console.log(error); res.json({code:500, message: "Could not create a new group"})});
}

async function getAllMemorybooks(req, res) {

    memorybookModel.getAllMemorybooks(req.body.userId)
        .then((result) => {
            if(result !== undefined) {res.json({code:200, message: "Return Memorybooks", memorybooks: result})}
            else{res.json({code:404, message: "Could not find a memorybook", memorybooks: null})}
        })
        .catch((error) => {console.log(error); res.json({code:500, message: "Could not create a new group"})});
}

async function getAllGroups(req, res) {

    memorybookModel.getAllGroups(req.params.memorybookId)
        .then((result) => {
            if(result !== undefined) {res.json({code:200, message: "Return Groups", groups: result})}
            else{res.json({code:404, message: "Could not find a group", groups: null})}
        })
        .catch((error) => {console.log(error); res.json({code:500, message: "Could not create a new group"})});
}

async function setMemorybookCover(req, res) {}

module.exports = {
    createEmptyElement,
    createMemorybook,
    createGroup,
    getMemorybook,
    setMemorybookCover,
    getAllGroups,
    getAllMemorybooks
}