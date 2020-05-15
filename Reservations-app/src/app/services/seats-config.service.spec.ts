import { TestBed } from '@angular/core/testing';

import { SeatsConfigService } from './seats-config.service';

describe('SeatsConfigService', () => {
  let service: SeatsConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeatsConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
