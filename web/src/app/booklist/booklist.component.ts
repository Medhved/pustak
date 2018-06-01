import { Component, OnInit } from '@angular/core';
import { Book } from '../book';

@Component({
  selector: 'app-booklist',
  templateUrl: './booklist.component.html',
  styleUrls: ['./booklist.component.css']
})
export class BooklistComponent implements OnInit {

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
