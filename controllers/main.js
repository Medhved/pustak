//controllers/main.js
const fs = require('fs');
var controller = {};

module.exports = (function () {
    return controller;
}());

controller.getBookList = function (request, h) {

    return new Promise(function (resolve, reject) {
        fs.readFile(__dirname + '/../rsrc/BookList.csv', 'utf8', (err, data) => {
            err ? reject(err) : resolve(
                data.split('\r\n')
            );
        });
    });
}

controller.getTest = function (request, h) {
    return ('Hello World Test!');
}
