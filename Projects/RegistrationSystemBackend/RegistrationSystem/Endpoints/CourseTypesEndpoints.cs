using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RegistrationSystem.Data;
using RegistrationSystem.Models;

namespace RegistrationSystem.Endpoints
{
    public static class CourseTypesEndpoints
    {
        public static void RegisterCourseTypesEndpoints(this WebApplication app)
        {
            _ = app.MapGet("/courseTypes", async (ApplicationDbContext db) =>
            {
                return await db.CourseTypes.ToListAsync();
            });

            _ = app.MapGet("/courseTypes/{coursetypeId}", async (int coursetypeId, ApplicationDbContext db) =>
            {
                CourseType? courseType = await db.CourseTypes.FindAsync(coursetypeId);

                return courseType == null ? Results.NotFound() : Results.Ok(courseType);
            });

            _ = app.MapPut("/courseTypes/{courseTypeId}", async (int courseTypeId, [FromBody] CourseType courseType, ApplicationDbContext db) =>
            {
                CourseType? courseTypeToUpdate = await db.CourseTypes.FindAsync(courseTypeId);

                if (courseTypeToUpdate == null)
                {
                    return Results.NotFound();
                }
                else
                {
                    courseTypeToUpdate.TypeName = courseType.TypeName;
                    courseTypeToUpdate.TypeDescription = courseType.TypeDescription;

                    _ = await db.SaveChangesAsync();

                    return Results.NoContent();
                }
            });

            _ = app.MapPost("/courseTypes", async ([FromBody] CourseType courseType, ApplicationDbContext db) =>
            {
                CourseType courseTypeToAdd = new()
                {
                    TypeName = courseType.TypeName,
                    TypeDescription = courseType.TypeDescription,
                    IsDeleted = false
                };

                _ = db.CourseTypes.Add(courseTypeToAdd);

                _ = await db.SaveChangesAsync();

                return Results.Created($"/courseTypes/{courseType.CourseTypeId}", courseTypeToAdd);
            });

            _ = app.MapDelete("/courseTypes/{courseTypeId}", async (int courseTypeId, ApplicationDbContext db) =>
            {
                CourseType? courseTypeToRemove = await db.CourseTypes.FindAsync(courseTypeId);

                if (courseTypeToRemove == null)
                {
                    return Results.NotFound();
                }
                else
                {
                    courseTypeToRemove.IsDeleted = true;

                    _ = await db.SaveChangesAsync();

                    return Results.Ok(courseTypeToRemove);
                }
            });
        }
    }
}
