using MapsterMapper;
using Microsoft.EntityFrameworkCore;
using Template.Domain.Contract.Repository.Enitity.v1;
using Template.Domain.Entity;
using Template.Infrastructure.Database;
using Template.Infrastructure.Repository.Base;

namespace Template.Infrastructure.Repository.V1
{
    public class UserRoleRepository : RepositoryEFCoreBase<UserRole>, IUserRoleRepository
    {
        public UserRoleRepository(TemplateDbContext dbContext, IMapper mapper) : base(dbContext, mapper)
        {
        }

        public async Task<List<UserRole>> GetByUserIdAsync(string userId, CancellationToken cancellationToken = default)
        {
            return await _dbSet
                .Include(ur => ur.Role)
                .Where(ur => ur.UserId == userId)
                .ToListAsync(cancellationToken);
        }

        public async Task<List<UserRole>> GetByUserAndRoleIdsAsync(string userId, IEnumerable<string> roleIds, CancellationToken cancellationToken = default)
        {
            return await _dbSet
                .Where(ur => ur.UserId == userId && roleIds.Contains(ur.RoleId))
                .ToListAsync(cancellationToken);
        }
    }
}
