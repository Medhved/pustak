//controllers/course.js

var sql3 = require('sqlite3').verbose();
var db = new sql3.Database('pusztak.db');
var controller = {};

module.exports = (function () {
    return controller;
}());

controller.getCourses = function(request, h) {

    return new Promise(function (resolve, reject) {
        db.all(`SELECT S.subject_name, C.course_num, C.course_desc FROM subjects S, courses C
                WHERE S.id = C.subject_id`, function (err, data) {
            if(err) reject(err);
            resolve(data);
        })
        
    })

}

controller.getCourseBooks = function (request, h) {
    console.log(request.params.course_num);
    return new Promise(function(resolve, reject){
        db.all(`
            SELECT B.*, BC.used_ok, BC.ebook_ok
            FROM books2courses BC
            INNER JOIN courses C ON BC.course_id = C.id
            INNER JOIN books B ON BC.book_id = B.isbn
            WHERE C.course_num = $course_id;
        `, { $course_id: request.params.course_num},
        function(err,data){
            if(err) reject(err);
            resolve(data);
        })
    })
}