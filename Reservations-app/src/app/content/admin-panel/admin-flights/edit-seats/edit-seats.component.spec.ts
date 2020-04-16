import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSeatsComponent } from './edit-seats.component';

describe('EditSeatsComponent', () => {
  let component: EditSeatsComponent;
  let fixture: ComponentFixture<EditSeatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSeatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSeatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
