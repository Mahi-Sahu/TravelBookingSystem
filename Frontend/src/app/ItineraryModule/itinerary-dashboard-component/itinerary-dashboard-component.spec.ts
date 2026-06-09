import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItineraryDashboardComponent } from './itinerary-dashboard-component';

describe('ItineraryDashboardComponent', () => {
  let component: ItineraryDashboardComponent;
  let fixture: ComponentFixture<ItineraryDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItineraryDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItineraryDashboardComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
