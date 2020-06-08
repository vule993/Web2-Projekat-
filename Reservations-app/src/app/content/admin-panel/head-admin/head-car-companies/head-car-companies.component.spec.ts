import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadCarCompaniesComponent } from './head-car-companies.component';

describe('HeadCarCompaniesComponent', () => {
  let component: HeadCarCompaniesComponent;
  let fixture: ComponentFixture<HeadCarCompaniesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeadCarCompaniesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadCarCompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
