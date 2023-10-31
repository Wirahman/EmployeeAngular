import { TestBed } from '@angular/core/testing';

import { ContractHeaderService } from './contract-header.service';

describe('ContractHeaderService', () => {
  let service: ContractHeaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContractHeaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
