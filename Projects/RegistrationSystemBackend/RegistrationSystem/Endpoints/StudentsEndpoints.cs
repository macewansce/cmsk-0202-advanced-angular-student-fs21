using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RegistrationSystem.Data;
using RegistrationSystem.Models;

namespace RegistrationSystem.Endpoints
{
    public static class StudentsEndpoints
    {
        public static void RegisterStudentsEndpoints(this WebApplication app)
        {
            _ = app.MapGet("/students", async (ApplicationDbContext db) =>
            {
                return await db.Students.ToListAsync();
            });

            _ = app.MapGet("/students/{studentId}", async (int studentId, ApplicationDbContext db) =>
            {
                Student? student = await db.Students.FindAsync(studentId);

                return student == null ? Results.NotFound() : Results.Ok(student);
            });

            _ = app.MapPut("/students/{studentId}", async (int studentId, [FromBody] Student student, ApplicationDbContext db) =>
            {
                Student? studentToUpdate = await db.Students.FindAsync(studentId);

                if (studentToUpdate == null)
                {
                    return Results.NotFound();
                }
                else
                {
                    studentToUpdate.FirstName = student.FirstName;
                    studentToUpdate.LastName = student.LastName;
                    studentToUpdate.BirthDate = student.BirthDate;
                    studentToUpdate.StudentNumber = student.StudentNumber;

                    _ = await db.SaveChangesAsync();

                    return Results.NoContent();
                }
            });

            _ = app.MapPost("/students", async ([FromBody] Student student, ApplicationDbContext db) =>
            {
                Student studentToAdd = new()
                {
                    FirstName = student.FirstName,
                    LastName = student.LastName,
                    BirthDate = student.BirthDate,
                    StudentNumber = student.StudentNumber
                };

                _ = db.Students.Add(studentToAdd);

                _ = await db.SaveChangesAsync();

                return Results.Created($"/students/{studentToAdd.StudentId}", studentToAdd);
            });

            _ = app.MapDelete("/students/{studentId}", async (int studentId, ApplicationDbContext db) =>
            {
                Student? studentToRemove = await db.Students.FindAsync(studentId);

                if (studentToRemove == null)
                {
                    return Results.NotFound();
                }
                else
                {
                    _ = db.Remove(studentToRemove);

                    _ = await db.SaveChangesAsync();

                    return Results.Ok(studentToRemove);
                }
            });

        }
    }
}
