import { TestBed } from '@angular/core/testing';

import { AuthenticationRequestsService } from './authentication-requests.service';

describe('AuthenticationRequestsService', () => {
  let service: AuthenticationRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthenticationRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
