//controllers/main.js
const fs = require('fs');
var controller = {};

module.exports = (function () {
    return controller;
}());

controller.getBookList = function (request, h) {

    return new Promise(function (resolve, reject) {
        fs.readFile(__dirname + '/../rsrc/BookList.csv', 'utf8', (err, data) => {
            if(err) reject(err);

            let arrData = data.split('\r\n');
            let arrBookList = [];

            let headers = arrData[0].split(',');

            for(let i=1; i<arrData.length; i++) {
                let objBook = {};
                let bookData = arrData[i].split(',');

                for(let j=0; j<headers.length; j++) {
                    objBook[headers[j]] = bookData[j];
                }
                    arrBookList.push(objBook);
            }

            resolve(JSON.stringify(arrBookList));
            
        });
    });
}

controller.getTest = function (request, h) {
    return ('Hello World Test!');
}
