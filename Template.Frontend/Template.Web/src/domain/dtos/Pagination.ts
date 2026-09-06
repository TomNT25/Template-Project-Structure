export interface CursorPaginationRequest {
  cursor?: string;
  pageSize: number;
  searchTerm?: string;
  sortColumn?: string;
  sortDescending?: boolean;
}

export interface CursorPaginationResponse<T> {
  items: T[];
  nextCursor?: string | null;
  hasNextPage: boolean;
  pageSize: number;
}

export interface PaginationRequest extends CursorPaginationRequest {
  pageIndex?: number;
}

export interface PaginationResponse<T> extends CursorPaginationResponse<T> {
  totalCount?: number;
  pageIndex?: number;
  totalPages?: number;
}
