import { Routes } from '@angular/router';

import { LoginComponent } from './Components/AuthModule/login-component/login-component';
import { RegisterComponent } from './Components/AuthModule/register-component/register-component';
import { ProfilePreferencesComponent } from './Components/AuthModule/profile-preferences-component/profile-preferences-component';
import { CustomerDashboardComponent } from './Components/CustomerModule/customer-dashboard-component/customer-dashboard-component';
import { CustomerProfileComponent } from './Components/CustomerModule/customer-profile-component/customer-profile-component';
import { TravelListComponent } from './Components/TravelModule/travel-list-component/travel-list-component';
import { ItineraryDashboardComponent } from './Components/ItineraryModule/itinerary-dashboard-component/itinerary-dashboard-component';
import { ForgotPasswordComponent } from './Components/AuthModule/forgot-password-component/forgot-password-component';
import { BookingComponent } from './Components/BookingModule/booking-component/booking-component';
import { BookingReviewComponent } from './Components/BookingModule/booking-review-component/booking-review-component';
import { BookingHistoryComponent } from './Components/BookingModule/booking-history-component/booking-history-component';
import { BookingConfirmationComponent } from './Components/BookingModule/booking-confirmation-component/booking-confirmation-component';
import { NotificationListComponent } from './Components/NotificationModule/notification-list-component/notification-list-component';

import { AdminDashboardComponent } from './Components/AdminModule/admin-dashboard-component/admin-dashboard-component';
import { ManageTravelComponent } from './Components/AdminModule/manage-travel-component/manage-travel-component';
import { ManageBookingsComponent } from './Components/AdminModule/manage-bookings-component/manage-bookings-component';
import { ManageDestinationsComponent } from './Components/AdminModule/manage-destinations-component/manage-destinations-component'; // Note spelling based on your file structure
import { ReportsComponent } from './Components/AdminModule/reports-component/reports-component';
import { ManagePricingComponent } from './Components/AdminModule/manage-pricing-component/manage-pricing-component';
import { ManageNotificationsComponent } from './Components/AdminModule/manage-notifications-component/manage-notifications-component';
import { ManageAvailabilityComponent } from './Components/AdminModule/manage-availability-component/manage-availability-component';
import { ManageItinerariesComponent } from './Components/AdminModule/manage-itineraries-component/manage-itineraries-component';
import { adminGuard, authGuard } from './Guards/auth-guard';
import { AddTravelerComponent } from './Components/CustomerModule/add-traveler-component/add-traveler-component';
import { NotFoundComponent } from './Components/Shared/not-found-component/not-found-component';
import { HomeComponent } from './Components/Shared/home-component/home-component';

export const routes: Routes = [
  // --- ROOT NAVIGATION ---
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent }, // The new landing page

  //auth module
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  //protected routes
  { path: 'profile-preferences', component: ProfilePreferencesComponent, canActivate: [authGuard] },

  //customer-module
  { path: 'customer-dashboard', component: CustomerDashboardComponent, canActivate: [authGuard] },
  { path: 'customer/profile', component: CustomerProfileComponent, canActivate: [authGuard] },
  { path: 'customer/booking', component: BookingComponent, canActivate: [authGuard] },
  { path: 'customer/booking/review', component: BookingReviewComponent, canActivate: [authGuard] },
  { path: 'customer/booking/confirmation', component: BookingConfirmationComponent, canActivate: [authGuard] },
  { path: 'customer/booking/history', component: BookingHistoryComponent, canActivate: [authGuard]},
  { path: 'customer/traveler/add', component: AddTravelerComponent, canActivate: [authGuard] },

  //travel module
  { path: 'travel-catalog', component: TravelListComponent, canActivate: [authGuard] },

  //itinerary module
  { path: 'my-itineraries', component: ItineraryDashboardComponent, canActivate: [authGuard] }, // Attached Itinerary Module Target Link

  //notification module
  { path: 'notifications', component: NotificationListComponent, canActivate: [authGuard] },

  //admin module
  { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [adminGuard] },
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

  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '404', pathMatch: 'full' },
];
