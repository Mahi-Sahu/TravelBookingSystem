import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageItinerariesComponent } from './manage-itineraries-component';

describe('ManageItinerariesComponent', () => {
  let component: ManageItinerariesComponent;
  let fixture: ComponentFixture<ManageItinerariesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageItinerariesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ManageItinerariesComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
