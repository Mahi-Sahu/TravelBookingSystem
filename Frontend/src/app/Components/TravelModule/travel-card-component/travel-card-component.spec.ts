import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelCardComponent } from './travel-card-component';

describe('TravelCardComponent', () => {
  let component: TravelCardComponent;
  let fixture: ComponentFixture<TravelCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TravelCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TravelCardComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
