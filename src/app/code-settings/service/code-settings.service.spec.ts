import { TestBed } from '@angular/core/testing';

import { CodeSettingsService } from './code-settings.service';

describe('CodeSettingsService', () => {
  let service: CodeSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CodeSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
