import { TestBed } from '@angular/core/testing';

import { KlinikService } from './klinik.service';

describe('KlinikService', () => {
  let service: KlinikService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KlinikService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
