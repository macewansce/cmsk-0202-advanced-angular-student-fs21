THIS IS A GUID ON HOW TO ADD AUTHENTICATION. YOU MUST DO SOME TROUBLESHOOTING AND RESEARCHING ON YOUR OWN AS WELL.

### Step 1: Define the User Model

Create a `User` class that represents the users in your system. This model will be used with Entity Framework Core to interact with your database.

```csharp
public class User
{
    public int Id { get; set; }

    public string Username { get; set; }

    public string Password { get; set; } 
}
```

### Step 2: Setup Authentication Service

Create a service class that handles authentication logic, including user validation and JWT token generation. This service will replace the need for an interface based on your requirement.

```csharp
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

public class AuthenticationService
{
    private readonly AppDbContext _context;
    private readonly IConfiguration _configuration;

    public AuthenticationService(AppDbContext context, IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;
    }

    public string Authenticate(string username, string password)
    {
        var user = _context.Users.FirstOrDefault(u => u.Username == username && u.Password == password);
        if (user == null) return null;

        var claims = new[]
        {
            new Claim(ClaimTypes.Name, user.Username)
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var expiry = DateTime.Now.AddDays(1);

        var token = new JwtSecurityToken(
            _configuration["Jwt:Issuer"],
            _configuration["Jwt:Audience"],
            claims,
            expires: expiry,
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
```

### Step 3: Register AuthenticationService and Configure JWT in `Program.cs`

Add the `AuthenticationService` to the DI container and configure JWT authentication in your `Program.cs`.

```csharp
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddScoped<AuthenticationService>();
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
        };
    });

builder.Services.AddAuthorization();
var app = builder.Build();

app.UseAuthentication();
app.UseAuthorization();
```

### Step 4: Implement the Login Endpoint Using AuthenticationService

Modify your login endpoint to utilize the `AuthenticationService` for handling authentication.

```csharp
app.MapPost("/login", async (AuthenticationService authService, User login) =>
{
    var token = authService.Authenticate(login.Username, login.Password);
    if (token == null) return Results.Unauthorized();
    return Results.Ok(new { token = token });
}).Produces(200).Produces(401);
```

### Step 5: Secure Endpoints and Run Your Application

Apply authorization to your API endpoints as needed and run your application. The `AuthenticationService` now encapsulates the logic for user validation and token generation, providing a cleaner and more modular approach to handling authentication in your minimal API.

With these steps, you've created a more structured and maintainable way to manage authentication, including JWT token generation and user validation, without directly using `DbContext` in your API endpoints.

## Step 6: Test You Application Endpoints

Now you must test your endpoints using swagger

Just you did not change swagger:
Given the Swagger configuration code you've provided and its placement within your project, let's incorporate it seamlessly into the `Program.cs` of your minimal API setup, assuming all other setup parts (like your JWT authentication) are already in place. Here's a complete and contextual incorporation:

```csharp
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Include any other service configurations you have here, like JWT authentication setup
builder.Services.AddAuthentication(/* ... */);
builder.Services.AddAuthorization(/* ... */);

// Swagger configuration
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new() { Title = "Registration System API", Version = "v1" });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Registration System API V1");
    });
}

// Other middleware like UseAuthentication, UseAuthorization, etc.
app.UseAuthentication();
app.UseAuthorization();

// Define any endpoints here
app.MapGet("/", () => "Hello World!");

app.Run();
```

### Step 7: Create Authentication Service in Angular

To handle login requests and token management, create an authentication service.

**AuthService**
```typescript
// src/app/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenSubject: BehaviorSubject<string|null> = new BehaviorSubject<string|null>(null);

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token');
    if (token) {
      this.tokenSubject.next(token);
    }
  }

  login(username: string, password: string) {
    return this.http.post<{ token: string }>('/api/login', { username, password })
      .pipe(
        map(response => {
          localStorage.setItem('token', response.token);
          this.tokenSubject.next(response.token);
          return response;
        }),
        catchError(error => {
          // Handle login error
          console.error('Login error', error);
          return of(null);
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    this.tokenSubject.next(null);
  }

  getToken() {
    return this.tokenSubject.asObservable();
  }

  isAuthenticated() {
    return this.tokenSubject.value !== null;
  }
}
```

### Step 8: Create Login Component

Design the login component with a form for username and password, utilizing the AuthService for authentication.

**LoginComponent**
```typescript
// src/app/login/login.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private authService: AuthService) { }

  login() {
    this.authService.login(this.username, this.password).subscribe(result => {
      if (result) {
        // Navigate to your dashboard or home page
      } else {
        // Show login error message
      }
    });
  }
}
```

### Step 9: Store and Use JWT Token

You've already covered this in the AuthService's login method by storing the JWT token in local storage and making it available through a BehaviorSubject.

### Step 10: Implement Auth Guard

Create a guard to protect routes that require authentication.

**AuthGuard**
```typescript
// src/app/auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate() {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
```

### Step 11: Create a Logout Mechanism

The logout method in AuthService already clears the JWT token from local storage and the internal BehaviorSubject.

### Step 12: Handle Authentication Errors

Handle errors directly within the AuthService or LoginComponent, as shown in the AuthService's login method.

### Step 13: Protecting Routes

In your routing module, use the AuthGuard to protect routes:

```typescript
{ path: 'protected-route', component: ProtectedComponent, canActivate: [AuthGuard] }
```

### Step 14: HTTP Request Interceptor

Create an interceptor to add the bearer token to any HTTP request.

**AuthInterceptor**
```typescript
// src/app/auth.interceptor.ts
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = localStorage.getItem('token');
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${authToken}`)
    });
    return next.handle(authReq);
  }
}
```

And don't forget to provide this interceptor in your app module:
```typescript
providers: [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
]
```

This setup provides a comprehensive solution for handling authentication in your Angular application, from login to securely making API requests with a JWT. Your job is to integrate this into the Resgistratio System.