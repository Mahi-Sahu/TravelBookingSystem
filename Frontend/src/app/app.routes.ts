import { Routes } from '@angular/router';
import { TravelListComponent } from './Components/TravelModule/travel-list-component/travel-list-component';
import { ItineraryDashboardComponent } from './Components/ItineraryModule/itinerary-dashboard-component/itinerary-dashboard-component';
export const routes: Routes = [
    { path: '', component: TravelListComponent }, 
  { path: 'travel-catalog', component: TravelListComponent },
  { path: 'my-itineraries', component: ItineraryDashboardComponent } // Attached Itinerary Module Target Link
];
