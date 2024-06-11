using System.ComponentModel.DataAnnotations;

namespace ProyectoLabo4.Models.Role.Dto
{
    public class UpdateUserRolesDto
    {
        [Required]
        public List<int> RoleIds { get; set; } = null!;
    }
}
