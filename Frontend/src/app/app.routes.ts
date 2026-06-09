import { Routes } from '@angular/router';
import { TravelListComponent } from './Components/TravelModule/travel-list-component/travel-list-component';
export const routes: Routes = [
    { path: '', component: TravelListComponent }, 
  { path: 'travel-catalog', component: TravelListComponent }
];
