import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { EditAvioProfileComponent } from "./edit-avio-profile.component";

describe("EditAvioProfileComponent", () => {
  let component: EditAvioProfileComponent;
  let fixture: ComponentFixture<EditAvioProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditAvioProfileComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAvioProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
