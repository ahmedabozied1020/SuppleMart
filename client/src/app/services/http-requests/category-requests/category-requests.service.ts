import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../../../interfaces/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryRequestsService {

  constructor(private httpClient: HttpClient) { }

  getCategories(): Observable<Category[]>{
    return this.httpClient.get<Category[]>('http://localhost:5000/products/categories');
  }
}
