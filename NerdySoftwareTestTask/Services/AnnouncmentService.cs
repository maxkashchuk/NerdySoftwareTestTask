using Microsoft.EntityFrameworkCore;
using NerdySoftwareTestTask;
using NerdySoftwareTestTask.Models;
using NerdySoftwareTestTask.Models.ControllerModels;

namespace NerdySoftwareTestTask.Services
{
    public interface IAnnouncmentService
    {
        public Task<Announcment> AddAnnouncment(AddAnnouncment announcment);
        public Task<bool> EditAnnouncment(Announcment announcment);
        public Task<bool> DeleteAnnouncment(int id);
        public Task<List<Announcment>> GetAllAnnouncments();
        public Task<GetAnnouncment> GetAnnouncment(int id);
    }
    public class AnnouncmentService : IAnnouncmentService
    {
        private readonly ApplicationContext _context;

        public AnnouncmentService(ApplicationContext _context)
        {
            this._context = _context;
        }

        public async Task<Announcment> AddAnnouncment(AddAnnouncment announcment)
        {
            Announcment a = new Announcment()
            {
                Title = announcment.Title,
                Description = announcment.Description,
                DateAdded = announcment.DateAdded
            };

            if(a == null)
            {
                return null;
            }

            await _context.Announcments.AddAsync(a);
            await _context.SaveChangesAsync();
            return a;
        }

        public async Task<bool> DeleteAnnouncment(int id)
        {
            _context.Announcments.Remove(await _context.Announcments.SingleAsync(el => el.Id == id));
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> EditAnnouncment(Announcment announcment)
        {
            Announcment a = await _context.Announcments.FirstOrDefaultAsync(el => el.Id == announcment.Id);

            a.Title = announcment.Title;
            a.Description = announcment.Description;
            a.DateAdded = announcment.DateAdded;

            _context.Announcments.Update(a);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<List<Announcment>> GetAllAnnouncments()
        {
            List<Announcment> announcments = await _context.Announcments.ToListAsync();

            if(announcments == null)
            {
                return null;
            }

            return announcments;
        }

        public async Task<GetAnnouncment> GetAnnouncment(int id)
        {
            Announcment announcment = await _context.Announcments.FirstOrDefaultAsync(el => el.Id == id);
            List<string> announcment_words_title = announcment.Title.Split(" ").ToList();
            List<string> announcment_words_description = announcment.Description.Split(" ").ToList();
            List<Announcment> temp_list_title = new List<Announcment>();
            List<Announcment> temp_list_description = new List<Announcment>();
            List<Announcment> similar_announcments = new List<Announcment>();

            foreach (string str in announcment_words_title)
            {
                temp_list_title.AddRange(await _context.Announcments.Where(el => el.Title.Contains(str) && el.Id != id).ToListAsync());
            }

            temp_list_title = temp_list_title.Distinct().ToList();

            foreach(string str in announcment_words_description)
            {
                temp_list_description.AddRange(await _context.Announcments.Where(el => el.Description.Contains(str) && el.Id != id).ToListAsync());
            }

            temp_list_description = temp_list_description.Distinct().ToList();

            similar_announcments.AddRange(temp_list_description.Intersect(temp_list_title));

            return new GetAnnouncment() 
            { 
                Title = announcment.Title, 
                Description =  announcment.Description,
                DateAdded = announcment.DateAdded,
                SimilarAnnouncments = similar_announcments
            };
        }
    }
}
