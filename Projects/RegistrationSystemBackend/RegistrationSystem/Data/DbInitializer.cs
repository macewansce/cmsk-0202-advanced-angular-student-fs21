using RegistrationSystem.Models;

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

            Course[] courses = new Course[]
            {
                new Course{CourseNumber="C001", CourseName="Math", CourseDescription="Math course", Cost=500, Capacity=75, CourseTypeId=courseTypes.Single(ct => ct.TypeName == "Online").CourseTypeId},
                new Course{CourseNumber="C002", CourseName="Science", CourseDescription="Science course", Cost=700, Capacity=35, CourseTypeId=courseTypes.Single(ct => ct.TypeName == "Offline").CourseTypeId}
            };
            foreach (Course c in courses)
            {
                _ = context.Courses.Add(c);
            }
            _ = context.SaveChanges();

            Student[] students = new Student[]
            {
                new Student{StudentNumber="S001", FirstName="John", LastName="Doe", BirthDate=DateTime.Parse("2000-09-01")},
                new Student{StudentNumber="S002", FirstName="Jane", LastName="Doe", BirthDate=DateTime.Parse("1999-07-23")}
            };
            foreach (Student s in students)
            {
                _ = context.Students.Add(s);
            }
            _ = context.SaveChanges();

            Registration[] registrations = new Registration[]
            {
                new Registration{StudentId=students.Single(s => s.StudentNumber == "S001").StudentId, CourseId=courses.Single(c => c.CourseNumber == "C001").CourseId, RegistrationDate=DateTime.Parse("2023-07-01")},
                new Registration{StudentId=students.Single(s => s.StudentNumber == "S002").StudentId, CourseId=courses.Single(c => c.CourseNumber == "C002").CourseId, RegistrationDate=DateTime.Parse("2023-07-02")}
            };
            foreach (Registration r in registrations)
            {
                _ = context.Registrations.Add(r);
            }
            _ = context.SaveChanges();
        }
    }
}
