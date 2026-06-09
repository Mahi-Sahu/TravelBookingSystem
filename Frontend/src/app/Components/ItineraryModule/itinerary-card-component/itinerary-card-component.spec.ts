import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItineraryCardComponent } from './itinerary-card-component';

describe('ItineraryCardComponent', () => {
  let component: ItineraryCardComponent;
  let fixture: ComponentFixture<ItineraryCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItineraryCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ItineraryCardComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
