import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

const API_URL = environment.urlApi;

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  constructor(private http: HttpClient) {}

  getSubjects() {
    return this.http.get(`${API_URL}/subjects`);
  }

  getCourses() {
    return this.http.get(`${API_URL}/courses`);
  }

  getBooks(courseId) {
    return this.http.get(`${API_URL}/course/${courseId}`);
  }

}
