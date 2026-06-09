import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingDynamicFormComponent } from './booking-dynamic-form-component';

describe('BookingDynamicFormComponent', () => {
  let component: BookingDynamicFormComponent;
  let fixture: ComponentFixture<BookingDynamicFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingDynamicFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BookingDynamicFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
