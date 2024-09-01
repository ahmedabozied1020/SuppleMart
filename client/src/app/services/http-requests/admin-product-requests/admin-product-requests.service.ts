import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminProductRequestsService {
  constructor(private httpClient: HttpClient) {}

  addProduct(
    product: FormData
  ): Observable<{ success: string; error: string }> {
    return this.httpClient.post<{ success: string; error: string }>(
      'http://localhost:5000/products',
      product
    );
  }
}
