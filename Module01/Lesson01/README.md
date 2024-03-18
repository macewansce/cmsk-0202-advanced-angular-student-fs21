# Module 01 - Lesson 01
 
## ANGULAR DIRECTIVES
 
## Table of Contents
 
- [What are Angular Directives?](#what-are-angular-directives)
- [Creating Your First Angular Directive](#creating-your-first-angular-directive)
- [Installation of Module 01 - Lesson 01](#installation-of-module-01---lesson-01)
 
## What are Angular Directives?
 
We have already learned that directives are simply classes that change the behavior of different Angular application elements.
 
And, we have actually already used some of them in the past! If you recall, we used ***ngFor** to iterate through a persons list as follows:
 
```html
<h1>Person List</h1>
<hr>
<div class="col-md-4" *ngFor="let person of persons">
    <app-person [person]="person"></app-person>
</div>
```
***ngFor** is one of Angular's many built-in directives. It allows us to add an iterative behavior to our html elements.
 
 
## Creating Your First Angular Directive
 
Let's create a directive to change the background color of the _Full Name_ field to red. Let's call our directive **RedFlag**
 
_Note:_ We are starting with an angular application that displays a list of Persons.
 
First, let's run the following:
```Bash
PS C:\Repos\cmsk202\Module01\Lesson01> cd .\src\app\
PS C:\Repos\cmsk202\Module01\Lesson01\src\app> New-Item -Path 'shared' -ItemType Directory
PS C:\Repos\cmsk202\Module01\Lesson01\src\app> cd .\shared\
PS C:\Repos\cmsk202\Module01\Lesson01\src\app\shared> New-Item -Path 'directives' -ItemType Directory
PS C:\Repos\cmsk202\Module01\Lesson01\src\app\shared> cd .\directives\
PS C:\Repos\cmsk202\Module01\Lesson01\src\app\shared\directives> ng generate directive RedFlag
CREATE src/app/shared/directives/red-flag.directive.spec.ts (229 bytes)
CREATE src/app/shared/directives/red-flag.directive.ts (143 bytes)
UPDATE src/app/app.module.ts (924 bytes)
```
 
You will note that two files were created: ***red-flag.directive.spec.ts*** and ***red-flag.directive.ts***. You should also note that the new directive got Registered in the **AppleModule**
 
There's multiple aspects that go into making this work, but frameworks like Angular have abstracted a lot of that away and made it very simple.
 
So, let's now take a look at the new **RedFlagDirective**:
```TypeScript
import { Directive } from '@angular/core';
 
@Directive({
  selector: '[appRedFlag]'
})
export class RedFlagDirective {
 
  constructor() { }
 
}
```
 
Now, let's import **ElementRef** as follows:
```TypeScript
import { Directive, ElementRef } from '@angular/core';
 
@Directive({
  selector: '[appRedFlag]'
})
export class RedFlagDirective {
 
  constructor(private elRef: ElementRef) { }
 
}
```
 
**ElementRef** gives the ability to access DOM native elements like ***backgroundColor***, which is exactly what we need to change the _Person Full Name_ background to red as follows:
```TypeScript
import { Directive, ElementRef } from '@angular/core';
 
@Directive({
  selector: '[appRedFlag]'
})
export class RedFlagDirective {
 
  constructor(private elRef: ElementRef) {
    this.elRef.nativeElement.style.backgroundColor = 'red';
   }
 
}
```
 
Now, we are ready to use the new directive that we have just created. However, before we do that, let's first take a look at what the **PersonComponent** template looks like:
```Html
<h2>Person</h2>
 
<div class="card mb-3 bg-light">
    <div class="card-body">
        <span>{{person.firstName}} {{person.lastName}}</span><br>
        <span>{{person.address}}</span> <br>
        <span>{{person.city}}, {{person.province}}</span> <br>
        <span>{{person.phone}}</span> <br>
        <br>
    </div>
    <div class="card-footer">
        <small class="text-muted">
            {{person.lastUpdated}}
        </small>
    </div>
</div>
```
To apply our **RedFlagDirective**, we will use the selector ***appRedFlag***:
```TypeScript
@Directive({
  selector: '[appRedFlag]'
})
```
 
As follows:
```Html
<h2>Person</h2>
 
<div class="card mb-3 bg-light">
    <div class="card-body">
        <span appRedFlag >{{person.firstName}} {{person.lastName}}</span><br>
        <span>{{person.address}}</span> <br>
        <span>{{person.city}}, {{person.province}}</span> <br>
        <span>{{person.phone}}</span> <br>
        <br>
    </div>
    <div class="card-footer">
        <small class="text-muted">
            {{person.lastUpdated}}
        </small>
    </div>
</div>
```
 
## Installation of Module 01 - Lesson 01
 
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
 
 
 
 
 
 


