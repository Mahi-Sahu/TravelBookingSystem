import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTravelerComponent } from './add-traveler-component';

describe('AddTravelerComponent', () => {
  let component: AddTravelerComponent;
  let fixture: ComponentFixture<AddTravelerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTravelerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddTravelerComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
