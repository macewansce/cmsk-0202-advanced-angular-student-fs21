# Module 02 - Lesson 01

## PIPES
 
## Table of Contents
 
- [What are Angular Pipes Used For?](#what-are-angular-pipes-used-for)
- [How do we Use an Angular Pipe?](#how-do-we-use-an-angular-pipe)
- [Create your First Custom Angular Pipe](#create-your-first-custom-angular-pipe)
- [Installation of Module 02 - Lesson 01](#installation-of-module-02---lesson-01)
 
 
## What are Angular Pipes Used For?
"Angular pipes are used to transform data on a template without writing boilerplate code in a component. A pipe takes in data as input and transforms it to the desired output" (NgDevelop, n.d., para. 1-2).
 
Here are few examples:
- Formatting currency.
- Formatting dates.
- Formatting numbers like driver license numbers.
- Formatting percentages.
 
## How do we Use an Angular Pipe?
 
We have actually used pipes in one of the previous lessons to format the _current time_. We use the pipe operator '|' in the **PersonList** template as follows:
```Html
<span>Current Time: {{currentTime | date: 'fullTime'}}</span>
```
 
Let's try to use the _currency_ pipe to format the _freight currency_ value in the **OrderComponent** template. First, let's take a look at the template before making changes:
```Html
<h2>Order</h2>
 
<div class="card mb-3 bg-light">
    <div class="card-body">
        Id: {{order.id}} <br>
        Customer Id: {{order.customerId}} <br>
        Order Date: {{order.orderDate}} <br>
        Required Date: {{order.requiredDate}} <br>
        Ship Via: {{order.shipVia}} <br>
        Freight: {{order.freight}} <br>
        Ship Name: {{order.shipName}}  <br>
        Ship Address: {{order.shipAddress}} <br>
        Ship City {{order.shipCity}} <br>
        Ship Postal Code: {{order.shipPostalCode}} <br>
        Ship Country: {{order.shipCountry}} <br>
        <br>
    </div>
</div>
```
 
Now, let's format the freight value using the currency pipe as follows:
```Html
<h2>Order</h2>
 
<div class="card mb-3 bg-light">
    <div class="card-body">
        Id: {{order.id}} <br>
        Customer Id: {{order.customerId}} <br>
        Order Date: {{order.orderDate}} <br>
        Required Date: {{order.requiredDate}} <br>
        Ship Via: {{order.shipVia}} <br>
        Freight: {{order.freight | currency:'CAD'}} <br>
        Ship Name: {{order.shipName}}  <br>
        Ship Address: {{order.shipAddress}} <br>
        Ship City {{order.shipCity}} <br>
        Ship Postal Code: {{order.shipPostalCode}} <br>
        Ship Country: {{order.shipCountry}} <br>
        <br>
    </div>
</div>
```
 
Note how Freight 18.44 got transformed to CA$18.44 after running the application and navigating to the _Orders_ page.
 
## Create your First Custom Angular Pipe
 
Let's keep going with the **OrderComponent** template.

There is an issue we need to solve. Note how the _Order Date_ is formated: /Date(894412800000-0000)/
 
This is not a format the date pipe recognizes and an error will be thrown if we try. So, what do we do to resolve this issue? We create a custom date pipe to handle this /Date(894412800000-0000)/ date format.
 
First, let's generate the custom date pipe by running the following:
```Bash
PS C:\Repos\cmsk202\Module02\Lesson01> cd .\src\app\shared\
PS C:\Repos\cmsk202\Module02\Lesson01\src\app\shared> New-Item -Path 'pipes' -ItemType Directory
PS C:\Repos\cmsk202\Module02\Lesson01\src\app\shared> cd .\pipes\
PS C:\Repos\cmsk202\Module02\Lesson01\src\app\shared\pipes> ng generate pipe CustomDate
CREATE src/app/shared/pipes/custom-date.pipe.spec.ts (204 bytes)
CREATE src/app/shared/pipes/custom-date.pipe.ts (225 bytes)
UPDATE src/app/app.module.ts (1887 bytes)
```
 
This will generate the **CustomDatePipe** and update the **AppMoudule**. The **CustomDatePipe** looks like this:
```TypeScript
import { Pipe, PipeTransform } from '@angular/core';
 
@Pipe({
  name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {
 
  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }
 
}
```
 
Next, we need to convert our date that is formatted like '/Date(xxxxxxxxxxxxx)/' to a JSON date as follows:
```TypeScript
import { Pipe, PipeTransform } from '@angular/core';
 
@Pipe({
  name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {
 
  transform(value: any, ...args: any[]): Date {
    var customDate = new Date(value.match(/\d+/)[0] * 1);  
    return  customDate;
  }
 
}
```
 
Note how the non JSON date '/Date(894412800000-0000)/' transformed into a date format that we can actually understand 'Tue May 05 1998 18:00:00 GMT-0600 (Mountain Daylight Time)'
 
## Installation of Module 02 - Lesson 01
 
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.0.3.
 
### Development server
 
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
 
