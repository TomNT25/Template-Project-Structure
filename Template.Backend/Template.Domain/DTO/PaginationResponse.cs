using System.Collections.Generic;

namespace Template.Domain.DTO
{
    public class PaginationResponse<T> : CursorPaginationResponse<T>
    {
        public int TotalRecords { get; set; }

        public PaginationResponse()
        {
        }

        public PaginationResponse(IEnumerable<T> items, string? nextCursor, bool hasNextPage, int pageSize)
            : base(items, nextCursor, hasNextPage, pageSize)
        {
        }
    }
}