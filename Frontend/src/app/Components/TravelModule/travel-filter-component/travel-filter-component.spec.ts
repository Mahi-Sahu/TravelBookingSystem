import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelFilterComponent } from './travel-filter-component';

describe('TravelFilterComponent', () => {
  let component: TravelFilterComponent;
  let fixture: ComponentFixture<TravelFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TravelFilterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TravelFilterComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
