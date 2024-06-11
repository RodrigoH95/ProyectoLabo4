namespace ProyectoLabo4.Models.User.Dto
{
    public class UserLoginResponseDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string? Email { get; set; }
        public string UserName { get; set; } = null!;
        public List<string> Roles { get; set; } = null!;
    }
}
