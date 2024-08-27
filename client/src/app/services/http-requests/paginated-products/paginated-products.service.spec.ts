import { TestBed } from '@angular/core/testing';

import { PaginatedProductsService } from './paginated-products.service';

describe('PaginatedProductsService', () => {
  let service: PaginatedProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaginatedProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
