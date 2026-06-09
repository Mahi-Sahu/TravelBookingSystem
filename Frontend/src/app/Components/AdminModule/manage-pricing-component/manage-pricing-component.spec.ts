import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePricingComponent } from './manage-pricing-component';

describe('ManagePricingComponent', () => {
  let component: ManagePricingComponent;
  let fixture: ComponentFixture<ManagePricingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagePricingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ManagePricingComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
