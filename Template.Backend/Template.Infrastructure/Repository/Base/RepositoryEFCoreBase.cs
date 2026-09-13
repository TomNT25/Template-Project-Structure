using Mapster;
using MapsterMapper;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using Template.Domain.Contract.Repository;
using Template.Domain.DTO;
using Template.Infrastructure.Database;
using Template.Infrastructure.Extension;

namespace Template.Infrastructure.Repository.Base
{
    public abstract class RepositoryEFCoreBase<T> : IRepository<T> where T : class
    {
        protected readonly TemplateDbContext _templateDbContext;
        protected readonly DbSet<T> _dbSet;
        protected readonly IMapper _mapper;

        public RepositoryEFCoreBase(
            TemplateDbContext templateDbcontext,
            IMapper mapper)
        {
            _templateDbContext = templateDbcontext;
            _dbSet = _templateDbContext.Set<T>();
            _mapper = mapper;
        }

        public async Task<T> AddAsync(T entity, CancellationToken cancellationToken = default)
        {
            await _dbSet.AddAsync(entity, cancellationToken);
            await _templateDbContext.SaveChangesAsync(cancellationToken);
            return entity;
        }

        public Task<bool> DeleteAsync(T entity, CancellationToken cancellationToken = default)
        {
            _dbSet.Remove(entity);
            _templateDbContext.SaveChangesAsync(cancellationToken);
            return Task.FromResult(true);
        }

        public async Task<IEnumerable<T>> GetAllAsync(CancellationToken cancellationToken = default)
        {
            return await _dbSet.ToListAsync(cancellationToken);
        }

        public async Task<T?> GetByIDAsync(int id, CancellationToken cancellationToken = default)
        {
            return await _dbSet.FindAsync(new object[] { id }, cancellationToken);
        }

        public async Task<PageNumberPaginationResponse<TDto>> GetPageNumberPaginationAsync<TDto>(
            PageNumberPaginationRequest request,
            Expression<Func<T, bool>>? filter,
            CancellationToken cancellationToken = default
        )
        {
            var query = _dbSet.AsNoTracking();

            if (filter != null)
            {
                query = query.Where(filter);
            }

            var totalRecords = await query.CountAsync(cancellationToken);

            var sortCol = string.IsNullOrWhiteSpace(request.SortColumn) ? "Id" : request.SortColumn;

            query = query.OrderByDynamic(sortCol, request.SortDescending);

            var pageNumber = request.PageNumber < 1 ? 1 : request.PageNumber;
            var pageSize = request.PageSize < 1 ? 10 : request.PageSize;
            var skip = (pageNumber - 1) * pageSize;

            var items = await query
                .Skip(skip)
                .Take(pageSize)
                .ProjectToType<TDto>()
                .ToListAsync(cancellationToken);

            var totalPages = (int)Math.Ceiling(totalRecords / (double)pageSize);
            var result = new PageNumberPaginationResponse<TDto>()
            {
                Items = items,
                PageNumber = pageNumber,
                PageSize = pageSize,
                TotalRecords = totalRecords,
                TotalPages = totalPages,
                HasNextPage = pageNumber < totalPages,
                HasPreviousPage = pageNumber > 1
            };

            return result;
        }

        public async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            return await _templateDbContext.SaveChangesAsync(cancellationToken);
        }

        public Task<bool> UpdateAsync(T entity, CancellationToken cancellationToken = default)
        {
            _templateDbContext.Entry(entity).State = EntityState.Modified;
            _templateDbContext.SaveChangesAsync(cancellationToken);
            return Task.FromResult(true);
        }
    }
}
