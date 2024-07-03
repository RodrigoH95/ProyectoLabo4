using ProyectoLabo4.Enums;
using ProyectoLabo4.Models.Productos.Dto;
using ProyectoLabo4.Models.Role;
using ProyectoLabo4.Models.Users.Dto;

namespace ProyectoLabo4.Services
{
    public static class ApplicationDbContextSeed
    {
        public static async Task SeedAsync(ApplicationDbContext context, IServiceProvider serviceProvider)
        {
            await SeedUsers(context, serviceProvider);
            await SeedProducts(context, serviceProvider);          
        }

        private static async Task SeedProducts(ApplicationDbContext context, IServiceProvider serviceProvider)
        {
            var productsManager = serviceProvider.GetRequiredService<ProductoService>();

            var productos = new List<CreateProductoDto>
            {
                new CreateProductoDto
                {
                    Nombre = "Teclado Gamer",
                    Descripcion = "Teclado mecánico gamer con retroiluminación RGB.",
                    UrlImg = "https://images.ecestaticos.com/KWmFsQ63fN0LIAWQTlU5BedGm6Y=/0x0:638x359/1440x810/filters:fill(white):format(jpg)/f.elconfidencial.com%2Foriginal%2F254%2Faae%2F2dc%2F254aae2dcb81a6027f882fdb86d5fb6d.jpg",
                    Precio = 50000m,
                    Descuento = 0.10m,
                    Categoria = "Periféricos",
                    Puntaje = 90m,
                    Stock = 100
                },
                new CreateProductoDto
                {
                    Nombre = "Mouse pc Gamer",
                    Descripcion = "Mouse gamer con sensor óptico de alta precisión.",
                    UrlImg = "https://m.media-amazon.com/images/I/71mX0pLAIDL.jpg",
                    Precio = 30000m,
                    Descuento = 0.5m,
                    Categoria = "Periféricos",
                    Puntaje = 75m,
                    Stock = 150
                },
                new CreateProductoDto
                {
                    Nombre = "Silla gamer pc azul",
                    Descripcion = "Silla gamer ergonómica con ajuste de altura y reposabrazos.",
                    UrlImg = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJpOzvZYM_hd3PK6raM6Z1nqpdayjngZMBWQ&s",
                    Precio = 200000m,
                    Descuento = 0.15m,
                    Categoria = "Muebles",
                    Puntaje = 84m,
                    Stock = 50
                },
                new CreateProductoDto
                {
                    Nombre = "Monitor Samsung",
                    Descripcion = "Monitor Samsung de 24 pulgadas con resolución Full HD.",
                    UrlImg = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTW-SJqn74LtWAYfz8uvLYpVX9sSNrCQ00ZUQ&s",
                    Precio = 150000m,
                    Descuento = 0,
                    Categoria = "Monitores",
                    Puntaje = 97m,
                    Stock = 80
                },
                new CreateProductoDto
                {
                    Nombre = "Monitor Asus gamer",
                    Descripcion = "Monitor Asus de 27 pulgadas con resolución 4K UHD y tasa de refresco de 144Hz.",
                    UrlImg = "https://www.profesionalreview.com/wp-content/uploads/2018/02/C%C3%B3mo-elegir-un-monitor-gamer-2.jpg",
                    Precio = 400000m,
                    Descuento = 0.25m,
                    Categoria = "Monitores",
                    Puntaje = 94m,
                    Stock = 70
                },
                new CreateProductoDto
                {
                    Nombre = "Mouse gamer Noga",
                    Descripcion = "Mouse gamer Noga con 7 botones programables y DPI ajustable.",
                    UrlImg = "https://www.sevenelectronics.com.ar/images/000779813771429956433Foto-Principal--3-.png",
                    Precio = 25000m,
                    Descuento = 0.1m,
                    Categoria = "Periféricos",
                    Puntaje = 78m,
                    Stock = 120
                },
                new CreateProductoDto
                {
                    Nombre = "Mouse gamer Genius Scorpion",
                    Descripcion = "Mouse gamer Genius Scorpion con iluminación LED y diseño ergonómico.",
                    UrlImg = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo7LKI3733AC3ybo4U5QHsl7LMyn2yWBbEwQ&s",
                    Precio = 19000.99m,
                    Descuento = 0,
                    Categoria = "Periféricos",
                    Puntaje = 89m,
                    Stock = 130
                },
                new CreateProductoDto
                {
                    Nombre = "Teclado gamer retroiluminado",
                    Descripcion = "Teclado mecánico gamer con retroiluminación y teclas programables.",
                    UrlImg = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCOyg-wBerMAxgXw3BwQC57jtvP12pkt7csg&s",
                    Precio = 60000m,
                    Descuento = 0,
                    Categoria = "Periféricos",
                    Puntaje = 75m,
                    Stock = 110
                },
                new CreateProductoDto
                {
                    Nombre = "Teclado Gamer Razer",
                    Descripcion = "Teclado gamer Razer Huntsman Mini con switches Clicky Purple y retroiluminación RGB.",
                    UrlImg = "https://www.infinitonline.com.ar/images/000000000000011902617000000000000011900733TGA108.jpg",
                    Precio = 130000m,
                    Descuento = 0.2m,
                    Categoria = "Periféricos",
                    Puntaje = 88m,
                    Stock = 90
                }
            };


            if (!context.Productos.Any())
            {
                foreach (var product in productos)
                {
                    await productsManager.CreateOne(product);
                }
            }
        }


        private static async Task SeedUsers(ApplicationDbContext context, IServiceProvider serviceProvider)
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

