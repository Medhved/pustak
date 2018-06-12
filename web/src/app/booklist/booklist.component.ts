import { Component, OnInit } from '@angular/core';
import { BOOKS } from '../mock-books';
import { ArrayType } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-booklist',
  templateUrl: './booklist.component.html',
  styleUrls: ['./booklist.component.css']
})
export class BooklistComponent implements OnInit {
  books = BOOKS;
  subjects = this.getSubjects(this.books);
  courses = [];
  // courses = this.filterCourses(this.subject);

  getSubjects(books): Array<string> {
    const subjects = [];
    for (let i = 0; i < books.length; i++) {
      const el = books[i];
      if (!subjects.includes(el.subject)) {
        subjects.push(el.subject);
      }
    }
    return subjects;
  }

  filterCourses(subject: string): void {
    this.courses = [];
    for (let i = 0; i < this.books.length; i++) {
      const el = this.books[i];
      if (el.subject === subject) {
        if (!this.courses.includes(el.course_num + ': ' + el.course_desc)) {
          this.courses.push(el.course_num + ': ' + el.course_desc);
        }
      }
      // return;
    }


  }



  constructor() {}

  ngOnInit() {}


}
