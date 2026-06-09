import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelListComponent } from './travel-list-component';

describe('TravelListComponent', () => {
  let component: TravelListComponent;
  let fixture: ComponentFixture<TravelListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TravelListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TravelListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
