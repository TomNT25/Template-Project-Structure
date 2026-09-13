using System.Linq.Expressions;
using Template.Domain.DTO;

namespace Template.Domain.Contract.Repository
{
    public interface IRepository<T>
    {
        Task<T> AddAsync(T entity, CancellationToken cancellationToken = default);
        Task<T?> GetByIDAsync(int id, CancellationToken cancellationToken = default);
        Task<IEnumerable<T>> GetAllAsync(CancellationToken cancellationToken = default);
        Task<PageNumberPaginationResponse<TDto>> GetPageNumberPaginationAsync<TDto>(
            PageNumberPaginationRequest request,
            Expression<Func<T, bool>>? filter,
            CancellationToken cancellationToken = default);
        Task<bool> UpdateAsync(T entity, CancellationToken cancellationToken = default);
        Task<bool> DeleteAsync(T entity, CancellationToken cancellationToken = default);
    }
}
