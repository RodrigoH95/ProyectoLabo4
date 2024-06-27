using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using ProyectoLabo4.Models.Users;
using ProyectoLabo4.Services;
using ProyectoLabo4.Models.Productos;

namespace ProyectoLabo4.Repositories
{
    public interface IUserRepository : IRepository<User> { }

    public class UserRepository : Repository<User>, IUserRepository
    {
        public UserRepository(ApplicationDbContext db) : base(db) { }

        public new async Task<User> GetOne(Expression<Func<User, bool>>? filter = null)
        {
            IQueryable<User> query = dbSet;
            if (filter != null)
            {
                query = query.Where(filter);
            }
            query = query.Include(u => u.Roles).Include(u => u.ProductoUsuarios);
            return await query.FirstOrDefaultAsync(filter);
        }
    }
}
