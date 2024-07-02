using Microsoft.EntityFrameworkCore;
using ProyectoLabo4.Enums;
using ProyectoLabo4.Models.Users;
using ProyectoLabo4.Models.Role;
using ProyectoLabo4.Models.Productos;

namespace ProyectoLabo4.Services
{
    public class ApplicationDbContext: DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .HasIndex(u => u.UserName).IsUnique();


            modelBuilder.Entity<Role>().HasData(
                new Role { Id = 1, Name = Enums.Roles.ADMIN },
                new Role { Id = 2, Name = Enums.Roles.USER },
                new Role { Id = 3, Name = Enums.Roles.MOD }
            );

            modelBuilder.Entity<User>().HasMany(u => u.Roles).WithMany().UsingEntity<RoleUsers>(
                l => l.HasOne<Role>().WithMany().HasForeignKey(e => e.RoleId),
                r => r.HasOne<User>().WithMany().HasForeignKey(e => e.UserId)
            );

            // ProductoUsuario Composite Key
            modelBuilder.Entity<ProductoUsuario>()
                .HasKey(pu => new { pu.UserId, pu.ProductoId });

            // ProductoUsuario Relationships
            modelBuilder.Entity<ProductoUsuario>()
                .HasOne(pu => pu.User)
                .WithMany(u => u.ProductoUsuarios)
                .HasForeignKey(pu => pu.UserId);

            modelBuilder.Entity<ProductoUsuario>()
                .HasOne(pu => pu.Producto)
                .WithMany(p => p.ProductoUsuarios)
                .HasForeignKey(pu => pu.ProductoId);
        }
    }
}
