using ProyectoLabo4.Models.Users.Dto;

namespace ProyectoLabo4.Models.Auth.Dto
{
    public class LoginResponseDto
    {
        public string Token { get; set; } = null!;

        public UserLoginResponseDto User { get; set; } = null!;
    }
}
