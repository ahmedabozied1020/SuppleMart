import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminDeleteProductService {
  constructor(private httpClient: HttpClient) {}

  deleteProduct(id: string): Observable<{ success: string; error: string }> {
    return this.httpClient.delete<{ success: string; error: string }>(
      `http://localhost:5000/products/${id}`
    );
  }
}
