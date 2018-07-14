import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { faMinusSquare } from '@fortawesome/free-solid-svg-icons';

import { HttpClientModule } from '@angular/common/http';
import { BooklistComponent } from './booklist/booklist.component';

import { MaterialModule } from './material.module';
import { CoursesComponent } from './courses/courses.component';

library.add(faCheckSquare, faMinusSquare);

@NgModule({
  declarations: [
    AppComponent,
    BooklistComponent,
    CoursesComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
