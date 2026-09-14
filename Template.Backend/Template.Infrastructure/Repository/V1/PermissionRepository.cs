using MapsterMapper;
using Microsoft.EntityFrameworkCore;
using Template.Domain.Contract.Repository.Enitity.v1;
using Template.Domain.Entity;
using Template.Infrastructure.Database;
using Template.Infrastructure.Repository.Base;

namespace Template.Infrastructure.Repository.V1
{
    public class PermissionRepository : RepositoryEFCoreBase<Permission>, IPermissionRepository
    {
        public PermissionRepository(TemplateDbContext dbContext, IMapper mapper) : base(dbContext, mapper)
        {
        }

        public async Task<Permission?> GetByIdAsync(string id, CancellationToken cancellationToken = default)
        {
            return await _dbSet.FirstOrDefaultAsync(p => p.Id == id, cancellationToken);
        }

        public async Task<Permission?> GetByCodeAsync(string code, CancellationToken cancellationToken = default)
        {
            return await _dbSet.FirstOrDefaultAsync(p => p.Code == code, cancellationToken);
        }

        public async Task<List<Permission>> GetByIdsAsync(IEnumerable<string> ids, CancellationToken cancellationToken = default)
        {
            return await _dbSet.Where(p => ids.Contains(p.Id)).ToListAsync(cancellationToken);
        }

        public async Task<List<Permission>> GetAllPermissionsAsync(CancellationToken cancellationToken = default)
        {
            return await _dbSet.ToListAsync(cancellationToken);
        }
    }
}
