**Assignment 4: Development of an Instructor Management System Frontend**

**Objective:** Implement the frontend of an Instructor Management System that enables viewing, adding, updating, and deleting instructors using Angular, with functionality to format phone numbers using Angular's built-in pipes.

**Assignment Description:**

You are tasked with creating the frontend for an Instructor Management System that interacts with the backend to manage instructor details. This includes:

1. **Components Creation:**
   - Develop two main components: `ViewInstructorsComponent` for displaying all instructors and `ManageInstructorsComponent` for adding and editing instructor details.

2. **Model Definition:**
   - Define an `Instructor` model that represents the instructor data structure with properties such as `instructorId`, `firstName`, `lastName`, `email`, `phoneNumber`, and `isDeleted`.

3. **Service Implementation:**
   - Implement an `InstructorService` to handle HTTP requests for fetching, adding, updating, and deleting instructors.

4. **Routing Setup:**
   - Configure routing for navigating between the components.

5. **Form Handling:**
   - Use Angular Forms for capturing input in the manage instructors component.

6. **Update Navigation Bar:**
   - Modify the `app.component.html` to include links for navigating to the view and manage instructors components.

7. **PhoneNumber Formatting:**
   - Utilize Angular's built-in pipes to format phone numbers displayed in the `ViewInstructorsComponent`.

**Tasks:**

- Complete the `ViewInstructorsComponent` and `ManageInstructorsComponent` components.
- Implement the `Instructor` model, ensuring to include the `phoneNumber` field.
- Develop the `InstructorService` for API communication.
- Configure the `AppRoutingModule` for navigation.
- Utilize Angular Forms for data binding and validation in the manage instructor form. *Note: `FormsModule` is already included in your `AppModule`, no need to add it again.*
- Use Angular's built-in pipes to format the phone numbers in the `ViewInstructorsComponent`.
- Update the navigation bar in the `app.component.html` to reflect the routing paths to your components.

**Hints and Tips:**

- **Angular CLI Commands:**
  - Generate components, services, and models as needed. For example, `ng g component components/component-name` and `ng g service services/service-name`.

- **HTTP Methods and Services:**
  - Utilize `HttpClient` for making GET, POST, PUT, and DELETE requests in your `InstructorService`.

- **Routing and Navigation:**
  - Use `RouterModule` and `Routes` for defining paths to your components.

- **Angular Forms:**
  - Use `[(ngModel)]` for two-way data binding in your forms.

- **PhoneNumber Formatting:**
  - Angular does not have a built-in pipe for phone number formatting. You can display the phone numbers as is or use a custom method or third-party library for more complex formatting needs. My previous suggestion was incorrect—thank you for your patience.

**Instructor Model Description:**
The `Instructor` model includes:
- `instructorId`: Unique identifier (number).
- `firstName`: First name (string).
- `lastName`: Last name (string).
- `email`: Email address (string).
- `phoneNumber`: Contact phone number (string), displayed using Angular's built-in pipes for any necessary formatting.
- `isDeleted`: Indicates if the instructor is marked as deleted (boolean).

**File Structure:**

- Models: `instructor.model.ts` in the `models` directory.
- Services: `instructor.service.ts` in the `services` directory.
- Components: `view-instructors.component.ts` and `manage-instructors.component.ts` in the `components` directory.
- Routing Module: `app-routing.module.ts`.
- AppModule: `app.module.ts`.

**Test:**

- Test your application to ensure it can add, view, update, and delete instructors, and display phone numbers correctly.
