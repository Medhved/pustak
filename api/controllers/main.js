//controllers/main.js
const Config = require('config');
const fs = require('fs');
var sql3 = require('sqlite3').verbose();
var db = new sql3.Database('pusztak.db');
const axios = require('axios');
var controller = {};


module.exports = (function () {
    return controller;
}());

controller.importBookDetails = function(request, h) {
    return new Promise(function(resolve, reject){
        db.all('SELECT isbn FROM books WHERE title IS null LIMIT 50', async function (err, data) {
            if (err) {
                reject(err);
            }
            console.log(data);
            resolve(getDetails(data));
        });
    });
}

async function getDetails(data){
    let bookDetails = [];
    for(let el of data){
        let url = `${Config.get('google.base_url')}q=isbn:${el.isbn}&key=${Config.get('google.books_key')}`;
        url += `&fields=items(id,volumeInfo(title,authors,publisher,publishedDate,description,pageCount,imageLinks/thumbnail),searchInfo/textSnippet)`;
        try {
            await axios.get(url).then(function(response){
                if(response.data.items){
                    addBookDetails2Db(el.isbn, response.data.items[0]);
                    bookDetails.push(response.data.items[0]);
                }
            })
        } catch (err) {
            console.log(err);
        }
    }
    return bookDetails;
}

function addBookDetails2Db(isbn_num, details){
    // Author related info
    let dbAuthorStr = '';
    const combineAuthors = (authString, currVal) => authString + '; ' + currVal;
    if(details.volumeInfo.authors){
        dbAuthorStr = details.volumeInfo.authors.reduce(combineAuthors);
        console.log(dbAuthorStr);
    }

    let cover_url = '';
    if (details.volumeInfo.imageLinks.thumbnail){
        cover_url = details.volumeInfo.imageLinks.thumbnail;
    } else cover_url = null;

    // text snippet
    let textSnip = '';
    if(details.searchInfo){ textSnip = details.searchInfo.textSnippet; };
    

    db.run(`UPDATE books 
            SET google_books_id = $id, title = $title, author = $author, cover = $cover, description = $description, num_pages = $num_pages, publisher = $publisher, publish_date = $publish_date, text_snippet = $text_snippet
            WHERE isbn = ${isbn_num} `, {
                $id: details.id,
                $title: details.volumeInfo.title,
                $author: dbAuthorStr,
                $cover: details.volumeInfo.imageLinks.thumbnail, 
                $description: details.volumeInfo.description, 
                $num_pages: details.volumeInfo.pageCount, 
                $publisher: details.volumeInfo.publisher, 
                $publish_date: details.volumeInfo.publishedDate, 
                $text_snippet: textSnip
            }
        )
        return;
}

controller.importBookList = function (request, h) {

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
 