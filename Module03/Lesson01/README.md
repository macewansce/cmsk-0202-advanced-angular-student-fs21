# Module 03 - Lesson 01
 
## ANGULAR WEBSITE SECURITY
 
## Table of Contents
 
- [What is Authentication?](#what-is-authentication)
- [What is Authorization?](#what-is-authorization)
- [Implementing Authentication and Authorization](#implementing-authentication-and-authorization)
- [Installation of Module 03 - Lesson 01](#installation-of-module-03---lesson-01)
 
## What is Authentication?
"Authentication is the process of [verifying] someone's identity by assuring that the person is the same as what [they are claiming]" (Java T Point, n.d., para. 2).
 
## What is Authorization?
"Authorization is the process of granting someone [permission] to do something... [I]t is a way to check if the user has permission to use a resource or not" (Java T Point, n.d., para. 5).
 
## Implementing Authentication and Authorization
 
We are going to follow the below steps to implement authentication and authorization in our Angular application from the previous lesson:
  1. Create a **UserService** that will provide methods related to **User**s.
  2. Create an **AuthService** that will provide methods for ***login()*** and ***logout()***.
  3. Create an **AuthGuard** class that provides methods to check whether the user has permission to view a component or not.
  4. Create an **AuthInterceptor** to intercept http request and check its login token.
  5. Create a **LoginComponent** with form to allow the user to provide the ***UserName*** and ***Password***
  6. Use the **AuthGuard** in the **AppRoutingModule** to check if the user has permission to view a page or not.
 
 
As you can see, there is a lot to get done! So, let's get started by creating our **UserService** through running the following:
```Bash
PS C:\Repos\cmsk202\Module03\Lesson01> cd .\src\app\core\services\
PS C:\Repos\cmsk202\Module03\Lesson01\src\app\core\services> ng generate service User
CREATE src/app/core/services/user.service.spec.ts (347 bytes)
CREATE src/app/core/services/user.service.ts (133 bytes)
```
 
Open up the **UserService** and add a method to _get all users_ as follows:
```TypeScript
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/order.model';
 
@Injectable({
  providedIn: 'root'
})
export class UserService {
 
  constructor(private httpClient: HttpClient) { }
 
  getAll() {
    return this.httpClient.get<User[]>(`/users`);
  }
}
```
 
Next, we need to create the **AuthService** by running the following:
```Bash
PS C:\Repos\cmsk202\Module03\Lesson01> cd .\src\app\core\services\
PS C:\Repos\cmsk202\Module03\Lesson01\src\app\core\services> ng generate service Auth
CREATE src/app/core/services/auth.service.spec.ts (347 bytes)
CREATE src/app/core/services/auth.service.ts (133 bytes)
```
 
Open up the **AuthService** and then add the ***login()*** and ***logout()*** methods as follows:
```TypeScript
import { Injectable } from '@angular/core';
 
@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  constructor() { }
 
  logout() {
    localStorage.removeItem('currentUser');
    this.currentUser.next(null);
  }
 
  public get currentUser(): User {
    return this.currentUser.value;
  }
 
  login(username: string, password: string) {
    return this.http.post<any>('api/login', { username, password })
      .pipe(map(user => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUser.next(user);
        return user;
      }));
  }
}
 
```
 
Next, we need to create the **AuthGuard** class by running the following:
```Bash
PS C:\Repos\cmsk202\Module03\Lesson01> cd .\src\app\core\helpers\
PS C:\Repos\cmsk202\Module03\Lesson01\src\app\core\helpers> ng generate class AuthGuard
CREATE src/app/core/helpers/auth-guard.spec.ts (167 bytes)
CREATE src/app/core/helpers/auth-guard.ts (27 bytes)
```
 
Open up the **AuthGuard** and then inject the **AuthService** and **Router**. We also need to code the ***canActivate*** methods as follows:
```TypeScript
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../services/auth.service";
 
 
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private authService: AuthService) { }
 
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authService.currentUser;
        if (currentUser) {
            return true;
        }
 
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
 
        return false;
    }
}
```
 
Next, we need to create the **AuthInterceptor** by running the following:
```Bash
PS C:\Repos\cmsk202\Module03\Lesson01> cd .\src\app\core\helpers\
PS C:\Repos\cmsk202\Module03\Lesson01\src\app\core\helpers> ng generate interceptor Auth
CREATE src/app/core/helpers/auth.interceptor.spec.ts (404 bytes)
CREATE src/app/core/helpers/auth.interceptor.ts (409 bytes)
```
 
Open up the **AuthInterceptor** and then implement **HttpInterceptor** as follows:
```TypeScript
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
 
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
 
  constructor(private authService: AuthService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let currentUser = this.authService.currentUser;
    if (currentUser && currentUser.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.token}`
        }
      });
    }
    return next.handle(request);
  }
}
```
 
The next step is to create our **LoginComponent**. However, since we have already created plenty of components, the **LoginComponent** has already been created to save time.
 
The last step is to use the **AuthGuard** in the **AppRoutingModule** to check if the user has permission to view a page or not as follows:
```TypeScript
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
```
 
Now, let's run our application and test our new login functionality.
 
_Note:_ Do not forget to create some fake users with different rules.
 
## Installation of Module 03 - Lesson 01
 
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
 
 
