using System.Collections.Generic;

namespace Template.Domain.DTO
{
    public class CursorPaginationResponse<T>
    {
        public IEnumerable<T> Items { get; set; } = new List<T>();
        public string? NextCursor { get; set; }
        public bool HasNextPage { get; set; }
        public int PageSize { get; set; }

        public CursorPaginationResponse()
        {
        }

        public CursorPaginationResponse(IEnumerable<T> items, string? nextCursor, bool hasNextPage, int pageSize)
        {
            Items = items;
            NextCursor = nextCursor;
            HasNextPage = hasNextPage;
            PageSize = pageSize;
        }
    }
}
