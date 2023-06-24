using System.ComponentModel.DataAnnotations.Schema;

namespace NerdySoftwareTestTask.Models.ControllerModels
{
    [NotMapped]
    public class GetAnnouncment
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime DateAdded { get; set; }
        public List<Announcment> SimilarAnnouncments { get; set;} 
    }
}
