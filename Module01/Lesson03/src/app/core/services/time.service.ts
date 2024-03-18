import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimeService {

  constructor() { }

  getCurrentTime(): Observable<Date> {

    return new Observable(
      observer => {
        setInterval(() =>
          observer.next(new Date()), 1000);
      }
    );
  }
}
