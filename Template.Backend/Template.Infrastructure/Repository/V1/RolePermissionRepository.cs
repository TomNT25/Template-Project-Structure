using MapsterMapper;
using Microsoft.EntityFrameworkCore;
using Template.Domain.Contract.Repository.Enitity.v1;
using Template.Domain.Entity;
using Template.Infrastructure.Database;
using Template.Infrastructure.Repository.Base;

namespace Template.Infrastructure.Repository.V1
{
    public class RolePermissionRepository : RepositoryEFCoreBase<RolePermission>, IRolePermissionRepository
    {
        public RolePermissionRepository(TemplateDbContext dbContext, IMapper mapper) : base(dbContext, mapper)
        {
        }

        public async Task<List<RolePermission>> GetByRoleIdAsync(string roleId, CancellationToken cancellationToken = default)
        {
            return await _dbSet
                .Include(rp => rp.Permission)
                .Where(rp => rp.RoleId == roleId)
                .ToListAsync(cancellationToken);
        }

        public async Task<List<RolePermission>> GetByRoleAndPermissionIdsAsync(string roleId, IEnumerable<string> permissionIds, CancellationToken cancellationToken = default)
        {
            return await _dbSet
                .Where(rp => rp.RoleId == roleId && permissionIds.Contains(rp.PermissionId))
                .ToListAsync(cancellationToken);
        }
    }
}
