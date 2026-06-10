import { TestBed } from '@angular/core/testing';

import { TravelData } from './travel-data';

describe('TravelData', () => {
  let service: TravelData;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TravelData);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
