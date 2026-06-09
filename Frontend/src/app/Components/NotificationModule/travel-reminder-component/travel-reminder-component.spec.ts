import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelReminderComponent } from './travel-reminder-component';

describe('TravelReminderComponent', () => {
  let component: TravelReminderComponent;
  let fixture: ComponentFixture<TravelReminderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TravelReminderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TravelReminderComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
