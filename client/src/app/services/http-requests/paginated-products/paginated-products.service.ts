import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginatedProductsResponse } from '../../../interfaces/PaginatedProductsResponse';

@Injectable({
  providedIn: 'root',
})
export class PaginatedProductsService {
  constructor(private httpClient: HttpClient) {}

  getProducts(
    category: string = 'all',
    page: number = 1,
    limit: number = 12,
    minPrice?: number,
    maxPrice?: number,
    minRating?: number,
    searchQuery: string = ''
  ): Observable<PaginatedProductsResponse> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString())
      .set('search', searchQuery);

    if (minPrice !== undefined) {
      params = params.set('minPrice', minPrice.toString());
    }
    if (maxPrice !== undefined) {
      params = params.set('maxPrice', maxPrice.toString());
    }
    if (minRating !== undefined) {
      params = params.set('minRating', minRating.toString());
    }

    const url = `http://localhost:5000/products/shop/${category}`;
    return this.httpClient.get<PaginatedProductsResponse>(url, { params });
  }
}
