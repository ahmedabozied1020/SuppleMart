import { TestBed } from '@angular/core/testing';

import { AdminProductRequestsService } from './admin-product-requests.service';

describe('AdminProductRequestsService', () => {
  let service: AdminProductRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminProductRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
