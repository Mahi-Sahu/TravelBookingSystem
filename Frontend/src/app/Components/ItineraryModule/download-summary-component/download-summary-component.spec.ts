import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadSummaryComponent } from './download-summary-component';

describe('DownloadSummaryComponent', () => {
  let component: DownloadSummaryComponent;
  let fixture: ComponentFixture<DownloadSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DownloadSummaryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DownloadSummaryComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
