**Final In-Class Project: More Course Registration System Backend**

**Objective:** 
Implement backend of a Course Registration System that manages instructors.

**Assignment Description:**

You are provided with a skeleton of a backend system for managing instructors in a Course Registration System. Your task is to develop the missing parts and ensure the entire system functions correctly. This includes:

1. **Entity Framework Setup:**
   - Create an `Instructor` entity model corresponding to the database table for storing instructors. The model should include properties: `InstructorId` (primary key), `FirstName`, `LastName`, `Email`, `PhoneNumber` and `IsDeleted`. 

2. **Data Transfer Objects (DTOs):**
   - Define an `InstructorDto` with necessary validation attributes to ensure data integrity. The DTO should include properties for `InstructorId`, `FirstName`, `LastName`, `Email`, `PhoneNumber` and `IsDeleted`.

3. **AutoMapper Configuration:**
   - Configure AutoMapper in a `MappingProfile` to map between the `Instructor` entity and the `InstructorDto`.

4. **Service Layer:**
   - Implement an `InstructorsService` that contains methods for handling business logic and database interactions. This includes methods for adding, updating, deleting, and retrieving instructors.

5. **API Endpoints:**
   - Using ASP.NET Core, create RESTful API endpoints in a static class `InstructorsEndpoints`:
     - GET `/instructors`: Retrieves all instructors.
     - GET `/instructors/{instructorId}`: Retrieves a single instructor by ID.
     - PUT `/instructors/{instructorId}`: Updates an existing instructor.
     - POST `/instructors`: Adds a new instructor.
     - DELETE `/instructors/{instructorId}`: Marks an instructor as deleted.
   - Ensure appropriate response codes are returned (e.g., 200 OK, 404 Not Found, 400 Bad Request).

6. **Dependency Injection:**
   - Register `InstructorsService` and any other required services in the DI container.

7. **Validation:**
   - Use `MiniValidator` for validating DTOs before processing them in your endpoints.

**Hints:**

- **HTTP Status Codes:**
  - `200 OK`: Successfully retrieved data.
  - `201 Created`: Successfully created a new record.
  - `204 No Content`: Successfully updated a record but there's no content to return.
  - `400 Bad Request`: The request was invalid or cannot be served. Usually an error from validation.
  - `404 Not Found`: The requested resource was not found but may be available again in the future.
  - `500 Internal Server Error`: A generic error message when an unexpected condition was encountered.

- **File Names and Locations:**
  - Entities: `Instructor.cs` in the `Models/Entities` directory.
  - DTOs: `InstructorDto.cs` in the `Models/Dtos` directory.
  - Services: `InstructorsService.cs` in the `Services` directory.
  - Mappers: `MappingProfile.cs` in the `Mappers` directory.
  - Endpoints: `InstructorsEndpoints.cs` in the `Endpoints` directory.

- **Entity Framework Migrations:**
  - Do what you always do but just incase the below is just one more hint.
  - To add a migration after making changes to your entity models, use the command: `dotnet ef migrations add MigrationName`.
  - To update the database with the latest migration, use the command: `dotnet ef database update`.
