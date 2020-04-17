import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCarProfileComponent } from './edit-car-profile.component';

describe('EditCarProfileComponent', () => {
  let component: EditCarProfileComponent;
  let fixture: ComponentFixture<EditCarProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCarProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCarProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
