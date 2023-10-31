import { TestBed } from '@angular/core/testing';

import { PelangganService } from './pelanggan.service';

describe('PelangganService', () => {
  let service: PelangganService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PelangganService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
