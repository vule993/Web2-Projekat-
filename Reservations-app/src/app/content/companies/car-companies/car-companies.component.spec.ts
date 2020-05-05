import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarCompaniesComponent } from './car-companies.component';

describe('CarCompaniesComponent', () => {
  let component: CarCompaniesComponent;
  let fixture: ComponentFixture<CarCompaniesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarCompaniesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarCompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
