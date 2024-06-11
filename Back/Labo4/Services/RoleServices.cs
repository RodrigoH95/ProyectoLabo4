using System.Net;
using System.Web.Http;
using ProyectoLabo4.Models.Role;
using ProyectoLabo4.Repositories;

namespace ProyectoLabo4.Services
{
    public class RoleServices
    {
        private readonly IRoleRepository _roleRepo;

        public RoleServices(IRoleRepository roleRepo)
        {
            _roleRepo = roleRepo;
        }

        public async Task<Role> GetByName(string name)
        {
            var role = await _roleRepo.GetOne(r => r.Name == name);
            if (role == null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
            return role;
        }

        public async Task<List<Role>> GetByIds(List<int> roleIds)
        {
            if (roleIds == null || roleIds.Count == 0)
            {
                throw new HttpResponseException(HttpStatusCode.BadRequest);
            }
            var roles = await _roleRepo.GetAll(r => roleIds.Contains(r.Id));
            return roles.ToList();
        }
    }
}
