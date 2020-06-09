import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AirlineReservationComponent } from './airline-reservation.component';

describe('AirlineReservationComponent', () => {
  let component: AirlineReservationComponent;
  let fixture: ComponentFixture<AirlineReservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AirlineReservationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AirlineReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
