using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProyectoLabo4.Enums;
using ProyectoLabo4.Models.Auth;
using ProyectoLabo4.Models.Auth.Dto;
using ProyectoLabo4.Models.Role;
using ProyectoLabo4.Models.Role.Dto;
using ProyectoLabo4.Models.Users;
using ProyectoLabo4.Models.Users.Dto;
using ProyectoLabo4.Services;

namespace ProyectoLabo4.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AuthServices _authServices;
        private readonly UserServices _userService;
        private readonly RoleServices _roleService;
        private readonly IEncoderService _encoderService;
        private readonly IMapper _mapper;

        public AuthController(AuthServices authServices, UserServices userService, IEncoderService encoderService, RoleServices roleService, IMapper mapper)
        {
            _authServices = authServices;
            _userService = userService;
            _encoderService = encoderService;
            _roleService = roleService;
            _mapper = mapper;
        }

        [HttpPost("login")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<LoginResponseDto>> Login([FromBody] Login login)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                if (login.Username == null && login.Password == null)
                {
                    ModelState.AddModelError("Credentials", "Credentials are incorrect");
                    return BadRequest(ModelState);
                }
                var user = await _userService.GetOneByUsernameOrEmail(login.Username, login.Email);

                var passwordMatch = _encoderService.Verify(login.Password, user.Password);

                if (user == null || !passwordMatch)
                {
                    ModelState.AddModelError("Credentials", "Credentials are incorrect");
                    return BadRequest(ModelState);
                }

                var token = _authServices.GenerateJwtToken(user);

                return Ok(new LoginResponseDto
                {
                    Token = token,
                    User = _mapper.Map<UserLoginResponseDto>(user)
                });
            }
            catch (Exception e)
            {
                return BadRequest(new { message = e.Message });
            }
        }

        [HttpPost("register")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<UserDto>> Register([FromBody] CreateUserDto register)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var user = await _userService.GetOneByUsernameOrEmail(register.UserName, register.Email);

                if (user != null)
                {
                    ModelState.AddModelError("Error", "User already exists");
                    return BadRequest(ModelState);
                }

                var userCreated = await _userService.CreateOne(register);

                var defaultRole = await _roleService.GetByName("User");

                await _userService.UpdateRolesById(userCreated.Id, new List<Role> { defaultRole });

                return Created("RegisterUser", userCreated);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPut("roles/user/{id}")]
        [Authorize(Roles = Roles.ADMIN)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<ActionResult<User>> Put(int id, [FromBody] UpdateUserRolesDto updateUserRolesDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var roles = await _roleService.GetByIds(updateUserRolesDto.RoleIds);
                var userUpdated = await _userService.UpdateRolesById(id, roles);
                return Ok(userUpdated);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}
