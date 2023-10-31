import { TestBed } from '@angular/core/testing';

import { LogActivitiesService } from './log-activities.service';

describe('LogActivitiesService', () => {
  let service: LogActivitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogActivitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
