using MapsterMapper;
using Microsoft.EntityFrameworkCore;
using Template.Domain.Contract.Repository.Enitity.v1;
using Template.Domain.Entity;
using Template.Infrastructure.Database;
using Template.Infrastructure.Repository.Base;

namespace Template.Infrastructure.Repository.V1
{
    public class UserRepository : RepositoryEFCoreBase<User>, IUserRepository
    {
        public UserRepository(TemplateDbContext dbContext, IMapper mapper) : base(dbContext, mapper)
        {
        }

        public async Task<User?> GetByEmailAsync(string email, CancellationToken cancellationToken = default)
        {
            return await _dbSet
                .Include(e => e.Role)
                .Include(e => e.UserPermissions)
                .ThenInclude(e => e.Permission)
                .FirstOrDefaultAsync(u => u.Email == email, cancellationToken);
        }

        public async Task<User?> GetByIdAsync(string id, CancellationToken cancellationToken = default)
        {
            return await _dbSet
                .Include(e => e.Role)
                .Include(e => e.UserPermissions)
                .ThenInclude(e => e.Permission)
                .FirstOrDefaultAsync(u => u.Id == id, cancellationToken);
        }

        public async Task<User?> GetByUsernameAsync(string username, CancellationToken cancellationToken = default)
        {
            return await _dbSet
                .Include(e => e.Role)
                .Include(e => e.UserPermissions)
                .ThenInclude(e => e.Permission)
                .FirstOrDefaultAsync(u => u.Username == username, cancellationToken);
        }
    }
}
