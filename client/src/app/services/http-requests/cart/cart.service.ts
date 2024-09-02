import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../../interfaces/product';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private httpClient: HttpClient) { }
  
  getProductsByIds(productsIds: string[]): Observable<Product[]> {
    return this.httpClient.post<Product[]>(
      'http://localhost:5000/products/getByIds', productsIds
    );
  }
}
