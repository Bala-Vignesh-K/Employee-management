import { TestBed } from '@angular/core/testing';

import { AddAdminApiService } from './add-admin-api.service';

describe('AddAdminApiService', () => {
  let service: AddAdminApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddAdminApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
