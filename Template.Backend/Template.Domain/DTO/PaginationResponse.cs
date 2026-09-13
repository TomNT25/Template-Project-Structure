using System.Collections.Generic;

namespace Template.Domain.DTO
{
    public abstract class PaginationResponse<T>
    {
        public IEnumerable<T> Items { get; init; } = [];
        public int PageSize { get; init; }
    }
}
