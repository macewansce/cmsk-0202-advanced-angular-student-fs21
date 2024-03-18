import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GetOrdersByIdResponse, Order } from '../core/models/order.model';
import { OrderService } from '../core/services/order.service';
import { invalidOrderIdValidator } from '../shared/validators/order.validator';
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
      id: ['', [Validators.required, invalidOrderIdValidator]],
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
