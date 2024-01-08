using Microsoft.EntityFrameworkCore;

namespace CustomerDemo.Models
{
    public class CustomerContext : DbContext
    {
        public CustomerContext(DbContextOptions<CustomerContext> options) : base(options) 
        {

        }

        public DbSet<Customer> Customers { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Customer>()
                .Property(p => p.CreatedDate)
                .ValueGeneratedOnAddOrUpdate();

            modelBuilder.Entity<Customer>()
                .Property(p => p.LastUpdatedDate)
                .ValueGeneratedOnAddOrUpdate();
        }

    }
}
