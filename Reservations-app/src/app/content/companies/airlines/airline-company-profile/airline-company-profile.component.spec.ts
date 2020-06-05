import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AirlineCompanyProfileComponent } from './airline-company-profile.component';

describe('AirlineCompanyProfileComponent', () => {
  let component: AirlineCompanyProfileComponent;
  let fixture: ComponentFixture<AirlineCompanyProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AirlineCompanyProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AirlineCompanyProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
