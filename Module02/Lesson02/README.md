# Module 02 - Lesson 02
 
## MORE ON COMPONENT INTERACTION
 
## Table of Contents
 
- [When to use @ChildView](#when-to-use-childview)
- [Installation of Module 02 - Lesson 02](#installation-of-module-02---lesson-02)
 
 
## When to use @ChildView
Due to the fact that component classes are not connected together, the parent components will not have access to the child component functions and properties.
 
One way to go around this is that by using the ***@ChildView*** decorator, we are able to inject child components into its component.
 
We are going to modify **OrderSearchComponent** and its template as an example on how to ***@ChildView***.
 
First, let's take a look at what the **OrderSearchComponent** template looked like the last time we utilized it:
```Html
<p>Order Search Form</p>
<label for="id">Id: </label>
<input id="id" type="text" [formControl]="id">
<button (click)="searchOrders()">Search</button>
<hr>
<p>Order Search Results</p>
<app-order [order]="order"></app-order>
```
 
Note how we are passing the order search result to the child **OrderComponent** using the selector tag. Let's not pass the order using the selector tag:
```Html
<p>Order Search Form</p>
<label for="id">Id: </label>
<input id="id" type="text" [formControl]="id">
<button (click)="searchOrders()">Search</button>
<hr>
<p>Order Search Results</p>
<app-order></app-order>
```
So, how are we going to pass the order to **OrderComponent**? We are going to do it by using the ***@ChildView*** in the **OrderSearchComponent** as follows:
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
 
Now, let's run our application to make sure the order search still works after our change.
 
## Installation of Module 02 - Lesson 02
 
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

