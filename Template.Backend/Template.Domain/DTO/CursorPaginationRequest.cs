using System;

namespace Template.Domain.DTO
{
    public class CursorPaginationRequest
    {
        private const int MaxPageSize = 100;
        private int _pageSize = 10;

        /// <summary>
        /// Opaque cursor string representing the position after which to fetch results.
        /// </summary>
        public string? Cursor { get; set; }

        public int PageSize
        {
            get => _pageSize;
            set => _pageSize = value > MaxPageSize ? MaxPageSize : (value < 1 ? 1 : value);
        }

        public string? SearchTerm { get; set; }
        public string? SortColumn { get; set; }
        public bool SortDescending { get; set; }
    }
}
