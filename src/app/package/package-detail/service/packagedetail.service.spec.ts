import { TestBed } from '@angular/core/testing';

import { PackagedetailService } from './packagedetail.service';

describe('PackagedetailService', () => {
  let service: PackagedetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PackagedetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
