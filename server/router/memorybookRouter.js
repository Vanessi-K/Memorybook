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

router.get("/full/:memorybookId",  memorybookController.getFullMemorybook);
router.post("/full/:memorybookId/save",  memorybookController.saveFullMemorybook);
router.post("/full/:memorybookId/delete",  memorybookController.deleteFullMemorybook);

router.get("/images/:imageId/delete",  memorybookController.deleteImage);

router.get("/:memorybookId/",  memorybookController.getMemorybook);
router.get("/:memorybookId/groups",  memorybookController.getAllGroups);

router.get("/:elementId/delete/",  memorybookController.deleteMemorybook, memorybookController.deleteSaveElement);
router.get("/:elementId/group/delete",  memorybookController.deleteGroup, memorybookController.deleteSaveElement);

router.get("/:elementId/images",  memorybookController.getAllImages);


router.post("/:memorybookId/cover",  fileupload.uploadCoverFile);

module.exports = router;