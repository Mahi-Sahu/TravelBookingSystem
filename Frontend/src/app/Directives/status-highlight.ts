import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appStatusHighlight]',
  standalone: true,
})
export class StatusHighlight implements OnInit {
  @Input()
  appStatusHighlight = '';

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    switch (this.appStatusHighlight) {
      case 'CONFIRMED':
        this.elementRef.nativeElement.style.color = 'green';
        break;

      case 'PENDING':
        this.elementRef.nativeElement.style.color = 'orange';
        break;

      case 'CANCELLED':
        this.elementRef.nativeElement.style.color = 'red';
        break;

      default:
        this.elementRef.nativeElement.style.color = 'black';
    }
  }
}
