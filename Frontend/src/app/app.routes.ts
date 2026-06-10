import { Routes } from '@angular/router';

import { LoginComponent } from './Components/AuthModule/login-component/login-component';
import { RegisterComponent } from './Components/AuthModule/register-component/register-component';
import { ProfilePreferencesComponent } from './Components/AuthModule/profile-preferences-component/profile-preferences-component';
import { CustomerDashboardComponent } from './Components/CustomerModule/customer-dashboard-component/customer-dashboard-component';
import { AdminDashboardComponent } from './Components/AdminModule/admin-dashboard-component/admin-dashboard-component';
import { TravelListComponent } from './Components/TravelModule/travel-list-component/travel-list-component';
import { ItineraryDashboardComponent } from './Components/ItineraryModule/itinerary-dashboard-component/itinerary-dashboard-component';
import { ForgotPasswordComponent } from './Components/AuthModule/forgot-password-component/forgot-password-component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'profile-preferences', component: ProfilePreferencesComponent },

  // The Main Hubs you identified
  { path: 'customer-dashboard', component: CustomerDashboardComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent },
  { path: 'travel-catalog', component: TravelListComponent },
  { path: 'my-itineraries', component: ItineraryDashboardComponent }, // Attached Itinerary Module Target Link
  { path: '**', redirectTo: 'login' },
];
  
