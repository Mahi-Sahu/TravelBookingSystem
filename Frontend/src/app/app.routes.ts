import { Routes } from '@angular/router';

import { LoginComponent } from './Components/AuthModule/login-component/login-component';
import { RegisterComponent } from './Components/AuthModule/register-component/register-component';
import { ProfilePreferencesComponent } from './Components/AuthModule/profile-preferences-component/profile-preferences-component';
import { CustomerDashboardComponent } from './Components/CustomerModule/customer-dashboard-component/customer-dashboard-component';
import { CustomerProfileComponent } from './Components/CustomerModule/customer-profile-component/customer-profile-component';
import { AdminDashboardComponent } from './Components/AdminModule/admin-dashboard-component/admin-dashboard-component';
import { TravelListComponent } from './Components/TravelModule/travel-list-component/travel-list-component';
import { ItineraryDashboardComponent } from './Components/ItineraryModule/itinerary-dashboard-component/itinerary-dashboard-component';
import { ForgotPasswordComponent } from './Components/AuthModule/forgot-password-component/forgot-password-component';
import { BookingComponent } from './Components/BookingModule/booking-component/booking-component';
import { BookingReviewComponent } from './Components/BookingModule/booking-review-component/booking-review-component';
import { BookingHistoryComponent } from './Components/BookingModule/booking-history-component/booking-history-component';
import { BookingConfirmationComponent } from './Components/BookingModule/booking-confirmation-component/booking-confirmation-component';

export const routes: Routes = [
  //auth module:
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'profile-preferences', component: ProfilePreferencesComponent },

  //customer-module
  { path: 'customer-dashboard', component: CustomerDashboardComponent },
  { path: 'customer/profile', component: CustomerProfileComponent },
  { path: 'customer/booking', component: BookingComponent },
  { path: 'customer/booking/review', component: BookingReviewComponent },
  { path: 'customer/booking/confirmation', component: BookingConfirmationComponent},

  //admin module
  { path: 'admin-dashboard', component: AdminDashboardComponent },

  //travel module
  { path: 'travel-catalog', component: TravelListComponent },

  //itinerary module
  { path: 'my-itineraries', component: ItineraryDashboardComponent }, // Attached Itinerary Module Target Link
  { path: '**', redirectTo: 'login' },
];
