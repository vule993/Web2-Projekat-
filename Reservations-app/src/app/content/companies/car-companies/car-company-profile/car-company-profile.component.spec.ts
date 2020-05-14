import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarCompanyProfileComponent } from './car-company-profile.component';

describe('CarCompanyProfileComponent', () => {
  let component: CarCompanyProfileComponent;
  let fixture: ComponentFixture<CarCompanyProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarCompanyProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarCompanyProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
