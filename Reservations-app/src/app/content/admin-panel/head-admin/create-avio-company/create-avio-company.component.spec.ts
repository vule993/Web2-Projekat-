import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAvioCompanyComponent } from './create-avio-company.component';

describe('CreateAvioCompanyComponent', () => {
  let component: CreateAvioCompanyComponent;
  let fixture: ComponentFixture<CreateAvioCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAvioCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAvioCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
