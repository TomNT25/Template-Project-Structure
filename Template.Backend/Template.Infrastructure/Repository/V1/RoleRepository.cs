using MapsterMapper;
using Microsoft.EntityFrameworkCore;
using Template.Domain.Contract.Repository.Enitity.v1;
using Template.Domain.Entity;
using Template.Helper.Constant;
using Template.Infrastructure.Database;
using Template.Infrastructure.Repository.Base;

namespace Template.Infrastructure.Repository.V1
{
    public class RoleRepository : RepositoryEFCoreBase<Role>, IRoleRepository
    {
        public RoleRepository(TemplateDbContext dbContext, IMapper mapper) : base(dbContext, mapper)
        {
        }

        public async Task<Role?> GetByIdAsync(string id, CancellationToken cancellationToken = default)
        {
            return await _dbSet.FirstOrDefaultAsync(r => r.Id == id, cancellationToken);
        }

        public async Task<Role?> GetByCodeAsync(string code, CancellationToken cancellationToken = default)
        {
            return await _dbSet.FirstOrDefaultAsync(r => r.Code == code, cancellationToken);
        }

        public async Task<Role?> GetDefaultRoleAsync(CancellationToken cancellationToken = default)
        {
            var role = await _dbSet.FirstOrDefaultAsync(r => r.Code == DatabaseConstants.Roles.UserCode || r.Name == DatabaseConstants.Roles.UserName, cancellationToken);
            return role ?? await _dbSet.FirstOrDefaultAsync(cancellationToken);
        }
    }
}
