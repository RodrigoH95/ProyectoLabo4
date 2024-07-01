using AutoMapper;
using ProyectoLabo4.Models.Productos;
using ProyectoLabo4.Models.Productos.Dto;
using ProyectoLabo4.Models.Users;
using ProyectoLabo4.Models.Users.Dto;

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

            // Role
            CreateMap<User, UserLoginResponseDto>().ForMember(
                dest => dest.Roles,
                opt => opt.MapFrom(src => src.Roles.Select(r => r.Name).ToList())
            );

            // Producto
            CreateMap<Producto, ProductoDto>().ReverseMap();
            CreateMap<Producto, ProductosDto>().ReverseMap();
            CreateMap<CreateProductoDto, Producto>().ReverseMap();
            CreateMap<UpdateProductoDto, Producto>().ForAllMembers(opts => opts.Condition((_, _, srcMember) => srcMember != null));
            CreateMap<ProductoUsuario, ProductoUsuarioDto>().ReverseMap();
        }
    }
}
