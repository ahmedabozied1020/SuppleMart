import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { getTokenFromLocalStorage } from '../../../utils/local-storage';

@Injectable({
  providedIn: 'root',
})
export class AdminDeleteProductService {
  constructor(private httpClient: HttpClient) {}

  deleteProduct(id: string): Observable<{ success: string; error: string }> {
    const header = {
      headers: new HttpHeaders().set(
        'Authorization',
        getTokenFromLocalStorage()
      ),
    };

    return this.httpClient.delete<{ success: string; error: string }>(
      `http://localhost:5000/products/${id}`,
      header
    );
  }
}
