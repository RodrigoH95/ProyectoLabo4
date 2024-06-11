using AutoMapper;
using ProyectoLabo4.Models.User;
using ProyectoLabo4.Models.User.Dto;

namespace ProyectoLabo4.Config
{
    public class Mapping : Profile
    {
        public Mapping()
        {
            // Agregar mapeos acá

            // Users
            CreateMap<User, UserDto>().ReverseMap();
            CreateMap<User, UsersDto>().ReverseMap();
            CreateMap<CreateUserDto, User>().ReverseMap();
            CreateMap<UpdateUserDto, User>().ForAllMembers(opts => opts.Condition((_, _, srcMember) => srcMember != null));
        }
    }
}
