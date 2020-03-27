import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsDataListComponent } from './friends-data-list.component';

describe('FriendsDataListComponent', () => {
  let component: FriendsDataListComponent;
  let fixture: ComponentFixture<FriendsDataListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendsDataListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendsDataListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
