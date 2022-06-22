const db = require("../services/database").config;
const bcrypt = require("bcrypt");

let createEmptyElement = () => new Promise(async (resolve, reject) => {

    let sql = "INSERT INTO SaveElement(title, description) values ('','')";

    db.query(sql, function(err, element, fields) {
        if(err) {console.log(err); reject(err)}
        resolve(element.insertId);
    });
});

let createEmptyMemorybook = (bookId, userId) => new Promise(async (resolve, reject) => {

    let today = new Date();

    let sql1 = "INSERT INTO Memorybook(memorybookId, isFavourite, startDate, endDate, cover, creator, creationDate) values (" +
        db.escape(bookId) + ", " +
        db.escape(false) + ", " +
        db.escape(today) + ", " +
        db.escape(null) + ", " +
        db.escape('http://localhost:4000/uploads/placeholder.png') + ", " +
        db.escape(userId) + ", " +
        db.escape(today) +
    ");"

    let sql2 = "INSERT INTO OwnsBook(userId, memorybookId, canEdit) values(" +
        db.escape(userId) + ", " +
        db.escape(bookId) + ", " +
        db.escape(true) +
        ");"

    db.query(sql1, function(err, memorybook, fields) {
        if(err) {console.log(err); reject(err)}

        db.query(sql2, function(err, result, fields) {
            if(err) {console.log(err); reject(err)}

            resolve(result);
        });
    });
});

let createEmptyGroup = (groupId, memorybookId, orderId) => new Promise(async (resolve, reject) => {

    let sql = "INSERT INTO Grouping(groupId, memorybookId, orderId) values (" +
        db.escape(groupId) + ", " +
        db.escape(memorybookId) + ", " +
        db.escape(orderId) +
        ")";

    db.query(sql, function(err, group, fields) {
        if(err) {console.log(err); reject(err)}
        resolve(group);
    });
});

let getMemorybook = (bookId, userId) => new Promise(async (resolve, reject) => {

    let sql = "SELECT * from Memorybook JOIN SaveElement JOIN OwnsBook " +
        "WHERE Memorybook.memorybookId=SaveElement.elementId AND "+
        "OwnsBook.memorybookId=Memorybook.memorybookId AND " +
        "OwnsBook.userId=" + userId + " AND " +
        "Memorybook.memorybookId=" + bookId + " "
        "ORDER BY Memorybook.startDate";

    db.query(sql, function(err, memorybook, fields) {
        if(err) {console.log(err); reject(err)}

        if(Array.isArray(memorybook)) {
            resolve(memorybook[0]);
        } else{
            resolve(memorybook);
        }


    });
});



let setMemorybookCover = (groupId, bookId, userId) => new Promise(async (resolve, reject) => {

    let sql = "INSERT INTO Grouping(groupId, memorybookId, orderId) values (" +
        db.escape(groupId) + ", " +
        db.escape(memorybookId) + ", " +
        db.escape(orderId) +
        ")";

    db.query(sql, function(err, group, fields) {
        if(err) {console.log(err); reject(err)}
        resolve(group);
    });
});

let getAllMemorybooks = (userId) => new Promise(async (resolve, reject) => {

    let sql = "SELECT * from Memorybook JOIN SaveElement JOIN OwnsBook " +
        "WHERE Memorybook.memorybookId=SaveElement.elementId AND + "+
        "OwnsBook.memorybookId=Memorybook.memorybookId AND " +
        "OwnsBook.userId=" + userId;

    db.query(sql, function(err, memorybook, fields) {
        if(err) {console.log(err); reject(err)}
        resolve(memorybook);
    });
});

let getFavouriteMemorybooks = (userId) => new Promise(async (resolve, reject) => {

    let sql = "SELECT * from Memorybook JOIN SaveElement JOIN OwnsBook " +
        "WHERE Memorybook.memorybookId=SaveElement.elementId AND + "+
        "OwnsBook.memorybookId=Memorybook.memorybookId AND " +
        "Memorybook.isFavourite=1 AND " +
        "OwnsBook.userId=" + userId;

    db.query(sql, function(err, memorybook, fields) {
        if(err) {console.log(err); reject(err)}
        resolve(memorybook);
    });
});

