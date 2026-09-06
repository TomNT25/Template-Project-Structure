using Template.Domain.Contract.Repository;
using System;
using System.Collections.Generic;
using System.Text;
using Template.Domain.DTO;
using System.Linq.Expressions;

namespace Template.Infrastructure.Repository.Base
{
    public abstract class Repository<T> : IRepository<T> where T : class
    {
        public abstract Task<T> AddAsync(T entity, CancellationToken cancellationToken = default);
        public abstract Task<bool> DeleteAsync(T entity, CancellationToken cancellationToken = default);
        public abstract Task<IEnumerable<T>> GetAllAsync(CancellationToken cancellationToken = default);
        public abstract Task<T?> GetByIDAsync(int id, CancellationToken cancellationToken = default);

        public Task<CursorPaginationResponse<TDto>> GetPagedAsync<TDto>(CursorPaginationRequest request, Expression<Func<T, bool>>? filter, CancellationToken cancellationToken = default)
        {
            throw new NotImplementedException();
        }

        public abstract Task<bool> UpdateAsync(T entity, CancellationToken cancellationToken = default);
    }
}