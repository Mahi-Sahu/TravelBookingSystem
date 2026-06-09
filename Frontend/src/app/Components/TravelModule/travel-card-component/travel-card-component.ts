import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CurrencyPipe, UpperCasePipe } from '@angular/common';
import { TravelItem } from '../../../Models/travel';

@Component({
  selector: 'app-travel-card',
  standalone: true,
  imports: [CurrencyPipe, UpperCasePipe],
  templateUrl: './travel-card-component.html',
  styleUrl: './travel-card-component.css'
})
export class TravelCardComponent {
  @Input({ required: true }) item!: TravelItem;
  @Output() compare = new EventEmitter<TravelItem>();
  @Output() book = new EventEmitter<TravelItem>();
}