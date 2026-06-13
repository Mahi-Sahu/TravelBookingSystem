import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login-component';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, provideRouter } from '@angular/router';
import { AuthService } from '../../../Services/auth-service';
import { of, throwError } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let router: Router; // We will use the real Router object now

  beforeEach(async () => {
    // Create spy for Auth service only
    const authSpy = jasmine.createSpyObj('AuthService', ['login', 'currentUser']);

    await TestBed.configureTestingModule({
      imports: [LoginComponent, ReactiveFormsModule],
      providers: [
        { provide: AuthService, useValue: authSpy },
        provideRouter([]), // This safely provides ActivatedRoute and the real Router
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;

    // Inject the real Router provided by provideRouter([])
    router = TestBed.inject(Router);

    // Attach a spy to the real navigate method so we can track if it gets called
    spyOn(router, 'navigate');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty fields', () => {
    expect(component.loginForm.value).toEqual({ email: '', password: '' });
    expect(component.loginForm.valid).toBeFalse();
  });

  it('should validate email format and required fields', () => {
    const emailControl = component.loginForm.controls['email'];
    const passwordControl = component.loginForm.controls['password'];

    emailControl.setValue('invalidEmail');
    passwordControl.setValue('');
    expect(emailControl.valid).toBeFalse();
    expect(passwordControl.valid).toBeFalse();

    emailControl.setValue('test@example.com');
    passwordControl.setValue('password123');
    expect(emailControl.valid).toBeTrue();
    expect(passwordControl.valid).toBeTrue();
    expect(component.loginForm.valid).toBeTrue();
  });

  it('should not call authService.login if form is invalid', () => {
    component.loginForm.controls['email'].setValue('test@example.com');
    // Password left empty to make form invalid
    component.onLogin();
    expect(authServiceSpy.login).not.toHaveBeenCalled();
  });

  it('should navigate to admin-dashboard if user is ADMIN and login is successful', () => {
    component.loginForm.setValue({ email: 'admin@test.com', password: 'password123' });
    authServiceSpy.login.and.returnValue(of(true));
    authServiceSpy.currentUser.and.returnValue({ role: 'ADMIN' } as any);

    component.onLogin();

    expect(authServiceSpy.login).toHaveBeenCalledWith('admin@test.com', 'password123');
    expect(router.navigate).toHaveBeenCalledWith(['/admin-dashboard']);
  });

  it('should navigate to customer-dashboard if user is not ADMIN and login is successful', () => {
    component.loginForm.setValue({ email: 'customer@test.com', password: 'password123' });
    authServiceSpy.login.and.returnValue(of(true));
    authServiceSpy.currentUser.and.returnValue({ role: 'CUSTOMER' } as any);

    component.onLogin();

    expect(authServiceSpy.login).toHaveBeenCalledWith('customer@test.com', 'password123');
    expect(router.navigate).toHaveBeenCalledWith(['/customer-dashboard']);
  });

  it('should set loginError if authentication fails', () => {
    component.loginForm.setValue({ email: 'user@test.com', password: 'wrongpassword' });
    authServiceSpy.login.and.returnValue(of(false));

    component.onLogin();

    expect(component.loginError).toBe('Invalid email or password');
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should set loginError if server returns an error', () => {
    component.loginForm.setValue({ email: 'user@test.com', password: 'password123' });
    authServiceSpy.login.and.returnValue(throwError(() => new Error('Server Error')));

    component.onLogin();

    expect(component.loginError).toBe('An error occurred while connecting to the server.');
    expect(router.navigate).not.toHaveBeenCalled();
  });
});
