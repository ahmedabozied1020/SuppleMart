import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilterParamsService {
  private filtersSubject = new BehaviorSubject<any>({
    category: 'all',
    page: 1,
    limit: 12,
    minPrice: 0,
    maxPrice: 1000,
    minRating: 0,
    searchQuery: '',
  });

  filters$ = this.filtersSubject.asObservable();

  setFilters(newFilters: any) {
    const currentFilters = this.filtersSubject.value;
    const updatedFilters = { ...currentFilters, ...newFilters };
    this.filtersSubject.next(updatedFilters);
  }

  getHttpParams() {
    const filters = this.filtersSubject.value;
    let params = new HttpParams();
    for (const key in filters) {
      params = params.set(key, filters[key]);
    }
    return params;
  }

  constructor() {}
}
