namespace ProyectoLabo4.Models.User.Dto
{
    public class UserDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string? Email { get; set; }
        public string UserName { get; set; } = null!;
    }
}
