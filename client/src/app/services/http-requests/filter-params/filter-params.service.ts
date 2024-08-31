import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Route } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilterParamsService {
  private filtersSubject = new BehaviorSubject<any>({});

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
}
