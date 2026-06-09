import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayWiseItineraryComponent } from './day-wise-itinerary-component';

describe('DayWiseItineraryComponent', () => {
  let component: DayWiseItineraryComponent;
  let fixture: ComponentFixture<DayWiseItineraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DayWiseItineraryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DayWiseItineraryComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
