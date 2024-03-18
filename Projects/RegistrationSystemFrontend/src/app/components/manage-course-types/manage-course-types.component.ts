import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseType } from '../../models/course-type.model';
import { CourseTypeService } from '../../services/course-type.service';

@Component({
  selector: 'app-manage-course-types',
  templateUrl: './manage-course-types.component.html',
  styleUrls: ['./manage-course-types.component.css']
})
export class ManageCourseTypesComponent implements OnInit {
  courseType: CourseType = {} as CourseType;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseTypeService: CourseTypeService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params  => {
      const id = params.get('id');
      console.log("id = "+id)
      if (id) {
        this.courseTypeService.getCourseTypes().subscribe(data => {
          this.courseType = data.find(c => c.courseTypeId.toString() === id)!;
        });
      }
    });
  }

  saveCourseType() {
    if (this.courseType.courseTypeId) {
      this.courseTypeService.updateCourseType(this.courseType).subscribe(() => {
        this.router.navigate(['/course-types']);
      });
    } else {
      this.courseTypeService.addCourseType(this.courseType).subscribe(() => {
        this.router.navigate(['/course-types']);
      });
    }
  }
}
