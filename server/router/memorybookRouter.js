const express = require("express");
const fileupload = require("../services/fileupload");
const router = express.Router();
const memorybookController = require("../controller/memorybookController.js")
const authenticationService = require("../services/authentication.js");

router.use(authenticationService.authenticateAccess)

router.post("/create/", memorybookController.createEmptyElement, memorybookController.createMemorybook);
router.post("/create/group/",  memorybookController.createEmptyElement, memorybookController.createGroup);

router.get("/",  memorybookController.getAllMemorybooks);
router.get("/favourite",  memorybookController.getFavouriteMemorybooks);
router.get("/notFavourite",  memorybookController.getNotFavouriteMemorybooks);

router.get("/full/:elementId",  memorybookController.getFullMemorybook);
router.post("/full/:elementId/save",  memorybookController.saveFullMemorybook);
router.post("/full/:elementId/delete",  memorybookController.deleteFullMemorybook);

router.get("/images/:imageId/delete",  memorybookController.deleteImage);

router.get("/:elementId/",  memorybookController.getMemorybook);
router.get("/:elementId/groups",  memorybookController.getAllGroups);

router.get("/:elementId/delete/",  memorybookController.deleteMemorybook, memorybookController.deleteSaveElement);
router.get("/:elementId/group/delete",  memorybookController.deleteGroup, memorybookController.deleteSaveElement);

router.get("/:elementId/images",  memorybookController.getAllImages);


router.post("/:memorybookId/cover",  fileupload.uploadCoverFile);

module.exports = router;