import { TestBed } from '@angular/core/testing';

import { SelectedcompanyService } from './selectedcompany.service';

describe('SelectedcompanyService', () => {
  let service: SelectedcompanyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectedcompanyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
