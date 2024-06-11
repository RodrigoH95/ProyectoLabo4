using AutoMapper;
using System.Net;
using System.Web.Http;
using ProyectoLabo4.Models.Role;
using ProyectoLabo4.Models.User;
using ProyectoLabo4.Models.User.Dto;
using ProyectoLabo4.Repositories;

namespace ProyectoLabo4.Services
{
    public class UserServices
    {
        private readonly IMapper _mapper;
        private readonly IUserRepository _userRepo;
        private readonly IEncoderService _encoderService;

        public UserServices(IMapper mapper, IUserRepository userRepo, IEncoderService encoderService)
        {
            _mapper = mapper;
            _userRepo = userRepo;
            _encoderService = encoderService;
        }

        public async Task<List<UsersDto>> GetAll()
        {
            var users = await _userRepo.GetAll();
            return _mapper.Map<List<UsersDto>>(users);
        }

        public async Task<User> GetOneByIdOrException(int id)
        {
            var user = await _userRepo.GetOne(u => u.Id == id);
            if (user == null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
            return user;
        }

        public async Task<UserDto> GetOneById(int id)
        {
            var user = await GetOneByIdOrException(id);
            return _mapper.Map<UserDto>(user);
        }

        public async Task<User> GetOneByUsernameOrEmail(string? username, string? email)
        {
            User user;

            if (email != null)
            {
                user = await _userRepo.GetOne(u => u.Email == email);
            }
            else if (username != null)
            {
                user = await _userRepo.GetOne(u => u.UserName == username);
            }
            else
            {
                throw new HttpResponseException(HttpStatusCode.BadRequest);
            }
            return user;
        }

        public async Task<UserDto> CreateOne(CreateUserDto createUserDto)
        {
            var user = _mapper.Map<User>(createUserDto);

            user.Password = _encoderService.Encode(user.Password);

            await _userRepo.Add(user);

            return _mapper.Map<UserDto>(user);
        }

        public async Task<UserDto> UpdateOneById(int id, UpdateUserDto updateUserDto)
        {
            var user = await GetOneByIdOrException(id);

            var updated = _mapper.Map(updateUserDto, user);

            return _mapper.Map<UserDto>(await _userRepo.Update(updated));
        }

        public async Task DeleteOneById(int id)
        {
            var user = await GetOneByIdOrException(id);
            await _userRepo.Delete(user);
        }

        //roles
        public async Task<User> UpdateRolesById(int id, List<Role> roles)
        {
            var user = await GetOneByIdOrException(id);

            user.Roles = roles;

            return await _userRepo.Update(user);
        }

        public async Task<List<Role>> GetRolesById(int id)
        {
            var user = await GetOneByIdOrException(id);

            return user.Roles.ToList();
        }
    }
}
