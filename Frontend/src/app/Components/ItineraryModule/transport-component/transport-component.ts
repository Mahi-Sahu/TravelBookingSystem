import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transport',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transport-component.html',
  styleUrl: './transport-component.css'
})
export class TransportComponent {
  @Input({ required: true }) type!: string;
  @Input({ required: true }) from!: string;
  @Input({ required: true }) to!: string;
  @Input({ required: true }) time!: string;

  hasValidTransit(): boolean {
    //* Double negation (!!) explicitly forces truthy/falsy expressions into a strict boolean type.
    return !!this.type && this.type !== '-';
  }

  getTransitIcon(): string {
    switch (this.type?.toLowerCase()) {
      case 'flight': return '✈️';
      case 'train': return '🚂';
      case 'boat': case 'cruise': return '🚢';
      case 'metro': return '🚇';
      default: return '🚗';
    }
  }
}