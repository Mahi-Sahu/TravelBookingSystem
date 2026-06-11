import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDestinationsComponent } from './manage-destinations-component';

describe('ManageDestinationsComponent', () => {
  let component: ManageDestinationsComponent;
  let fixture: ComponentFixture<ManageDestinationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageDestinationsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ManageDestinationsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
