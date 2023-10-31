import { TestBed } from '@angular/core/testing';

import { TermOfPaymentsService } from './term-of-payments.service';

describe('TermOfPaymentsService', () => {
  let service: TermOfPaymentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TermOfPaymentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
