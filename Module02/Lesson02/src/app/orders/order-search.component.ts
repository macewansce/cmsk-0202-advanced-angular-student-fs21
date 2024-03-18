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
