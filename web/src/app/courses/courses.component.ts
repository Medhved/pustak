import { Component, OnInit } from '@angular/core';
import { CoursesService } from './../courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  subjects;
  courses;
  bookList = [];
  courseListBySubj = {};

  constructor(private courseService: CoursesService) { }

  ngOnInit() {
    this.courseService.getSubjects().subscribe((data: any) => {this.subjects = data; });
    this.courseService.getCourses().subscribe((data: any) => { this.courses = data; });
    this.courseService.getBooks(106).subscribe((data: any) => { this.bookList = data; });
  }

  getCourseList = (subj) => {
    // Check to see whether subject and its courses already exist in courseListBySubj
    if (!this.courseListBySubj[subj]) {
      const filteredList = [];
      this.courses.forEach(el => {
        if (el.subject_name === subj) {
          const filteredListItem = {};
          filteredListItem['course_num'] = el.course_num;
          filteredListItem['course_desc'] = el.course_desc;
          filteredList.push(filteredListItem);
        }
      });
      this.courseListBySubj[subj] = filteredList;
    }
  }

  getBookList = (courseNum) => {
    console.log(courseNum);
    this.courseService.getBooks(courseNum).subscribe((data: any) => {
      console.log(data);
      this.bookList = data;
    });
  }

}
