using System.Collections.Generic;

namespace Template.Domain.DTO
{
    public class CursorPaginationResponse<T> : PaginationResponse<T>
    {
        public string? NextCursor { get; init; }
        public bool HasNextPage { get; init; }
    }
}
