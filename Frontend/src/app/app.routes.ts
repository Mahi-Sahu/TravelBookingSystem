import { Routes } from '@angular/router';

import { LoginComponent } from './Components/AuthModule/login-component/login-component';
import { RegisterComponent } from './Components/AuthModule/register-component/register-component';
import { ProfilePreferencesComponent } from './Components/AuthModule/profile-preferences-component/profile-preferences-component';
import { CustomerDashboardComponent } from './Components/CustomerModule/customer-dashboard-component/customer-dashboard-component';
import { TravelListComponent } from './Components/TravelModule/travel-list-component/travel-list-component';
import { ItineraryDashboardComponent } from './Components/ItineraryModule/itinerary-dashboard-component/itinerary-dashboard-component';

import { AdminDashboardComponent } from './Components/AdminModule/admin-dashboard-component/admin-dashboard-component';
import { ManageTravelComponent } from './Components/AdminModule/manage-travel-component/manage-travel-component';
import { ManageBookingsComponent } from './Components/AdminModule/manage-bookings-component/manage-bookings-component';
import { ManageDestinationsComponent } from './Components/AdminModule/manage-destinations-component/manage-destinations-component'; // Note spelling based on your file structure
import { ReportsComponent } from './Components/AdminModule/reports-component/reports-component';
import { ManagePricingComponent } from './Components/AdminModule/manage-pricing-component/manage-pricing-component';
import { ManageNotificationsComponent } from './Components/AdminModule/manage-notifications-component/manage-notifications-component';
import { ManageAvailabilityComponent } from './Components/AdminModule/manage-availability-component/manage-availability-component';
import { ManageItinerariesComponent } from './Components/AdminModule/manage-itineraries-component/manage-itineraries-component';
import { adminGuard } from './Guards/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile-preferences', component: ProfilePreferencesComponent },

  // The Main Hubs you identified
  { path: 'customer-dashboard', component: CustomerDashboardComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent },
  { path: 'travel-catalog', component: TravelListComponent },
  { path: 'my-itineraries', component: ItineraryDashboardComponent }, // Attached Itinerary Module Target Link

  { path: 'admin/manage-travel', component: ManageTravelComponent, canActivate: [adminGuard] },
  { path: 'admin/manage-bookings', component: ManageBookingsComponent, canActivate: [adminGuard] },
  {
    path: 'admin/manage-destinations',
    component: ManageDestinationsComponent,
    canActivate: [adminGuard],
  },
  { path: 'admin/reports', component: ReportsComponent, canActivate: [adminGuard] },
  { path: 'admin/manage-pricing', component: ManagePricingComponent, canActivate: [adminGuard] },
  {
    path: 'admin/manage-notifications',
    component: ManageNotificationsComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'admin/manage-availability',
    component: ManageAvailabilityComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'admin/manage-itineraries',
    component: ManageItinerariesComponent,
    canActivate: [adminGuard],
  },
  { path: '**', redirectTo: 'login' },
];
