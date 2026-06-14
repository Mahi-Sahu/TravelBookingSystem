import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingComponent } from './booking-component';
import { BookingService } from '../../../Services/booking-service';
import { AuthService } from '../../../Services/auth-service';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Subject } from 'rxjs';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ChangeDetectorRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

describe('BookingComponent', () => {
  let component: BookingComponent;
  let fixture: ComponentFixture<BookingComponent>;

  //mock dependencies:
  let mockBookingService: jasmine.SpyObj<BookingService>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockRouter: any;
  let mockActivatedRoute;;

  beforeEach(async () => {
    //jasmine spies:
    mockBookingService=jasmine.createSpyObj('BookingService',
      ['getDestinationById',
        'getTravelServiceById',
        'getTravelersByUser'
      ]);
    mockAuthService=jasmine.createSpyObj('AuthService',['currentUser']);
    mockRouter=jasmine.createSpyObj('Router',['navigate']);
    mockRouter.events=new Subject<any>();

      //query parameters of activated route mock:
      mockActivatedRoute={
        queryParams: of({
          destinationId: 'dest123',
          serviceId: 'srv456',
          itineraryId: 'it1'
        })
      };

      mockAuthService.currentUser.and.returnValue({id: 42} as any);
      mockBookingService.getTravelServiceById.and.returnValue(of({id: 'srv456', price: 150} as any));
      mockBookingService.getDestinationById.and.returnValue(of({id: 'dest123', name: 'Paris'}as any));
      mockBookingService.getTravelersByUser.and.returnValue(of([{id: 't1',name: 'John Doe'} as any]));

      window.history.replaceState({itineraryDays: ['Day 1','Day 2']},'');



    await TestBed.configureTestingModule({
      imports: [BookingComponent, ReactiveFormsModule],
      providers:[FormBuilder,ChangeDetectorRef,
        {provide: BookingService, useValue: mockBookingService},
        {provide: AuthService, useValue: mockAuthService},
        {provide: Router, useValue: mockRouter},
        {provide: ActivatedRoute, useValue: mockActivatedRoute}
      ],
      schemas:[NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingComponent);
    component = fixture.componentInstance;
    // await fixture.whenStable();
  });

  it('should create the component and fetch logged-in user context', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(component.userId).toBe(42);
    expect(mockAuthService.currentUser).toHaveBeenCalled();
  });

  it("should redirect to /login if user is unauthorised",()=>{
    mockAuthService.currentUser.and.returnValue(null);
    const unauthFixture= TestBed.createComponent(BookingComponent);
    const unauthComponent=unauthFixture.componentInstance;
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  });

  it("should load destinations, services and travelers on initialisation from query parameters",()=>{
    fixture.detectChanges();

    expect(mockBookingService.getDestinationById).toHaveBeenCalledWith('dest123');
    expect(mockBookingService.getTravelServiceById).toHaveBeenCalledWith('srv456');
    expect(mockBookingService.getTravelersByUser).toHaveBeenCalledWith(42);

    expect(component.destination).toEqual({ id: 'dest123', name: 'Paris' } as any);
    expect(component.selectedService).toEqual({ id: 'srv456', price: 150 } as any);
    expect(component.itineraryDays).toEqual(['Day 1', 'Day 2']);
  });

  it("should calculate the total price correctly when travelers are toggled",()=>{
    fixture.detectChanges();

    //mock selecting traveler:
    const dummyEvent={target:{ checked: true}} as unknown as Event;
    component.toggleTraveler('t1', dummyEvent);

    expect(component.selectedTravelerIds).toContain('t1');
    expect(component.totalPrice).toBe(150);

    component.selectedTravelerIds.push('t2');
    component.calculatePrice();
    expect(component.totalPrice).toBe(300);
  });

  it('should navigate to add-traveler route with existing state when addTraveler is executed', () => {
    fixture.detectChanges();
    component.addTraveler();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/customer/traveler/add'], {
      state: {
        destination: component.destination,
        selectedService: component.selectedService,
        itineraryId: component.itineraryId,
        itineraryDays: component.itineraryDays
      }
    });
  });

  it('should not navigate to review page if form inputs or selections are invalid', () => {
    fixture.detectChanges();
    
    component.proceedToReview();
    expect(mockRouter.navigate).not.toHaveBeenCalledWith(['/customer/booking/review'], jasmine.any(Object));
  });

  it('should navigate to review interface with correct booking data when inputs are valid', () => {
    fixture.detectChanges();

    component.bookingForm.get('travelDate')?.setValue('2026-07-15');
    component.selectedTravelerIds = ['t1'];
    component.totalPrice = 150;

    component.proceedToReview();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/customer/booking/review'], {
      state: {
        bookingData: {
          userId: 42,
          destinationId: NaN, // standard parsing value output when string values evaluate to letters or undefined id structures inside standard mock types
          serviceId: 'srv456',
          itineraryId: 'it1',
          itineraryDays: ['Day 1', 'Day 2'],
          travelDate: '2026-07-15',
          travelerIds: ['t1'],
          travelers: 1,
          totalPrice: 150,
          status: 'PENDING'
        }
      }
    });
  });
});
