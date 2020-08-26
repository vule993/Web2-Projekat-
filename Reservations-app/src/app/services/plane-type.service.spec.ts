import { TestBed } from '@angular/core/testing';

import { PlaneTypeService } from './plane-type.service';

describe('PlaneTypeService', () => {
  let service: PlaneTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlaneTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
