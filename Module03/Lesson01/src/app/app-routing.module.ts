import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PersonListComponent } from './persons/person-list.component';
import { CustomerListComponent } from './customers/customer-list.component';
import { OrderListComponent } from './orders/order-list.component';
import { OrderSearchComponent } from './orders/order-search.component';
import { AuthGuard } from './core/helpers/auth-guard';

const routes: Routes = [
  { path: 'persons', component: PersonListComponent, canActivate:[AuthGuard]  },
  { path: 'customers', component: CustomerListComponent },
  { path: 'orders', component: OrderListComponent },
  { path: 'orderserch', component: OrderSearchComponent }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {

}

