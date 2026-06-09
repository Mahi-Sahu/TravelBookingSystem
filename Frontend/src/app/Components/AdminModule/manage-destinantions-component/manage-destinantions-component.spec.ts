import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDestinantionsComponent } from './manage-destinantions-component';

describe('ManageDestinantionsComponent', () => {
  let component: ManageDestinantionsComponent;
  let fixture: ComponentFixture<ManageDestinantionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageDestinantionsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ManageDestinantionsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
