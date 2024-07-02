using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProyectoLabo4.Enums;
using ProyectoLabo4.Models.Productos.Dto;
using ProyectoLabo4.Services;

namespace ProyectoLabo4.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductoController : ControllerBase
    {
        private readonly ProductoService _productoService;

        public ProductoController(ProductoService productoService)
        {
            _productoService = productoService;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<List<ProductosDto>>> Get([FromQuery] string? sorting)
        {
            return Ok(await _productoService.GetAll(sorting));
        }

        [HttpGet("{id:int}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ProductoDto>> Get(int id)
        {
            try
            {
                return Ok(await _productoService.GetOneById(id));
            }
            catch
            {
                return NotFound(new { message = $"No se halló un producto con id: {id}" });
            }
        }

        [HttpPost]
        [Authorize(Roles = $"{Roles.ADMIN}")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<ActionResult<ProductoDto>> Post([FromBody] CreateProductoDto createProductoDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var productoCreated = await _productoService.CreateOne(createProductoDto);
            return Created("CreateProducto", productoCreated);
        }

        [HttpPut("{id:int}")]
        [Authorize(Roles = $"{Roles.ADMIN}, {Roles.MOD}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<ActionResult<ProductoDto>> Put(int id, [FromBody] UpdateProductoDto updateProductoDto)
        {
            try
            {
                var productoUpdated = await _productoService.UpdateOneById(id, updateProductoDto);
                return Ok(productoUpdated);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpDelete("{id:int}")]
        [Authorize(Roles = Roles.ADMIN)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<ActionResult> Delete(int id)
        {
            try
            {
                await _productoService.DeleteOneById(id);
                return Ok(new { message = $"El producto con id {id} ha sido eliminado" });
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("usuario/{userId:int}/productos")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]

        public async Task<ActionResult<List<ProductoDto>>> GetAllByUserId(int userId)
        {
            try
            {
                var productos = await _productoService.GetAllByUserId(userId);
                return Ok(productos);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("ofertas")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<List<ProductoDto>>> GetProductsOnDiscount()
        {
            try
            {
                var productos = await _productoService.GetProductsOnDiscount();
                return Ok(productos);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
