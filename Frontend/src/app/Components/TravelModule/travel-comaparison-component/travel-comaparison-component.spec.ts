import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelComaparisonComponent } from './travel-comaparison-component';

describe('TravelComaparisonComponent', () => {
  let component: TravelComaparisonComponent;
  let fixture: ComponentFixture<TravelComaparisonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TravelComaparisonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TravelComaparisonComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
