using Microsoft.EntityFrameworkCore;
using ProyectoLabo4.Models.Productos;
using ProyectoLabo4.Models.Users;
using ProyectoLabo4.Services;
using System.Linq.Dynamic.Core;
using System.Linq.Expressions;

namespace ProyectoLabo4.Repositories
{
    public interface IProductoRepository : IRepository<Producto> 
    {
        Task<IEnumerable<Producto>> GetAll(string sorting);
    }
    public class ProductoRepository : Repository<Producto>, IProductoRepository
    {
        public ProductoRepository(ApplicationDbContext db) : base(db)
        {
        }

        public new async Task<Producto> GetOne(Expression<Func<Producto, bool>>? filter = null)
        {
            IQueryable<Producto> query = dbSet;
            if (filter != null)
            {
                query = query.Where(filter);
            }
            return await query.FirstOrDefaultAsync(filter);
        }

        public async Task<IEnumerable<Producto>> GetAll(string? sorting)
        {
            IQueryable<Producto> query = dbSet.Include(p => p.ProductoUsuarios);
            if (sorting != null)
            {
                Dictionary<string, string> sortingMap = new Dictionary<string, string>
                {
                    { "id", nameof(Producto.Id) },
                    { "nombre", nameof(Producto.Nombre) },
                    { "descripcion", nameof(Producto.Descripcion) },
                    { "precio", nameof(Producto.Precio) },
                    { "descuento", nameof(Producto.Descuento) },
                    { "puntaje", nameof(Producto.Puntaje) }
                };

                string sort;

                if (!string.IsNullOrEmpty(sorting) && sortingMap.ContainsKey(sorting!.ToLower().Split(" ")[0]))
                {
                    string sortKey = sorting.ToLower().Split(" ")[0];
                    sort = sorting.Replace(sortKey, sortingMap.GetValueOrDefault(sortKey), StringComparison.OrdinalIgnoreCase);
                }
                else
                {
                    sort = $"{nameof(Producto.Id)} DESC";
                }
                query = query.OrderBy(sort);
            }
            return await query.ToListAsync();
        }
    }
}
