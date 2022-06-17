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
        .then((result) => res.json({code:200, message: "New memorybook created"}))
        .catch((error) => {console.log(error) ;res.json({code:500, message: "Could not create a new memorybook"})});
}

async function createGroup(req, res) {
    console.log("Create a new Group")

    memorybookModel.createEmptyGroup(req.body.elementId, req.body.memorybookId, req.body.orderId)
        .then((result) => res.json({code:200, message: "New group created"}))
        .catch((error) => {console.log(error) ;res.json({code:500, message: "Could not create a new group"})});
}




module.exports = {
    createEmptyElement,
    createMemorybook,
    createGroup
}