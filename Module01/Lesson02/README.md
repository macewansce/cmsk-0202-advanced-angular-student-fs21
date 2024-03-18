# Module 01 - Lesson 02
 
## COMPONENT LIFECYCLE
 
## Table of Contents
 
- [What is a Component Lifecycle?](#what-is-a-component-lifecycle)
- [What is a Directive Lifecycle?](#what-is-a-directive-lifecycle)
- [Using Lifecycle Hooks](#using-lifecycle-hooks)
- [Order of Lifecycle Events](#order-of-lifecycle-events)
- [Installation of Module 01 - Lesson 02](#installation-of-module-01---lesson-02)
 
## What is a Component Lifecycle?
 
Any Angular component has a lifecycle, from initialization to destruction.
 
## What is a Directive Lifecycle?
 
The same as a component lifecycle.
 
## Using Lifecycle Hooks
 
Here are some of the most-commonly used lifecycle hooks:
 
  - OnChanges
  - OnInit
  - DoCheck
  - AfterContentInit
  - AfterContentChecked
  - AfterViewInit
  - AfterViewChecked
  - OnDestroy
 
Let's start with the **PersonList** template:
```html
<h1>Person List</h1>
<hr>
<div class="col-md-4" *ngFor="let person of persons">
    <app-person [person]="person"></app-person>
</div>
```
In order to see how these lifecycle events are firing, we need to display/hide the **PersonComponent**.
 
So, let's add a button to display/hide the **PersonComponent** template as follows:
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
```
Note: This is a logical container that doesn't affect the DOM provided by Angular.
 
Note that the button calls method ***togglePersonList()*** on click. We want the method we toggle the boolean ***isDisplayPersonList*** from false to true and from true to false and the boolean in ***ngIf** directive to evaluate whether to display the list or hide it. So, let's go add the method to the **PersonListComponent** as follows:
```TypeScript
import { Component, OnInit } from '@angular/core';
import { PersonService } from '../core/services/person.service';
 
@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit {
 
  persons: any;
  isDisplayPersonList: boolean = false;
 
  constructor(private personService: PersonService) {
 
  }
 
  togglePersonList(): void {
    this.isDisplayPersonList = !this.isDisplayPersonList;
  }
 
  ngOnInit(): void {
    this.persons = this.personService.getPerson();
  }
}
```
 
Now, before we proceed any further, let's test our button and make sure it is working.
 
The next step is to use the lifecycle hooks above in the **PersonComponent**. We don't need to do anything fancy, so we will just output log statements to the browser console as follows:
```TypeScript
import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit } from '@angular/core';
import { Component, DoCheck, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
 
@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements
  OnChanges,
  OnInit,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy {
 
  @Input() person: any;
 
  constructor() {
    console.log("PersonComponent: Constructor");
  }
 
  ngOnChanges() {
    console.log("PersonComponent: OnChanges");
  }
 
  ngOnInit() {
    console.log("PersonComponent: OnInit");
  }
 
  ngDoCheck() {
    console.log("PersonComponent: DoCheck");
  }
 
  ngAfterContentInit() {
    console.log("PersonComponent: AfterContentInit");
  }
 
  ngAfterContentChecked() {
    console.log("PersonComponent: AfterContentChecked");
  }
 
  ngAfterViewInit() {
    console.log("PersonComponent: AfterViewInit");
  }
 
  ngAfterViewChecked() {
    console.log("PersonComponent: AfterViewChecked");
  }
 
  ngOnDestroy() {
    console.log("AppComponent: OnDestroy");
  }
 
}
```
 
## Order of Lifecycle Events
 
Now, let's start our application and open up the browser console.
 
What lifecycle events fire when displaying the Person List?
  - PersonComponent: Constructor
  - PersonComponent: OnChanges
  - PersonComponent: OnInit
  - PersonComponent: DoCheck
  - PersonComponent: AfterContentInit
  - PersonComponent: AfterContentChecked
  - PersonComponent: AfterViewInit
  - PersonComponent: AfterViewChecked
 
What lifecycle events fire when hiding the Person List?
  - AppComponent: OnDestroy
 
## Installation of Module 01 - Lesson 02
 
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
 
