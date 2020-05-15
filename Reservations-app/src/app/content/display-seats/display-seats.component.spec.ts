import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplaySeatsComponent } from './display-seats.component';

describe('DisplaySeatsComponent', () => {
  let component: DisplaySeatsComponent;
  let fixture: ComponentFixture<DisplaySeatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplaySeatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplaySeatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
