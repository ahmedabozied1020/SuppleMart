import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginatedProductsResponse } from '../../../interfaces/PaginatedProductsResponse';
import { FilterParamsService } from '../filter-params/filter-params.service';

@Injectable({
  providedIn: 'root',
})
export class PaginatedProductsService {
  private baseUrl = 'http://localhost:5000/products/shop';

  constructor(
    private http: HttpClient,
    private filterParamsService: FilterParamsService
  ) {}

  getProducts(): Observable<PaginatedProductsResponse> {
    const params = this.filterParamsService.getHttpParams();
    return this.http.get<PaginatedProductsResponse>(this.baseUrl, { params });
  }
}
