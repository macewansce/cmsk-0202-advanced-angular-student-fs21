# Module 02 - Lesson 04
 
## PERFORMING FORM VALIDATION
 
## Table of Contents
 
- [Why do we Need Form Validation?](#why-do-we-need-form-validation)
- [Validating Input in Reactive Forms](#validating-input-in-reactive-forms)
- [Using Built-in Validators](#using-built-in-validators)
- [Creating a Custom Validator](#creating-a-custom-validator)
- [Installation of Module 02 - Lesson 04](#installation-of-module-02---lesson-04)
 
## Why do We Need Form Validation?
We need form validation to improve overall data quality by validating user input for accuracy and completeness and displaying useful validation messages (Angular, n.d.-g).
 
## Validating Input in Reactive Forms
"In a reactive form, the source of truth is the component class. Instead of adding validators through attributes in the template, you add validator functions directly to the form control model in the component class. Angular then calls these functions whenever the value of the control changes" (Angular, n.d.-g, para. 1).
 
## Using Built-in Validators
So, let's start with the latest **OrderSearchComponent** that we have created. It should look like this:
```TypeScript
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { GetOrdersByIdResponse, Order } from '../core/models/order.model';
import { OrderService } from '../core/services/order.service';
import { OrderComponent } from './order.component';
 
@Component({
  selector: 'app-order-search',
  templateUrl: './order-search.component.html',
  styleUrls: ['./order-search.component.css']
})
export class OrderSearchComponent implements OnInit {
 
  @ViewChild(OrderComponent) child!: OrderComponent;
  orderSearchForm!: FormGroup;
 
  constructor(private orderService: OrderService, private formBuilder: FormBuilder) { }
 
  ngOnInit(): void {
    this.orderSearchForm = this.formBuilder.group({
      id: [''],
    });
  }
 
  searchOrders(): void {
    this.orderService.getOrdersById(this.orderSearchForm.get('id')?.value)
      .subscribe(
        (data: GetOrdersByIdResponse) =>
          this.child.order = data.total == 1 ? data.results[0] : undefined as unknown as Order);
  }
 
}
```
 
Let's say that we need to validate that the 'Id' field has a value because it is required for the search. We can easily define this required validation when we build the form as follows:
```TypeScript
  ngOnInit(): void {
    this.orderSearchForm = this.formBuilder.group({
      id: ['', Validators.required],
    });
  }
```
 
We are not yet done with the **OrderSearchComponent**. We need to modify the ***SearchOrder()*** method to prevent the form from being submitted when it is invalid.
```TypeScript
import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GetOrdersByIdResponse, Order } from '../core/models/order.model';
import { OrderService } from '../core/services/order.service';
import { OrderComponent } from './order.component';
 
@Component({
  selector: 'app-order-search',
  templateUrl: './order-search.component.html',
  styleUrls: ['./order-search.component.css']
})
export class OrderSearchComponent implements OnInit {
 
  @ViewChild(OrderComponent) child!: OrderComponent;
  orderSearchForm!: FormGroup;
 
  constructor(private orderService: OrderService, private formBuilder: FormBuilder) { }
 
  ngOnInit(): void {
    this.orderSearchForm = this.formBuilder.group({
      id: ['', Validators.required],
    });
  }
 
  searchOrders(): void {
    if (this.orderSearchForm.invalid) {
      return;
    }
   
    this.orderService.getOrdersById(this.orderSearchForm.get('id')?.value)
      .subscribe(
        (data: GetOrdersByIdResponse) =>
          this.child.order = data.total == 1 ? data.results[0] : undefined as unknown as Order);
  }
 
  get f(): { [key: string]: AbstractControl } {
    return this.orderSearchForm.controls;
  }
 
}
```
 
Wait, we are still not done yet! We now need to display an error message indicating that the 'Id' field is required, otherwise no one would know what the issue is. To do that, we need to change the **OrderSearchComponent** template as follows:
```Html
<p>Order Search Form</p>
<form [formGroup]="orderSearchForm" (ngSubmit)="searchOrders()">
    <div class="form-group">
        <label for="id">Id: </label>
        <input type="text" class="form-control" id="id" formControlName="id"
            [ngClass]="{ 'is-invalid': f['id'].errors }">
        <div *ngIf="f['id'].errors" class="invalid">
            <div *ngIf="f['id'].errors['required']">Id is required</div>
        </div>
    </div>
    <br>
    <button class="btn btn-primary" type="submit">Search</button>
</form>
 
<hr>
<p>Order Search Results</p>
<app-order></app-order>
```
 
## Creating a Custom Validator
 
We continue with **OrderSearchComponent** form validation. Let's assume that a valid Order Id must have the following parameters:
  * Cannot be less than 1
  * Cannot be greater than 99999
 
This could easily be achieved by using multiple built-in validators. However, for the purposes of this lesson, we are going to create a custom validator.
 
First, let's add a ***order.validator.ts*** file to a shared validators folder.
 
Then, we code our function as follows:
```TypeScript
import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
 
export function invalidOrderIdValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const valid = control.value >= -1 && control.value <= 99999;
    return !valid ? {invalidOrderId: {value: control.value}} : null;
  };
}
 
```
 
All what we are doing is returning ***invalidOrderId*** when the Order Id is not valid (otherwise we return _null_).
 
The rest of the steps are identical to the built-in validators. So, let's define our validator when we build the form as follows:
```TypeScript
ngOnInit(): void {
    this.orderSearchForm = this.formBuilder.group({
      id: ['', [Validators.required, invalidOrderIdValidator]],
    });
  }
```
 
Next, we need to use the new form in the **OrderSearchComponent** template as follows:
```Html
<p>Order Search Form</p>
<form [formGroup]="orderSearchForm" (ngSubmit)="searchOrders()">
    <div class="form-group">
        <label for="id">Id: </label>
        <input type="text" class="form-control" id="id" formControlName="id"
            [ngClass]="{ 'is-invalid': f['id'].errors }">
        <div *ngIf="f['id'].errors" class="invalid">
            <div *ngIf="f['id'].errors['required']">Id is required</div>
        </div>
        <div *ngIf="f['id'].errors" class="invalid">
            <div *ngIf="f['id'].errors['invalidOrderId']">Id must not be less than 1 nor greater than 99999</div>
        </div>
    </div>
    <br>
    <button class="btn btn-primary" type="submit">Search</button>
</form>
 
<hr>
<p>Order Search Results</p>
<app-order></app-order>
```
Now, let's run our application to make sure the order search still works after our change.
 
## Installation of Module 02 - Lesson 04
 
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
 
