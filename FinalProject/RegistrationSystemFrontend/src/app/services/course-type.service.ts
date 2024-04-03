import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { MessageService } from './message.service';
import { CourseType } from '../models/course-type.model';

@Injectable({
  providedIn: 'root'
})
export class CourseTypeService {
  private apiUrl = 'https://localhost:7247/coursetypes'; // replace with your actual API endpoint

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  getCourseTypes(): Observable<CourseType[]> {
    return this.http.get<CourseType[]>(this.apiUrl)
      .pipe(
        tap(_ => this.log('fetched coursetypes')),
        catchError(this.handleError)
      );
  }

  getCourseType(id: number): Observable<CourseType> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<CourseType>(url)
      .pipe(
        tap(_ => this.log(`fetched coursetype id=${id}`)),
        catchError(this.handleError)
      );
  }

  addCourseType(coursetype: CourseType): Observable<CourseType> {
    return this.http.post<CourseType>(this.apiUrl, JSON.stringify(coursetype), this.httpOptions)
      .pipe(
        tap(_ => this.log('added coursetype')),
        catchError(this.handleError)
      );
  }

  updateCourseType(coursetype: CourseType): Observable<any> {
    const url = `${this.apiUrl}/${coursetype.courseTypeId}`;
    return this.http.put(url, JSON.stringify(coursetype), this.httpOptions)
      .pipe(
        tap(_ => this.log(`updated coursetype id=${coursetype.courseTypeId}`)),
        catchError(this.handleError)
      );
  }

  deleteCourseType(id: number): Observable<CourseType> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<CourseType>(url, this.httpOptions)
      .pipe(
        tap(_ => this.log(`deleted coursetype id=${id}`)),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    this.log(`An error occurred: ${error.message}`);
    alert(`An error occurred: ${error.message}`);
    return EMPTY;
  }

  private log(message: string): void {
    this.messageService.add(`CourseTypeService: ${message}`);
  }
}
