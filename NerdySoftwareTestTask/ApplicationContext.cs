using Azure;
using Microsoft.EntityFrameworkCore;
using NerdySoftwareTestTask.Models;
using static System.Net.Mime.MediaTypeNames;

namespace NerdySoftwareTestTask
{
    public class ApplicationContext : DbContext
    {
        public DbSet<Announcment> Announcments { get; set; }

        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Announcment>().HasIndex(x => x.Id).IsUnique();
            builder.Entity<Announcment>().Property(x => x.Id).ValueGeneratedOnAdd();
            builder.Entity<Announcment>().Property(x => x.Title).IsRequired();
            builder.Entity<Announcment>().Property(x => x.Description).IsRequired();
            builder.Entity<Announcment>().Property(x => x.DateAdded).IsRequired();
        }
    }
}
