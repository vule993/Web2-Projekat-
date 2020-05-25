import { TestBed } from '@angular/core/testing';

import { AviocompaniesService } from './aviocompanies.service';

describe('AviocompaniesService', () => {
  let service: AviocompaniesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AviocompaniesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
