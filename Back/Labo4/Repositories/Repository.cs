using Microsoft.EntityFrameworkCore;
using ProyectoLabo4.Services;
using System.Linq.Expressions;

namespace ProyectoLabo4.Repositories
{
    public interface IRepository<T> where T : class
    {
        Task<IEnumerable<T>> GetAll(Expression<Func<T, bool>>? filter = null);
        Task<T?> GetOne(Expression<Func<T, bool>>? filter = null);
        Task Add(T entity);
        Task<T> Update(T entity);
        Task Delete(T entity);
        Task Save();
    }

    public class Repository<T> : IRepository<T> where T : class
    {
        private readonly ApplicationDbContext _db;
        internal DbSet<T> dbSet;

        public Repository(ApplicationDbContext db)
        {
            _db = db;
            dbSet = _db.Set<T>();
        }

        public async Task<IEnumerable<T>> GetAll(Expression<Func<T, bool>>? filter = null)
        {
            IQueryable<T> query = dbSet;
            if (filter != null)
            {
                query = query.Where(filter);
            }
            return await query.ToListAsync();
        }

        public async Task Add(T entity)
        {
            await dbSet.AddAsync(entity);
            await Save();
        }

        public async Task<T?> GetOne(Expression<Func<T, bool>>? filter = null)
        {
            IQueryable<T> query = dbSet;
            return await query.FirstOrDefaultAsync(filter!);
        }

        public async Task<T> Update(T entity)
        {
            dbSet.Update(entity);
            await Save();
            return entity;
        }

        public async Task Delete(T entity)
        {
            dbSet.Remove(entity);
            await Save();
        }

        public async Task Save()
        {
            await _db.SaveChangesAsync();
        }
    }
}
