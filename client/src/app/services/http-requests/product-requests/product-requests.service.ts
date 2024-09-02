import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class ProductRequestsService {
  constructor(private httpClient: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>('http://localhost:5000/products/');
  }

  getProductById(
    id: string
  ): Observable<{ success: string; product: Product; error: string }> {
    return this.httpClient.get<{
      success: string;
      product: Product;
      error: string;
    }>(`http://localhost:5000/products/${id}`);
  }
}
