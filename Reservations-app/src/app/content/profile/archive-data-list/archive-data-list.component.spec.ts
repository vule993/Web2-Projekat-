import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiveDataListComponent } from './archive-data-list.component';

describe('ArchiveDataListComponent', () => {
  let component: ArchiveDataListComponent;
  let fixture: ComponentFixture<ArchiveDataListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchiveDataListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchiveDataListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
