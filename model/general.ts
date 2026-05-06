export interface ApiResponse<T> {
  success: boolean;
  data: T[];
  pagination: Pagination;
}

export interface Pagination {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
}
