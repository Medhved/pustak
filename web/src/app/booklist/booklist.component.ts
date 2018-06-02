import { Component, OnInit } from '@angular/core';
import { Book } from '../book';
import { BOOKS } from '../mock-books';

@Component({
  selector: 'app-booklist',
  templateUrl: './booklist.component.html',
  styleUrls: ['./booklist.component.css']
})
export class BooklistComponent implements OnInit {

  books = BOOKS;

  book: Book = {
    subject: 'History',
    course_num: '203',
    course_desc: 'United States History',
    isbn: '9780393930276',
    used: true,
    eBook: false
  };
  // book = 'History,203,United States History,9780393930276,TRUE,FALSE';

  constructor() {}

  ngOnInit() {}
}
