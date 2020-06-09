import { TestBed } from '@angular/core/testing';

import { SelectedseatsService } from './selectedseats.service';

describe('SelectedseatsService', () => {
  let service: SelectedseatsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectedseatsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
