import { ElementRef } from '@angular/core';
import { StatusHighlight } from './status-highlight';

describe('StatusHighlight', () => {
  let directive: StatusHighlight;
  let mockElementRef: ElementRef;

  beforeEach(() => {
    // 1. Create a dummy native element so we can track the style changes
    const mockNativeElement = { style: { color: '' } };
    mockElementRef = new ElementRef(mockNativeElement);

    // 2. Pass the mock ElementRef into the directive's constructor
    directive = new StatusHighlight(mockElementRef);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should set text color to green when status is CONFIRMED', () => {
    directive.appStatusHighlight = 'CONFIRMED';
    directive.ngOnInit(); // Manually trigger ngOnInit
    expect(mockElementRef.nativeElement.style.color).toBe('green');
  });

  it('should set text color to orange when status is PENDING', () => {
    directive.appStatusHighlight = 'PENDING';
    directive.ngOnInit();
    expect(mockElementRef.nativeElement.style.color).toBe('orange');
  });

  it('should set text color to red when status is CANCELLED', () => {
    directive.appStatusHighlight = 'CANCELLED';
    directive.ngOnInit();
    expect(mockElementRef.nativeElement.style.color).toBe('red');
  });

  it('should set text color to black for any other status', () => {
    directive.appStatusHighlight = 'UNKNOWN';
    directive.ngOnInit();
    expect(mockElementRef.nativeElement.style.color).toBe('black');
  });
});
