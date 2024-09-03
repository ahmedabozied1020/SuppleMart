import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { getTokenFromLocalStorage } from '../../../utils/local-storage';

@Injectable({
  providedIn: 'root',
})
export class AdminProductRequestsService {
  constructor(private httpClient: HttpClient) {}

  addProduct(
    product: FormData
  ): Observable<{ success: string; error: string }> {
    const header = {
      headers: new HttpHeaders().set(
        'Authorization',
        getTokenFromLocalStorage()
      ),
    };

    return this.httpClient.post<{ success: string; error: string }>(
      'http://localhost:5000/products',
      product,
      header
    );
  }

  editProduct(
    id: string,
    product: FormData
  ): Observable<{ success: string; error: string }> {
    const header = {
      headers: new HttpHeaders().set(
        'Authorization',
        getTokenFromLocalStorage()
      ),
    };

    return this.httpClient.patch<{ success: string; error: string }>(
      `http://localhost:5000/products/${id}`,
      product,
      header
    );
  }
}
