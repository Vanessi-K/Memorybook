const express = require("express");
const fileupload = require("../services/fileupload");
const router = express.Router();
const memorybookController = require("../controller/memorybookController.js")

router.post("/create/", memorybookController.createEmptyElement, memorybookController.createMemorybook);
router.post("/create/group/",  memorybookController.createEmptyElement, memorybookController.createGroup);

module.exports = router;