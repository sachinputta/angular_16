import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllcustomersComponent } from './allcustomers.component';

describe('AllcustomersComponent', () => {
  let component: AllcustomersComponent;
  let fixture: ComponentFixture<AllcustomersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllcustomersComponent]
    });
    fixture = TestBed.createComponent(AllcustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
