using System.ComponentModel.DataAnnotations.Schema;

namespace NerdySoftwareTestTask.Models.ControllerModels
{
    [NotMapped]
    public class AddAnnouncment
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime DateAdded { get; set; }
    }
}
