import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewCourseTypesComponent } from './components/view-course-types/view-course-types.component';
import { ManageCourseTypesComponent } from './components/manage-course-types/manage-course-types.component';

const routes: Routes = [
  { path: 'course-types', component: ViewCourseTypesComponent },
  { path: 'manage-course-type', component: ManageCourseTypesComponent },
  { path: 'manage-course-type/:id', component: ManageCourseTypesComponent },
  { path: '**', redirectTo: 'course-types', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
