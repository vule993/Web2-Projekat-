import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBusinessReportComponent } from './edit-business-report.component';

describe('EditBusinessReportComponent', () => {
  let component: EditBusinessReportComponent;
  let fixture: ComponentFixture<EditBusinessReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditBusinessReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBusinessReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
