import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCarPricesComponent } from './edit-car-prices.component';

describe('EditCarPricesComponent', () => {
  let component: EditCarPricesComponent;
  let fixture: ComponentFixture<EditCarPricesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCarPricesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCarPricesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
