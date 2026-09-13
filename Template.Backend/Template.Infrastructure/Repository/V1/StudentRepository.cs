using MapsterMapper;
using Microsoft.Data.SqlClient;
using Template.Domain.Contract.Repository.Enitity.v1;
using Template.Domain.Contract.Repository.Enitity.v2;
using Template.Domain.Entity;
using Template.Helper.ExceptionHandler;
using Template.Infrastructure.Database;
using Template.Infrastructure.Repository.Base;

namespace Template.Infrastructure.Repository.V1;

public class StudentRepository : RepositoryEFCoreBase<Student>, IStudentRepository
{
    public StudentRepository(
        TemplateDbContext templateDbContext,
        IMapper mapper) : base(templateDbContext, mapper)
    {
    }

    public async Task<Student?> GetByIdAsync(string id, CancellationToken cancellationToken = default)
    {
        return await _dbSet.FindAsync(new object[] { id }, cancellationToken);
    }
}