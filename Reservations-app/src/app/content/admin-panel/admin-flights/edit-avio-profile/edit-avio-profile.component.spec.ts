import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { EditavioProfileComponent } from "./edit-avio-profile.component";

describe("EditAvioProfileComponent", () => {
  let component: EditavioProfileComponent;
  let fixture: ComponentFixture<EditavioProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditavioProfileComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditavioProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
