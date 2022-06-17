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

    let sql = "INSERT INTO Memorybook(memorybookId, isFavourite, startDate, endDate, cover, creator, creationDate) values (" +
        db.escape(bookId) + ", " +
        db.escape(false) + ", " +
        db.escape(today) + ", " +
        db.escape(null) + ", " +
        db.escape("http://localhost:4000/uploads/placeholder.png") + ", " +
        db.escape(userId) + ", " +
        db.escape(today) +
    ")";

    db.query(sql, function(err, memorybook, fields) {
        if(err) {console.log(err); reject(err)}
        resolve(memorybook);
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

module.exports = {
    createEmptyElement,
    createEmptyMemorybook,
    createEmptyGroup
}