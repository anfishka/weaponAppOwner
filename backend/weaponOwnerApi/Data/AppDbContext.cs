using Microsoft.EntityFrameworkCore;
using weaponOwnerApi.EF;
using weaponOwnerApi.Entities;

namespace weaponOwnerApi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<Admin> Admins { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new AdminsConfig());

            modelBuilder.Entity<Admin>().HasData(
                new Admin
                {
                    id = 1,
                    first_name = "superadmin",
                    last_name = "superadmin",
                    email = "sa@net.com",
                    username = "superadmin",
                    password = "123",
                    is_active = true,
                    card_count = 0
                }
            );
        }
    }


}