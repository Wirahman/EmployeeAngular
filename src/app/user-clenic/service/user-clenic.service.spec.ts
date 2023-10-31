import { TestBed } from '@angular/core/testing';

import { UserClenicService } from './user-clenic.service';

describe('UserClenicService', () => {
  let service: UserClenicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserClenicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
