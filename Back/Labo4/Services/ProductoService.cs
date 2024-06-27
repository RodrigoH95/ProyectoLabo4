using AutoMapper;
using ProyectoLabo4.Models.Productos;
using ProyectoLabo4.Models.Productos.Dto;
using ProyectoLabo4.Repositories;
using System.Linq.Dynamic.Core;
using System.Net;
using System.Web.Http;

namespace ProyectoLabo4.Services
{
    public class ProductoService
    {
        private readonly IMapper _mapper;
        private readonly IProductoRepository _repository;

        public ProductoService(
            IMapper mapper, 
            IProductoRepository productoRepository)
        {
            _mapper = mapper;
            _repository = productoRepository;
        }

        public async Task<List<ProductosDto>> GetAll(string sorting)
        {
            var productos = await _repository.GetAll(sorting);
            return _mapper.Map<List<ProductosDto>>(productos);
        }

        public async Task<List<ProductosDto>> GetProductsOnDiscount()
        {
            var productos = (await _repository.GetAll())
                            .OrderByDescending(p => p.Descuento)
                            .Take(5)
                            .ToList();
            return _mapper.Map<List<ProductosDto>>(productos);
        }

        public async Task<Producto> GetOneById(int id)
        {
            var producto = await GetOneByIdOrException(id);
            return producto;
        }

        private async Task<Producto> GetOneByIdOrException(int id)
        {
            var producto = await _repository.GetOne(p => p.Id == id);
            if (producto == null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
            return producto;
        }

        public async Task<ProductoDto> CreateOne(CreateProductoDto createProductoDto)
        {
            var producto = _mapper.Map<Producto>(createProductoDto);
            await _repository.Add(producto);
            return _mapper.Map<ProductoDto>(producto);
        }

        public async Task<ProductoDto> UpdateOneById(int id, UpdateProductoDto updateProductoDto)
        {
            var producto = await GetOneByIdOrException(id);
            var updated = _mapper.Map(updateProductoDto, producto);
            return _mapper.Map<ProductoDto>(await _repository.Update(updated));
        }

        public async Task DeleteOneById(int id)
        {
            var producto = await GetOneByIdOrException(id);
            await _repository.Delete(producto);
        }
    }
}
