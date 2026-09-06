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

        public async Task<CursorPaginationResponse<TDto>> GetPagedAsync<TDto>(
            CursorPaginationRequest request, 
            Expression<Func<T, bool>>? filter, 
            CancellationToken cancellationToken = default)
        {
            var query = _dbSet.AsNoTracking();

            // 1. Apply Filtering (e.g., SearchTerm)
            if (filter != null)
            {
                query = query.Where(filter);
            }

            // 2. Apply Cursor Filter
            query = query.ApplyCursorFilter(request.Cursor, request.SortColumn, request.SortDescending);

            // 3. Apply Dynamic Sorting (defaulting to Id)
            var sortCol = string.IsNullOrWhiteSpace(request.SortColumn) ? "Id" : request.SortColumn;
            query = query.OrderByDynamic(sortCol, request.SortDescending);

            // 4. Fetch (PageSize + 1) items to check for Next Page without CountAsync()
            var rawItems = await query
                .Take(request.PageSize + 1)
                .ProjectToType<TDto>()
                .ToListAsync(cancellationToken);

            bool hasNextPage = rawItems.Count > request.PageSize;
            var items = hasNextPage ? rawItems.Take(request.PageSize).ToList() : rawItems;

            // 5. Generate opaque NextCursor token from last item if next page exists
            string? nextCursor = null;
            if (hasNextPage && items.Count > 0)
            {
                var lastItem = items[items.Count - 1];
                var propInfo = typeof(TDto).GetProperty(sortCol) ?? typeof(TDto).GetProperty("Id");
                if (propInfo != null)
                {
                    var val = propInfo.GetValue(lastItem)?.ToString();
                    if (!string.IsNullOrEmpty(val))
                    {
                        nextCursor = Convert.ToBase64String(System.Text.Encoding.UTF8.GetBytes(val));
                    }
                }
            }

            return new CursorPaginationResponse<TDto>(items, nextCursor, hasNextPage, request.PageSize);
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