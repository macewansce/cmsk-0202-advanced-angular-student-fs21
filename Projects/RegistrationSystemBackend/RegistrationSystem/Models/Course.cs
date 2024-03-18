using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;

namespace RegistrationSystem.Models
{
    public class Course
    {
        public int CourseId { get; set; }
        public string? CourseNumber { get; set; }
        public string? CourseName { get; set; }
        public string? CourseDescription { get; set; }
        [Precision(18, 2)]
        public decimal Cost { get; set; }
        public int Capacity { get; set; }

        // Foreign Key
        public int CourseTypeId { get; set; }

        // Navigation Properties
        [JsonIgnore]
        public CourseType? CourseType { get; set; }
        [JsonIgnore]
        public ICollection<Registration>? Registrations { get; set; }
    }
}
