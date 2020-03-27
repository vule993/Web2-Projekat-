import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationsDataListComponent } from './reservations-data-list.component';

describe('ReservationsDataListComponent', () => {
  let component: ReservationsDataListComponent;
  let fixture: ComponentFixture<ReservationsDataListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservationsDataListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationsDataListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
