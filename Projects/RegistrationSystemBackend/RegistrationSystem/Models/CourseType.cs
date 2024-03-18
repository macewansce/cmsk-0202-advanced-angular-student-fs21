using System.Text.Json.Serialization;

namespace RegistrationSystem.Models
{
    public class CourseType
    {
        public int CourseTypeId { get; set; }
        public string? TypeName { get; set; }
        public string? TypeDescription { get; set; }
        public bool IsDeleted { get; set; }

        // Navigation Property
        [JsonIgnore]
        public ICollection<Course>? Courses { get; set; }
    }
}
