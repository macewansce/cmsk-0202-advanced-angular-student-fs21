import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PersonService } from './core/services/person.service';
import { PersonListComponent } from './persons/person-list.component';
import { PersonComponent } from './persons/person.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RedFlagDirective } from './shared/directives/red-flag.directive';

@NgModule({
  declarations: [
    AppComponent,
    PersonComponent,
    PersonListComponent,
    NavBarComponent,
    RedFlagDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule
  ],
  providers: [PersonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
