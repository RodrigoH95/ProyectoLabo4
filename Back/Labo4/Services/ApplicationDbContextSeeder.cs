using Microsoft.AspNetCore.Identity;
using ProyectoLabo4.Enums;
using ProyectoLabo4.Models.Role;
using ProyectoLabo4.Models.Users;
using ProyectoLabo4.Models.Users.Dto;
using ProyectoLabo4.Services;

namespace ProyectoLabo4.Services
{
    public static class ApplicationDbContextSeed
    {
        public static async Task SeedAsync(ApplicationDbContext context, IServiceProvider serviceProvider)
        {
            var userManager = serviceProvider.GetRequiredService<UserServices>();
            var roleManager = serviceProvider.GetRequiredService<RoleServices>();

            // Creación de usuario admin
            if (!context.Users.Any(u => u.UserName.Equals("Admin")))
            {
                Console.WriteLine("Creating Admin user");
                var adminUser = new CreateUserDto
                {
                    Name = "Admin",
                    UserName = "Admin",
                    Email = "admin@mail.com",
                    Password = "Admin@123"
                };
                var adminCreated = await userManager.CreateOne(adminUser);

                if (adminCreated != null)
                {
                    var roleAdmin = await roleManager.GetByName(Roles.ADMIN);
                    await userManager.UpdateRolesById(adminCreated.Id, new List<Role> { roleAdmin });
                }
            }

            // Creación de usuario Mod
            if (!context.Users.Any(u => u.UserName.Equals("Moderator")))
            {
                var modUser = new CreateUserDto
                {
                    Name = "Moderator",
                    UserName = "Moderator",
                    Email = "mod@mail.com",
                    Password = "Mod@123"
                };

                var modCreated = await userManager.CreateOne(modUser);
                if (modCreated != null)
                {
                    var rolMod = await roleManager.GetByName(Roles.MOD);
                    await userManager.UpdateRolesById(modCreated.Id, new List<Role> { rolMod });
                }
            }
        }
    }
}

