import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register-component';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, provideRouter } from '@angular/router';
import { AuthService } from '../../../Services/auth-service';
import { of, throwError } from 'rxjs';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let router: Router; // Use the real Router object

  beforeEach(async () => {
    // Spy only on the AuthService
    const authSpy = jasmine.createSpyObj('AuthService', ['register']);

    await TestBed.configureTestingModule({
      imports: [RegisterComponent, ReactiveFormsModule],
      providers: [
        { provide: AuthService, useValue: authSpy },
        provideRouter([]), // Safely provides ActivatedRoute and the real Router
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;

    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;

    // Inject the real Router and spy on its navigate method
    router = TestBed.inject(Router);
    spyOn(router, 'navigate');

    // Spy on alert and console to prevent popups and clutter in test output
    spyOn(window, 'alert');
    spyOn(console, 'log');
    spyOn(console, 'error');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an invalid form on initialization', () => {
    expect(component.registerForm.valid).toBeFalse();
  });

  it('should validate phone number format', () => {
    const phoneControl = component.registerForm.get('userDetails.phone');

    phoneControl?.setValue('1234567890'); // Starts with 1, should be invalid
    expect(phoneControl?.valid).toBeFalse();

    phoneControl?.setValue('9876543210'); // Starts with 9, 10 digits, valid
    expect(phoneControl?.valid).toBeTrue();
  });

  it('should not call register on submit if form is invalid', () => {
    component.onSubmit();
    expect(authServiceSpy.register).not.toHaveBeenCalled();
  });

  it('should call register and navigate on successful submission', () => {
    // Fill the form with valid data
    component.registerForm.patchValue({
      userDetails: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'password123',
        phone: '9876543210',
        city: 'New York',
      },
      travelerInfo: {
        age: '25',
        gender: 'Male',
        passportNumber: 'A1234567',
      },
    });

    // Mock response includes id and the required 'role' property
    const mockResponse = {
      id: 1,
      role: 'CUSTOMER',
      ...component.registerForm.getRawValue().userDetails,
    };

    // Cast to any to bypass strict TypeScript checking for this fake data
    authServiceSpy.register.and.returnValue(of(mockResponse as any));

    component.onSubmit();

    const expectedPayload = {
      role: 'CUSTOMER',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: 'password123',
      phone: '9876543210',
      city: 'New York',
    };

    expect(authServiceSpy.register).toHaveBeenCalledWith(expectedPayload as any);
    expect(window.alert).toHaveBeenCalledWith(
      'Registration Successful! Let’s set up your preferences.',
    );
    expect(router.navigate).toHaveBeenCalledWith(['/profile-preferences']);
  });

  it('should handle error on failed registration', () => {
    // Fill the form with valid data
    component.registerForm.patchValue({
      userDetails: {
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane@example.com',
        password: 'password123',
        phone: '9876543210',
        city: 'London',
      },
      travelerInfo: {
        age: '30',
        gender: 'Female',
        passportNumber: 'B7654321',
      },
    });

    authServiceSpy.register.and.returnValue(throwError(() => new Error('Registration Error')));

    component.onSubmit();

    expect(authServiceSpy.register).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith('Registration failed', jasmine.any(Error));
    expect(window.alert).toHaveBeenCalledWith('An error occurred during registration.');
    expect(router.navigate).not.toHaveBeenCalled();
  });
});
