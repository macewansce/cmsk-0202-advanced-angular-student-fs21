using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RegistrationSystem.Data;
using RegistrationSystem.Models.Entities;

namespace RegistrationSystem.Endpoints
{
    public static class CoursesEndpoints
    {
        public static void RegisterCoursesEndpoints(this WebApplication app)
        {
            _ = app.MapGet("/courses", async (ApplicationDbContext db) =>
            {
                return await db.Courses.ToListAsync();
            });

            _ = app.MapGet("/courses/{courseId}", async (int courseId, ApplicationDbContext db) =>
            {
                Course? course = await db.Courses.FindAsync(courseId);

                return course == null ? Results.NotFound() : Results.Ok(course);
            });

            _ = app.MapPut("/courses/{courseId}", async (int courseId, [FromBody] Course course, ApplicationDbContext db) =>
            {
                Course? courseToUpdate = await db.Courses.FindAsync(courseId);

                if (courseToUpdate == null)
                {
                    return Results.NotFound();
                }
                else
                {
                    courseToUpdate.CourseNumber= course.CourseNumber;
                    courseToUpdate.CourseDescription = course.CourseDescription;
                    courseToUpdate.CourseName = course.CourseName;
                    courseToUpdate.CourseTypeId = course.CourseTypeId;
                    courseToUpdate.Cost = course.Cost;
                    courseToUpdate.Capacity = course.Capacity;

                    _ = await db.SaveChangesAsync();

                    return Results.NoContent();
                }
            });

            _ = app.MapPost("/courses", async ([FromBody] Course course, ApplicationDbContext db) =>
            {
                Course courseToAdd = new()
                {
                    CourseNumber = course.CourseNumber,
                    CourseDescription = course.CourseDescription,
                    CourseName = course.CourseName,
                    CourseTypeId = course.CourseTypeId,
                    Cost = course.Cost,
                    Capacity = course.Capacity
            };

                _ = db.Courses.Add(courseToAdd);

                _ = await db.SaveChangesAsync();

                return Results.Created($"/courses/{course.CourseId}", courseToAdd);
            });

            _ = app.MapDelete("/courses/{courseId}", async (int courseId, ApplicationDbContext db) =>
            {
                Course? courseToRemove = await db.Courses.FindAsync(courseId);

                if (courseToRemove == null)
                {
                    return Results.NotFound();
                }
                else
                {
                    _ = db.Remove(courseToRemove);

                    _ = await db.SaveChangesAsync();

                    return Results.Ok(courseToRemove);
                }
            });

        }
    }
}
