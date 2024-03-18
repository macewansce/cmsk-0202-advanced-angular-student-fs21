import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../core/services/customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  customers: any;
  
  constructor(private customeService: CustomerService) {
    
  }

  ngOnInit(): void {
    this.customers = this.customeService.getCustomers();
  }
}
