import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { MessageComponent } from './components/message/message.component';
import { HttpClientModule } from '@angular/common/http';
import { ViewCourseTypesComponent } from './components/view-course-types/view-course-types.component';
import { ManageCourseTypesComponent } from './components/manage-course-types/manage-course-types.component';

@NgModule({
  declarations: [
    AppComponent,
    ViewCourseTypesComponent,
    ManageCourseTypesComponent,
    MessageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
