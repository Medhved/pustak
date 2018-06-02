// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';

// @NgModule({
//   imports: [
//     CommonModule
//   ],
//   declarations: []
// })
// export class MaterialModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatMenuModule,
  MatCardModule,
  MatIconModule,
  MatToolbarModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatSlideToggleModule,
  MatRippleModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatGridListModule
} from '@angular/material';

import { PlatformModule } from '@angular/cdk/platform';
import { ObserversModule } from '@angular/cdk/observers';

@NgModule({
  imports: [
    MatMenuModule,
    MatGridListModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatRippleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    PlatformModule,
    ObserversModule
  ],
  exports: [
    MatMenuModule,
    MatGridListModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatRippleModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  declarations: []
})
export class MaterialModule { }
