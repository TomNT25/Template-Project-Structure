using Template.Domain.Entity;

namespace Template.Domain.Contract.Repository.Enitity.v1
{
    public interface IRoleRepository : IRepository<Role>
    {
        Task<Role?> GetByCodeAsync(string code, CancellationToken cancellationToken = default);
        Task<Role?> GetDefaultRoleAsync(CancellationToken cancellationToken = default);
    }
}
