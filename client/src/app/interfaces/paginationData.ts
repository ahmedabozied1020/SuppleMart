export interface Pagination {
  total: number;
  limit: number;
  pages: number;
  page: number;
  prev: boolean;
  next: boolean;
}
