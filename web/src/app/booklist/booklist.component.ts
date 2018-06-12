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

  constructor() {}

  ngOnInit() {}


}
