using RegistrationSystem.Models.Entities;

namespace RegistrationSystem.Data
{
    public static class DbInitializer
    {
        public static void Initialize(ApplicationDbContext context)
        {
            _ = context.Database.EnsureCreated();

            if (context.CourseTypes.Any())
            {
                return; // DB has been seeded
            }

            CourseType[] courseTypes = new CourseType[]
            {
                new CourseType{TypeName="Online", TypeDescription="Online course", IsDeleted=false},
                new CourseType{TypeName="Offline", TypeDescription="Offline course", IsDeleted=false}
            };
            foreach (CourseType ct in courseTypes)
            {
                _ = context.CourseTypes.Add(ct);
            }
            _ = context.SaveChanges();

        }
    }
}
