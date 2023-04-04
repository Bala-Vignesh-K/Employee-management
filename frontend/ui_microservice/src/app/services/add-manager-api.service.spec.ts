import { TestBed } from '@angular/core/testing';

import { AddManagerApiService } from './add-manager-api.service';

describe('AddManagerApiService', () => {
  let service: AddManagerApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddManagerApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
