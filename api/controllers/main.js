//controllers/main.js
const fs = require('fs');
var sql3 = require('sqlite3').verbose();
var db = new sql3.Database('pusztak.db');
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

            addSubjects2Db(arrBookList);
            addCourses2Db(arrBookList);
            addBooks2Db(arrBookList);

            resolve(JSON.stringify(arrBookList));
            
        });
    });
}

controller.getTest = function (request, h) {
    return ('Hello World Test!');
}

function addSubjects2Db(arrBookList) {
    // console.log(arrBookList.length);
    for (let el of arrBookList) {
        db.run(`INSERT INTO subjects(school_id,subject_name) 
                SELECT 1, $subject 
                WHERE NOT EXISTS (SELECT 1 FROM subjects WHERE school_id = 1 AND subject_name = $subject)`, {$subject: el.subject});
    }
    return;
}

function addCourses2Db(arrBookList) {
    for (let el of arrBookList) {
        db.get(`SELECT id FROM subjects WHERE subject_name = $subject`, {
            $subject: el.subject
        }, function(err, data){
            if(err) console.log(err);   
            // console.log(row_id)
            addCourseData2Db(data.id, el);
        })
    }
    return;
}

function addCourseData2Db(subj_id, el) {
    // console.log(subj_id);
    db.run(`
        INSERT INTO courses(subject_id, course_num, course_desc)
        SELECT $subject_id, $course_num, $course_desc
        WHERE NOT EXISTS (SELECT 1 FROM courses WHERE (subject_id = $subject_id AND course_num = $course_num AND course_desc = $course_desc)
        )`, {
            $subject_id: subj_id,
            $course_num: el.course_num,
            $course_desc: el.course_desc
        }
    );
    return;
}

function addBooks2Db(arrBookList){
    for(let el of arrBookList) {
        // Get Book Info
        db.get(`INSERT INTO books(isbn) 
            SELECT $isbn
            WHERE NOT EXISTS (SELECT 1 FROM books WHERE isbn = $isbn)`,{$isbn: el.isbn}
        );
        db.get(`SELECT id FROM courses WHERE course_num = $course_num`, {
            $course_num: el.course_num
        }, function(err, data){
            if(err) console.log(err);
            // console.log(data);
            db.get(`INSERT INTO books2courses(course_id, book_id, used_ok, ebook_ok) 
                SELECT $course_id, $book_id, $used_ok, $ebook_ok
                WHERE NOT EXISTS (
                    SELECT 1 FROM books2courses 
                    WHERE (course_id = $course_id AND book_id = $book_id AND used_ok = $used_ok AND ebook_ok = $ebook_ok)
                )`, {
                    $course_id: data.id,
                    $book_id: el.isbn,
                    $used_ok: el.used,
                    $ebook_ok: el.eBook
                })
        });
    }
    return;
}
 