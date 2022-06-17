const db = require("../services/database").config;
const bcrypt = require("bcrypt");

let createEmptyElement = () => new Promise(async (resolve, reject) => {

    let sql = "INSERT INTO SaveElement(title, description) values ('','')";

    db.query(sql, function(err, element, fields) {
        if(err) {console.log(err); reject(err)}
        console.log(element.insertId);
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

let createEmptyGroup = (groupId, bookId, userId) => new Promise(async (resolve, reject) => {

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
        "WHERE Memorybook.memorybookId=SaveElement.elementId AND + "+
        "OwnsBook.memorybookId=Memorybook.memorybookId AND " +
        "OwnsBook.userId=" + userId + " AND " +
        "Memorybook.memorybookId=" + bookId;

    db.query(sql, function(err, memorybook, fields) {
        if(err) {console.log(err); reject(err)}
        resolve(memorybook[0]);
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

let getAllGroups = (bookId) => new Promise(async (resolve, reject) => {

    let sql = "SELECT * from Grouping JOIN SaveElement" +
        "WHERE Grouping.groupId=SaveElement.elementId AND + "+
        "Grouping.memorybookId=" + bookId;

    db.query(sql, function(err, memorybook, fields) {
        if(err) {console.log(err); reject(err)}
        resolve(memorybook[0]);
    });
});


module.exports = {
    createEmptyElement,
    createEmptyMemorybook,
    createEmptyGroup,
    getMemorybook,
    getAllMemorybooks,
    getAllGroups
}