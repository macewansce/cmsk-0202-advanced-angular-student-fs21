import { Component, OnInit } from '@angular/core';
import { GetOrdersResponse, OrderResponse} from '../core/models/order.model';
import { OrderService } from '../core/services/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  orders: OrderResponse[] = [];
  
  constructor(private orderService: OrderService) {
    
  }

  ngOnInit(): void {
    this.orderService.getOrders()
    .subscribe(
      (data: GetOrdersResponse) => this.orders = data.results );
  }
}
