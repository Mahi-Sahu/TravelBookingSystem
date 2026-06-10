import { Routes } from '@angular/router';
import { TravelListComponent } from './Components/TravelModule/travel-list-component/travel-list-component';
import { CustomerDashboardComponent } from './Components/CustomerModule/customer-dashboard-component/customer-dashboard-component';
import { CustomerProfileComponent } from './Components/CustomerModule/customer-profile-component/customer-profile-component';
export const routes: Routes = [
  { path: '', component: TravelListComponent },
  { path: 'travel-catalog', component: TravelListComponent },
  {
    path: 'customer/dashboard',
    component: CustomerDashboardComponent,
  },
  {
    path: 'customer/profile',
    component: CustomerProfileComponent
  },
];
