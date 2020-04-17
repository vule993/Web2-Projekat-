import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCarListComponent } from './edit-car-list.component';

describe('EditCarListComponent', () => {
  let component: EditCarListComponent;
  let fixture: ComponentFixture<EditCarListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCarListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCarListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
