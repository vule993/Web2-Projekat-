import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCarStatisticsComponent } from './edit-car-statistics.component';

describe('EditCarStatisticsComponent', () => {
  let component: EditCarStatisticsComponent;
  let fixture: ComponentFixture<EditCarStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCarStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCarStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