let getNotFavouriteMemorybooks = (userId) => new Promise(async (resolve, reject) => {

    let sql = "SELECT * from Memorybook JOIN SaveElement JOIN OwnsBook " +
        "WHERE Memorybook.memorybookId=SaveElement.elementId AND + "+
        "OwnsBook.memorybookId=Memorybook.memorybookId AND " +
        "Memorybook.isFavourite=0 AND " +
        "OwnsBook.userId=" + userId;

    db.query(sql, function(err, memorybook, fields) {
        if(err) {console.log(err); reject(err)}
        resolve(memorybook);
    });
});

let getAllGroups = (bookId) => new Promise(async (resolve, reject) => {

    let sql = "SELECT * from Grouping JOIN SaveElement " +
        "WHERE Grouping.groupId=SaveElement.elementId AND "+
        "Grouping.memorybookId=" + bookId + " "
        "ORDER BY Grouping.orderId";

    db.query(sql, function(err, group, fields) {
        if(err) {console.log(err); reject(err)}
        resolve(group);
    });
});

let getAllImagesForSaveElement = (elementId) => new Promise(async (resolve, reject) =>{
    let sql = "SELECT * from Image WHERE elementId=" + elementId;
    db.query(sql, function(err, image, fields) {
        if(err) {console.log(err); reject(err)}
        resolve(image);
    });
})

let insertImage = (image, elementId) => new Promise(async (resolve, reject) =>{
    let sql = "INSERT INTO Image(path, description, elementId) values(" +
        db.escape(image.path) + ", " +
        db.escape(image.description) + ", " +
        db.escape(elementId) +
        ")";
    db.query(sql, function(err, image, fields) {
        if(err) {console.log(err); reject(err)}
        resolve(image);
    });
})

let deleteImage = (imageId) => new Promise(async (resolve, reject) =>{
    let sql = "DELETE FROM Image WHERE imageId=" + imageId;
    db.query(sql, function(err, image, fields) {
        if(err) {console.log(err); reject(err)}
        resolve(image);
    });
})

let deleteGroup = (elementId) => new Promise(async (resolve, reject) =>{
    let sql = "DELETE FROM Grouping WHERE groupId=" + elementId;
    db.query(sql, function(err, group, fields) {
        if(err) {console.log(err); reject(err)}
        resolve(group);
    });
})

let deleteMemorybook = (elementId) => new Promise(async (resolve, reject) =>{
    let sql = "DELETE FROM Memorybook WHERE memorybookId=" + elementId;
    db.query(sql, function(err, memorybook, fields) {
        if(err) {console.log(err); reject(err)}
        resolve(memorybook);
    });
})

let deleteSaveElement = (elementId) => new Promise(async (resolve, reject) =>{
    let sql = "DELETE FROM SaveElement WHERE elementId=" + elementId;
    db.query(sql, function(err, element, fields) {
        if(err) {console.log(err); reject(err)}
        resolve(element);
    });
})

let updateSaveElement = (title, description, elementId) => new Promise(async (resolve, reject) => {
    let sql = "UPDATE SaveElement SET " +
        "title=" + db.escape(title) + ", " +
        "description=" + db.escape(description) + " " +
        "WHERE SaveElement.elementId=" + db.escape(elementId);

    db.query(sql, function(err, element, fields) {
        if(err) {console.log(err); reject(err)}
        resolve(element);
    });
})

let updateMemorybook= (isFavourite, startDate, endDate, cover, memorybookId) => new Promise(async (resolve, reject) => {
    let sql = "UPDATE Memorybook SET " +
        "isFavourite=" + db.escape(isFavourite) + ", " +
    "startDate=" + db.escape(startDate) +  ", " +
    "enddate=" + db.escape(endDate) +  ", " +
    "cover=" + db.escape(cover) +  " " +
    "WHERE memorybookId=" + db.escape(memorybookId);

    db.query(sql, function(err, element, fields) {
        if(err) {console.log(err); reject(err)}
        resolve(element);
    });
})


module.exports = {
    createEmptyElement,
    createEmptyMemorybook,
    createEmptyGroup,
    getMemorybook,
    getAllMemorybooks,
    getFavouriteMemorybooks,
    getNotFavouriteMemorybooks,
    getAllGroups,
    getAllImagesForSaveElement,
    insertImage,
    deleteImage,
    deleteMemorybook,
    deleteGroup,
    deleteSaveElement,
    updateSaveElement,
    updateMemorybook
}