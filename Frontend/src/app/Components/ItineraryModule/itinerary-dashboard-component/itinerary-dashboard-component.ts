import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItineraryService } from '../../../Services/itinerary';
import { ItineraryCardComponent } from '../itinerary-card-component/itinerary-card-component';
import { ItineraryDetailsComponent } from '../itinerary-details-component/itinerary-details-component';
import { Itinerary } from '../../../Models/itinerary';
import { AuthService } from '../../../Services/auth-service';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../Shared/navbar-component/navbar-component';


@Component({
  selector: 'app-itinerary-dashboard-component',
  standalone: true,
  imports: [CommonModule, ItineraryCardComponent, ItineraryDetailsComponent, NavbarComponent],
  templateUrl: './itinerary-dashboard-component.html',
  styleUrl: './itinerary-dashboard-component.css'
})
export class ItineraryDashboardComponent implements OnInit {
  protected itineraryService = inject(ItineraryService);
  protected authService=inject(AuthService);
  private router =inject(Router);
  
  // Mock tracking current authenticated customer (Rahul Sharma id: 1)
  

  selectedItinerary = signal<Itinerary | null>(null);
  

  ngOnInit(): void {
    const currentUser = this.authService.currentUser();

  if(currentUser && currentUser.id){
    
    this.itineraryService.loadUserItineraries(currentUser.id ).subscribe();
  }else{
    this.router.navigate(['/login']);
  }

  }
  
  onSelectItinerary(itinerary: Itinerary): void {
    this.selectedItinerary.set(itinerary);
    this.itineraryService.loadItineraryDetails(itinerary.id).subscribe();
  }

  closeDetails(): void {
    this.selectedItinerary.set(null);
  }
}