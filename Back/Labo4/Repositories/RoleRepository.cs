using ProyectoLabo4.Models.Role;
using ProyectoLabo4.Services;

namespace ProyectoLabo4.Repositories
{
    public interface IRoleRepository : IRepository<Role> { }
    public class RoleRepository : Repository<Role>, IRoleRepository
    {
        public RoleRepository(ApplicationDbContext db) : base(db) { }
    }
}
