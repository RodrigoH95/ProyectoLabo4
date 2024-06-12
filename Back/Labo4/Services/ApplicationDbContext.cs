using Microsoft.EntityFrameworkCore;
using ProyectoLabo4.Enums;
using ProyectoLabo4.Models.User;
using ProyectoLabo4.Models.Role;

namespace ProyectoLabo4.Services
{
    public class ApplicationDbContext: DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .HasIndex(u => u.UserName).IsUnique();

            modelBuilder.Entity<Role>().HasData(
                new Role { Id = 1, Name = Roles.ADMIN },
                new Role { Id = 2, Name = Roles.USER },
                new Role { Id = 3, Name = Roles.MOD }
            );

            modelBuilder.Entity<User>().HasMany(u => u.Roles).WithMany().UsingEntity<RoleUsers>(
                l => l.HasOne<Role>().WithMany().HasForeignKey(e => e.RoleId),
                r => r.HasOne<User>().WithMany().HasForeignKey(e => e.UserId)
            );
        }
    }
}
