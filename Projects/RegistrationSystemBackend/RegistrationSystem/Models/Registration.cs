using System.Text.Json.Serialization;

namespace RegistrationSystem.Models
{
    public class Registration
    {
        public int RegistrationId { get; set; }
        public DateTime RegistrationDate { get; set; }

        // Foreign Keys
        public int StudentId { get; set; }
        public int CourseId { get; set; }

        // Navigation Properties
        [JsonIgnore]
        public Student? Student { get; set; }
        [JsonIgnore]
        public Course? Course { get; set; }
    }
}
