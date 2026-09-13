using System;

namespace Template.Domain.DTO
{
    public class CursorPaginationRequest : PaginationRequest
    {
        public string? Cursor { get; set; }
    }
}
