import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CustomerService } from './core/services/customer.service';
import { CustomerListComponent } from './customers/customer-list.component';
import { CustomerComponent } from './customers/customer.component';
import { OrderService } from './core/services/order.service';
import { OrderListComponent } from './orders/order-list.component';
import { OrderComponent } from './orders/order.component';
import { PersonService } from './core/services/person.service';
import { PersonListComponent } from './persons/person-list.component';
import { PersonComponent } from './persons/person.component';
import { AppRoutingModule } from './app-routing.module';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { OrderSearchComponent } from './orders/order-search.component';
import { TimeService } from './core/services/time.service';
import { RedFlagDirective } from './shared/directives/red-flag.directive';
import { CustomDatePipe } from './shared/pipes/custom-date.pipe';
import { LoginComponent } from './login/login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    CustomerComponent,
    CustomerListComponent,
    OrderComponent,
    OrderListComponent,
    PersonComponent,
    PersonListComponent,
    NavBarComponent,
    OrderSearchComponent,
    RedFlagDirective,
    CustomDatePipe,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule,
    ReactiveFormsModule
  ],
  providers: [CustomerService, OrderService, PersonService, TimeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
