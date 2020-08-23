import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOtherServicesComponent } from './edit-other-services.component';

describe('EditOtherServicesComponent', () => {
  let component: EditOtherServicesComponent;
  let fixture: ComponentFixture<EditOtherServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditOtherServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOtherServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
