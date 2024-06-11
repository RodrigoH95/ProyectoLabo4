using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProyectoLabo4.Enums;
using ProyectoLabo4.Models.User.Dto;
using ProyectoLabo4.Services;

namespace ProyectoLabo4.Controllers
{
    [Route("api/users")]
    //[Authorize]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserServices _userServices;

        public UserController(UserServices userServices)
        {
            _userServices = userServices;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<List<UsersDto>>> Get()
        {
            return Ok(await _userServices.GetAll());
        }

        [HttpGet("{id:int}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<UserDto>> Get(int id)
        {
            try
            {
                return Ok(await _userServices.GetOneById(id));
            }
            catch
            {
                return NotFound(new { messagge = $"No User with ID = {id}" });
            }
        }

        [HttpPost]
        //[Authorize(Roles = $"{Roles.ADMIN}, {Roles.MOD}")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<ActionResult<UserDto>> Post([FromBody] CreateUserDto createUserDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var userCreated = await _userServices.CreateOne(createUserDto);
            return Created("CreateUser", userCreated);
        }

        [HttpPut("{id:int}")]
        //[Authorize(Roles = $"{Roles.ADMIN}, {Roles.MOD}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<ActionResult<UserDto>> Put(int id, [FromBody] UpdateUserDto updateUserDto)
        {
            try
            {
                var userUpdated = await _userServices.UpdateOneById(id, updateUserDto);
                return Ok(userUpdated);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id:int}")]
        //[Authorize(Roles = Roles.ADMIN)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<ActionResult> Delete(int id)
        {
            try
            {
                await _userServices.DeleteOneById(id);
                return Ok(new
                {
                    message = $"User with Id = {id} was deleted"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
