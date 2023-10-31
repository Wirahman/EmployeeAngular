import { TestBed } from '@angular/core/testing';

import { DesakelurahanService } from './desakelurahan.service';

describe('DesakelurahanService', () => {
  let service: DesakelurahanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DesakelurahanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
