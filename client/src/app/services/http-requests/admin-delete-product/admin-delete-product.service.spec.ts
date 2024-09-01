import { TestBed } from '@angular/core/testing';

import { AdminDeleteProductService } from './admin-delete-product.service';

describe('AdminDeleteProductService', () => {
  let service: AdminDeleteProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminDeleteProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
