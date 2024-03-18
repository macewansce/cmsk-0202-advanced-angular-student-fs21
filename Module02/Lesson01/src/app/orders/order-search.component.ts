import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { GetOrdersByIdResponse, Order, OrderResponse } from '../core/models/order.model';
import { OrderService } from '../core/services/order.service';

@Component({
  selector: 'app-order-search',
  templateUrl: './order-search.component.html',
  styleUrls: ['./order-search.component.css']
})
export class OrderSearchComponent implements OnInit {

  id = new FormControl('');

  orders: Order[] = [];

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {

  }

  searchOrders(): void {
    this.orderService.getOrdersById(this.id.value)
    .subscribe(
      (data: GetOrdersByIdResponse) => this.orders = data.results );
  }
   
}
