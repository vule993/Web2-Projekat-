import { TestBed } from '@angular/core/testing';

import { PlaneServicesService } from './plane-services.service';

describe('PlaneServicesService', () => {
  let service: PlaneServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlaneServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
