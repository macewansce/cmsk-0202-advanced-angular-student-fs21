# Module 02 - Lesson 03
 
## MORE ON REACTIVE FORMS
 
## Table of Contents
 
- [Implementing Reactive Forms](#implementing-reactive-frms)
- [Installation of Module 02 - Lesson 03](#installation-of-module-02---lesson-03)
 
 
## Implementing Reactive Forms
By now we know that the reactive forms are basically a model-driven approach to form implementation.
 
We are going to convert our **OrderSearchComponent** search form into a reactive form as an example.
 
First, let's review how the **OrderSearchComponent** looked like the last time we utilized it:
```TypeScript
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { GetOrdersByIdResponse, Order } from '../core/models/order.model';
import { OrderService } from '../core/services/order.service';
import { OrderComponent } from './order.component';
 
@Component({
  selector: 'app-order-search',
  templateUrl: './order-search.component.html',
  styleUrls: ['./order-search.component.css']
})
export class OrderSearchComponent implements OnInit {
 
  id = new FormControl('');
  @ViewChild(OrderComponent) child!: OrderComponent;
 
  constructor(private orderService: OrderService) { }
 
  ngOnInit(): void {
 
  }
 
  searchOrders(): void {
    this.orderService.getOrdersById(this.id.value)
      .subscribe(
        (data: GetOrdersByIdResponse) =>
          this.child.order = data.total == 1 ? data.results[0] : undefined as unknown as Order);
  }
 
}
```
 
In order to start using reactive forms, we need to inject the **FormBuilder** into the **OrderSearchComponent**, like this:
```TypeScript
constructor(private orderService: OrderService, private formBuilder: FormBuilder) { }
```
 
Next, we need to declare the new search form and build it using the **FormBuilder** as follows:
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
 
  searchOrders(id: number): void {
    this.orderService.getOrdersById(id)
      .subscribe(
        (data: GetOrdersByIdResponse) =>
          this.child.order = data.total == 1 ? data.results[0] : undefined as unknown as Order);
  }
```
Then, we need to use the new form in the **OrderSearchComponent** template as follows:
```Html
<p>Order Search Form</p>
<form [formGroup]="orderSearchForm" (ngSubmit)="searchOrders()">
    <div class="form-group">
        <label for="id">Id: </label>
        <input type="text" class="form-control" id="id" formControlName="id">
    </div>
    <br>
    <button class="btn btn-primary" type="submit">Search</button>
</form>
 
<hr>
<p>Order Search Results</p>
<app-order></app-order>
```
Now, let's run our application to make sure the order search still works after our change.
 
## Installation of Module 02 - Lesson 03
 
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
 
 
