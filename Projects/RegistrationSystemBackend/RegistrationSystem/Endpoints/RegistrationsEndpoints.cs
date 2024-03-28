using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RegistrationSystem.Data;
using RegistrationSystem.Models.Entities;

namespace RegistrationSystem.Endpoints
{
    public static class RegistrationsEndpoints
    {
        public static void RegisterRegistrationsEndpoints(this WebApplication app)
        {
            _ = app.MapGet("/registrations", async (ApplicationDbContext db) =>
            {
                return await db.Registrations.ToListAsync();
            });

            _ = app.MapGet("/registrations/{registrationId}", async (int registrationId, ApplicationDbContext db) =>
            {
                Registration? registration = await db.Registrations.FindAsync(registrationId);

                return registration == null ? Results.NotFound() : Results.Ok(registration);
            });

            _ = app.MapPut("/registrations/{registrationId}", async (int registrationId, [FromBody] Registration registration, ApplicationDbContext db) =>
            {
                Registration? registrationToUpdate = await db.Registrations.FindAsync(registrationId);

                if (registrationToUpdate == null)
                {
                    return Results.NotFound();
                }
                else
                {
                    registrationToUpdate.RegistrationDate = registration.RegistrationDate;
                    registrationToUpdate.StudentId = registration.StudentId;
                    registrationToUpdate.CourseId = registration.CourseId;

                    _ = await db.SaveChangesAsync();

                    return Results.NoContent();
                }
            });

            _ = app.MapPost("/registrations", async ([FromBody] Registration registration, ApplicationDbContext db) =>
            {
                Registration registrationToAdd = new()
                {
                    RegistrationDate = registration.RegistrationDate,
                    StudentId = registration.StudentId,
                    CourseId = registration.CourseId
                };

                _ = db.Registrations.Add(registrationToAdd);

                _ = await db.SaveChangesAsync();

                return Results.Created($"/registrations/{registration.RegistrationId}", registrationToAdd);
            });

            _ = app.MapDelete("/registrations/{registrationId}", async (int registrationId, ApplicationDbContext db) =>
            {
                Registration? registrationToRemove = await db.Registrations.FindAsync(registrationId);

                if (registrationToRemove == null)
                {
                    return Results.NotFound();
                }
                else
                {
                    _ = db.Remove(registrationToRemove);

                    _ = await db.SaveChangesAsync();

                    return Results.Ok(registrationToRemove);
                }
            });

        }
    }
}
