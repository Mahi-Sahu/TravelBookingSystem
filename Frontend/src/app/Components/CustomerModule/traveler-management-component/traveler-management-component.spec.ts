import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelerManagementComponent } from './traveler-management-component';

describe('TravelerManagementComponent', () => {
  let component: TravelerManagementComponent;
  let fixture: ComponentFixture<TravelerManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TravelerManagementComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TravelerManagementComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
