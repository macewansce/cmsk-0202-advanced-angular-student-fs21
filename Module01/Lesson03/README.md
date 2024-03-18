# Module 01 - Lesson 03
 
## UNDERSTANDING OBSERVABLES AND USING SUBSCRIPTIONS
 
## Table of Contents
 
- [What are Observables?](#what-are-observables)
- [Create Your First Observable](#create-your-first-observable)
- [Subscribe to Your First Observable](#subscribe-to-your-first-observable)
- [Installation of Module 01 - Lesson 03](#installation-of-module-01---lesson-03)
 
## What are Observables?
 
As described by Krunal (2021, para. 4-8): 

```
Observables are just lazy collections of multiple values over time. You can think of lazy observables
as newsletters. For each subscriber, a new newsletter is created. The newsletters are then only sent
to those people and not to anyone else.

If you keep that subscription open for the newsletter, you will get the new one every once in a while.
In this example, the sender decides when you get new mail for the newsletter, but all you have to do
is wait until it comes straight into your inbox.

An Observable sets up an Observer and connects it to a “thing” we want to get values from. That
“thing” is called a producer and is a source of values, perhaps from the click or input event or
something more complex such as communication over HTTP.

In Angular, we generally use an Observable when we got the data from the server. So Async data is
a perfect example of using Observables in Angular.
```

Examples:
  - WeatherService.getCurrentTemperature(): Provides a new value of the current temperature every 10m.
  - TimeService.getCurrentTime(): Provides a new value of the current time every 1000ms.

## Create Your First Observable

Let's create a new **TimeService** by running the following:
```bash
PS C:\Repos\cmsk202\Module01\Lesson03> cd .\src\app\core\services\
PS C:\Repos\cmsk202\Module01\Lesson03\src\app\core\services> ng generate service Time
CREATE src/app/core/services/time.service.spec.ts (347 bytes)
CREATE src/app/core/services/time.service.ts (133 bytes)
```

The generated **TimeServie** should look like this.
So let's add a button to display/hide the **PersonComponent** template as follows: 
```TypeScript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimeService {

  constructor() { }
}
```

Our next step is to create our oberservable ***getCurrentTime()*** that publishes a new value of the current time every 1000ms.

After adding ***getCurrentTime()*** function, the **TimeServie** should like this:
```TypeScript
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
```

## Subscribe to Your First Observable

Now, let's to subscribe to ***getCurrentTime()*** and display the current time at bottom of the **PersonList** template.

First, let's inject the **TimeService** in to **PersonListComponent** like this:
```TypeScript
import { Component, OnInit } from '@angular/core';
import { PersonService } from '../core/services/person.service';
import { TimeService } from '../core/services/time.service';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit {

  persons: any;
  isDisplayPersonList: boolean = false;
  currentTime!: Date;

  constructor(private personService: PersonService, private timeService: TimeService) {

  }

  togglePersonList(): void {
    this.isDisplayPersonList = !this.isDisplayPersonList;
  }

  ngOnInit(): void {
    this.persons = this.personService.getPerson();
    this.timeService.getCurrentTime().subscribe(time => this.currentTime = time);
  }
}

```
Let's not forget to regsiter the **TimeService** as a provider in our **AppMoudle**.

The last step is to display the time at the bottom of the **PersonList** template as follows:
```html
<h1>Person List</h1>
<hr>
<button (click)="togglePersonList()">Display/Hide Person List</button>
<hr>
<ng-container *ngIf="isDisplayPersonList">
    <div class="col-md-4" *ngFor="let person of persons">
        <app-person [person]="person"></app-person>
    </div>
</ng-container>
<hr>
<span>Current Time: {{currentTime | date: 'fullTime'}}</span>
``` 

Now, let's start our application and oberve the current time chaning every 1000ms

## Installation of Module 01 - Lesson 03
 
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.0.3.
 
### Development Server
 
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
 
### Code Scaffolding
 
Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.
 
### Build
 
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.
 
### Running Unit Tests
 
Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
 
### Running End-to-End Tests
 
Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.
 
### Further Help
 
To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
 
