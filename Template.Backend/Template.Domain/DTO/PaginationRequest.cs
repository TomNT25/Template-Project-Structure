using System;

namespace Template.Domain.DTO
{
    public class PaginationRequest : CursorPaginationRequest
    {
        [Obsolete("Use Cursor pagination instead of PageNumber")]
        public int PageNumber { get; set; } = 1;
    }
}
