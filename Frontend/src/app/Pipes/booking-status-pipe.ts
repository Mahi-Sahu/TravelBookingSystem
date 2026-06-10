import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bookingStatus',
  standalone: true,
})
export class BookingStatusPipe implements PipeTransform {
  transform(value: string): string {
    return value
      .toLowerCase()
      .replace('_', ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase());
  }
}
