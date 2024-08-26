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
    serchQuery: '',
  });

  filters$ = this.filtersSubject.asObservable();

  seFilters(filters: any) {
    this.filtersSubject.next(filters);
  }

  constructor() {}
}
