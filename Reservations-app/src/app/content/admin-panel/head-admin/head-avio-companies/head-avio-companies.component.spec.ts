import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadAvioCompaniesComponent } from './head-avio-companies.component';

describe('HeadAvioCompaniesComponent', () => {
  let component: HeadAvioCompaniesComponent;
  let fixture: ComponentFixture<HeadAvioCompaniesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeadAvioCompaniesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadAvioCompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
