const express = require("express");
const fileupload = require("../services/fileupload");
const router = express.Router();
const memorybookController = require("../controller/memorybookController.js")
const authenticationService = require("../services/authentication.js");

router.use(authenticationService.authenticateAccess)

router.post("/create/", memorybookController.createEmptyElement, memorybookController.createMemorybook);
router.post("/create/group/",  memorybookController.createEmptyElement, memorybookController.createGroup);

router.get("/",  memorybookController.getAllMemorybooks);
router.get("/:memorybookId/",  memorybookController.getMemorybook);
router.get("/:memorybookId/groups",  memorybookController.getAllGroups);

router.post("/:memorybookId/cover",  fileupload.uploadCoverFile);

module.exports = router;