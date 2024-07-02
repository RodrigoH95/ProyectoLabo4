using ProyectoLabo4.Models.Productos;
using ProyectoLabo4.Models.Productos.Dto;

namespace ProyectoLabo4.Models.Users.Dto
{
    public class UserDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string? Email { get; set; }
        public string UserName { get; set; } = null!;
    }
}
