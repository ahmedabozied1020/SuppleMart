import { Pagination } from './paginationData';
import { Product } from './product';

export interface PaginatedProductsResponse {
  paginatedProducts: Product[];
  pagination: Pagination;
}
