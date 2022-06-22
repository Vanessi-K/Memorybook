const memorybookModel = require("../model/memorybookModel.js");
const utility = require("../services/utility.js");
const path = require("path");

async function createEmptyElement(req, res, next) {
    memorybookModel.createEmptyElement()
        .then((elementId) => {req.body.elementId = elementId; next()})
        .catch((error) => {console.log(error); res.json({code:500, message: "Could not create a new element"})});
}

async function createMemorybook(req, res) {
    memorybookModel.createEmptyMemorybook(req.body.elementId, req.body.userId)
        .then((result) => res.json({code:200, message: "New memorybook created", id: req.body.elementId}))
        .catch((error) => {console.log(error) ;res.json({code:500, message: "Could not create a new memorybook"})});
}

async function createGroup(req, res) {
    memorybookModel.createEmptyGroup(req.body.elementId, req.body.memorybookId, req.body.orderId)
        .then((result) => res.json({code:200, message: "New group created", id: req.body.elementId}))
        .catch((error) => {console.log(error) ;res.json({code:500, message: "Could not create a new group"})});
}

async function getMemorybook(req, res) {
    memorybookModel.getMemorybook(req.params.elementId, req.body.userId)
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

async function getFavouriteMemorybooks(req, res) {
    memorybookModel.getFavouriteMemorybooks(req.body.userId)
        .then((result) => {
            if(result !== undefined) {res.json({code:200, message: "Return Memorybooks", memorybooks: result})}
            else{res.json({code:404, message: "Could not find a memorybook", memorybooks: null})}
        })
        .catch((error) => {console.log(error); res.json({code:500, message: "Could not create a new group"})});
}

async function getNotFavouriteMemorybooks(req, res) {
    memorybookModel.getNotFavouriteMemorybooks(req.body.userId)
        .then((result) => {
            if(result !== undefined) {res.json({code:200, message: "Return Memorybooks", memorybooks: result})}
            else{res.json({code:404, message: "Could not find a memorybook", memorybooks: null})}
        })
        .catch((error) => {console.log(error); res.json({code:500, message: "Could not create a new group"})});
}

async function getAllGroups(req, res) {
    memorybookModel.getAllGroups(req.params.elementId)
        .then((result) => {
            if(result !== undefined) {res.json({code:200, message: "Return Groups", groups: result})}
            else{res.json({code:404, message: "Could not find a group", groups: null})}
        })
        .catch((error) => {console.log(error); res.json({code:500, message: "Could not create a new group"})});
}

async function getAllImages(req, res) {

    memorybookModel.getAllImagesForSaveElement(req.params.elementId)
        .then((result) => {
            res.json({code:200, message: "Return Images", images: result})
        })
        .catch((error) => {console.log(error); res.json({code:500, message: "Could not retrieve images"})});
}

async function insertImage(req, res) {

    memorybookModel.insertImage(req.body.image, req.body.elementId)
        .then((result) => {
            res.json({code:200, message: "Inserted Image"})
        })
        .catch((error) => {console.log(error); res.json({code:500, message: "Could not insert image"})});
}

async function deleteImage(req, res) {

    memorybookModel.deleteImage(req.params.imageId)
        .then((result) => {
            res.json({code:200, message: "Deleted Image"})
        })
        .catch((error) => {console.log(error); res.json({code:500, message: "Could not delete image"})});
}

async function deleteGroup(req, res, next) {

    memorybookModel.deleteGroup(req.params.elementId)
        .then((result) => {
            next()
        })
        .catch((error) => {console.log(error); res.json({code:500, message: "Could not delete group"})});
}

async function deleteMemorybook(req, res, next) {

    memorybookModel.deleteMemorybook(req.params.elementId)
        .then((result) => {
            next()
        })
        .catch((error) => {console.log(error); res.json({code:500, message: "Could not delete Memorybook"})});
}

async function deleteSaveElement(req, res) {

    memorybookModel.deleteMemorybook(req.params.elementId)
        .then((result) => {
            res.json({code:200, message: "Deleted Element"})
        })
        .catch((error) => {console.log(error); res.json({code:500, message: "Could not delete SaveElement"})});
}

async function getFullMemorybook(req, res) {

    if(req.params.elementId === "undefined") {
        res.json({code:404, message: "No such id"})
    } else {
        memorybookModel.getMemorybook(req.params.elementId, req.body.userId)
            .then(memorybook => {
                if(memorybook === undefined) res.json({code:404, message: "Could not find memorybook", memorybook: null})

                memorybookModel.getAllImagesForSaveElement(req.params.elementId)
                    .then(memorybookImages => {
                        memorybookModel.getAllGroups(req.params.elementId)
                            .then(groups => {
                                if(!Array.isArray(groups)) {
                                    groups = new Array(groups);
                                }
                                groups.forEach((group, index, arr) => {
                                    memorybookModel.getAllImagesForSaveElement(group.groupId)
                                        .then(images => {
                                            group.images = images;
                                            if(index === groups.length - 1) {
                                                res.json({code: 200, message: "Fetched Memorybook", memorybook: {...memorybook, images: memorybookImages, groups: groups}})
                                            }

                                        })
                                        .catch((error) => {console.log(error); res.json({code:500, message: "Could not get group images"})});
                                });
                            })
                            .catch((error) => {console.log(error); res.json({code:500, message: "Could not get Groups"})});
                    })
                    .catch((error) => {console.log(error); res.json({code:500, message: "Could not get general images"})});
            }).catch((error) => {console.log(error); res.json({code:500, message: "Could not get Memorybook"})});
    }


}

async function saveFullMemorybook(req, res) {
    req.body.memorybook.memorybookId = req.params.elementId;

    memorybookModel.updateSaveElement(req.body.memorybook.title, req.body.memorybook.description, req.body.memorybook.memorybookId)
        .then(memorybookSaveElement => {
            memorybookModel.updateMemorybook(req.body.memorybook.isFavourite, req.body.memorybook.startDate, req.body.memorybook.endDate, req.body.memorybook.cover, req.body.memorybook.memorybookId )
                .then(memorybook => {
                    req.body.memorybook.groups.forEach(group => {
                        memorybookModel.updateSaveElement(group.title, group.description, group.groupId)
                            .catch((error) => {console.log(error); res.json({code:500, message: "Could not save Group in SaveElement"})});
                    });
                    res.json({code: 200, message: "Saved full Memorybook"})
                }).catch((error) => {console.log(error); res.json({code:500, message: "Could not save Memorybook in Memorybook"})});
        }).catch((error) => {console.log(error); res.json({code:500, message: "Could not save Memorybook in SaveElement"})});
}

async function deleteFullMemorybook(req, res) {
    req.body.memorybook.memorybookId = req.params.elementId;

    req.body.memorybook.groups.forEach(group => {

        if(group.images !== undefined) {
            if(Array.isArray(group.images)) {
                group.images = new Array(group.images);
            }

            group.images.forEach(image => {
                if(image.imageId !== undefined) {
                    memorybookModel.deleteImage(image.imageId).catch((error) => {console.log(error); res.json({code:500, message: "Could not delete image"})});
                }
            })
        }
        memorybookModel.deleteGroup(group.groupId).catch((error) => {console.log(error); res.json({code:500, message: "Could not delete group"})});
        memorybookModel.deleteSaveElement(group.groupId).catch((error) => {console.log(error); res.json({code:500, message: "Could not delete group from SaveElement"})});
    })

    memorybookModel.deleteMemorybook(req.body.memorybook.memorybookId)
        .then(result => {
            memorybookModel.deleteSaveElement(req.body.memorybook.memorybookId)
                .then(result => {
                    res.json({code: 200, message: "Memorybook fully deleted"})
                })
                .catch((error) => {console.log(error); res.json({code:500, message: "Could not delete Memorybook from SaveElement"})});
        })
        .catch((error) => {console.log(error); res.json({code:500, message: "Could not delete Memorybook"})});

}

module.exports = {
    createEmptyElement,
    createMemorybook,
    createGroup,
    getMemorybook,
    getAllGroups,
    getAllMemorybooks,
    getFavouriteMemorybooks,
    getNotFavouriteMemorybooks,
    getAllImages,
    deleteImage,
    deleteGroup,
    deleteMemorybook,
    deleteSaveElement,
    getFullMemorybook,
    saveFullMemorybook,
    deleteFullMemorybook
}