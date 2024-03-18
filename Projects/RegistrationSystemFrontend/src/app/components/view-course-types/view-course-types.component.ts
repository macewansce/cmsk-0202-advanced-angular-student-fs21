import { Component, OnInit } from '@angular/core';
import { CourseType } from '../../models/course-type.model';
import { CourseTypeService } from '../../services/course-type.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-course-types',
  templateUrl: './view-course-types.component.html',
  styleUrls: ['./view-course-types.component.css'],
})
export class ViewCourseTypesComponent implements OnInit {
  courseTypes: CourseType[] = [];

  constructor(
    private courseTypeService: CourseTypeService
  ) {}

  ngOnInit(): void {
    this.getCourseTypes();
  }

  private getCourseTypes() {
    this.courseTypeService.getCourseTypes().subscribe((data) => {
      this.courseTypes = data;
    });
  }

  deleteCourseType(courseTypeId: number) {
    if (confirm('Are you sure you want to delete this course type?')) {
      this.courseTypeService.deleteCourseType(courseTypeId).subscribe(() => {
        this.getCourseTypes();
      });
    }
  }
}
