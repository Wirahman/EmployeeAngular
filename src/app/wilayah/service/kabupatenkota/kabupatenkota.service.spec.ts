import { TestBed } from '@angular/core/testing';

import { KabupatenkotaService } from './kabupatenkota.service';

describe('KabupatenkotaService', () => {
  let service: KabupatenkotaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KabupatenkotaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
