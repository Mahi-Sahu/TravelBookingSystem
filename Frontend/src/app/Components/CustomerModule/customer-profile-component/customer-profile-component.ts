import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CustomerProfileService } from '../../../Services/customer-profile-service';
import { AuthService } from '../../../Services/auth-service';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../Shared/navbar-component/navbar-component';

@Component({
  selector: 'app-customer-profile-component',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NavbarComponent],
  templateUrl: './customer-profile-component.html',
  styleUrl: './customer-profile-component.css',
})
export class CustomerProfileComponent implements OnInit {
  profileForm!: FormGroup;
  successMessage = '';
  isEditMode = false;
  originalData: any;
  isSaving = false;

  //to be taken as input
  userId = 1;

  constructor(
    private fb: FormBuilder,
    private profileService: CustomerProfileService,
    private changeDetection: ChangeDetectorRef,
    private router: Router
  ) {}

  private authService= inject(AuthService);

  ngOnInit(): void {
    const currentUser=this.authService.currentUser();
    if(currentUser && currentUser.id){
      this.userId=currentUser.id;
      this.initializeForm();
      this.loadUser();
    }else{
      this.router.navigate(['/login']);
    }
    
  }

  initializeForm(): void {
    this.profileForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: [''],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[6-9][0-9]{9}$')]],
      city: ['', [Validators.required]],
    });
    this.profileForm.disable();
    this.changeDetection.detectChanges();
  }

  loadUser(): void {
    this.profileService.getUser(this.userId).subscribe({
      next: (user) => {
        this.originalData = user;

        this.profileForm.patchValue({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
          city: user.city,
        });
        this.changeDetection.detectChanges();

        this.profileForm.disable();
      },

      error: (err) => {
        console.error(err);
      },
    });
  }

  enableEdit(): void {
    this.successMessage='';
    this.isEditMode = true;
    this.profileForm.enable();
  }

  cancelEdit(): void {
    this.isEditMode = false;
    this.profileForm.patchValue(this.originalData);
    this.profileForm.disable();
  }

  //detect changes:
  get hasChanges(): boolean {
    if (!this.originalData) {
      return false;
    }
    return (
      JSON.stringify(this.profileForm.getRawValue()) !==
      JSON.stringify({
        firstName: this.originalData.firstName,
        lastName: this.originalData.lastName,
        email: this.originalData.email,
        phone: this.originalData.phone,
        city: this.originalData.city,
      })
    );
  }

  onSubmit(): void {
    if (this.profileForm.invalid || !this.hasChanges) {
      return;
    }

    this.isSaving = true;

    const updatedUser = { ...this.originalData, ...this.profileForm.getRawValue() };

    this.profileService.updateUser(this.userId, updatedUser).subscribe({
      next: (response) => {
        this.isSaving = false;

        this.originalData = response;

        this.profileForm.patchValue(response);

        this.isEditMode = false;

        setTimeout(() => {
          this.successMessage = 'Profile Updated Successfully';
        }, 5000);

        this.changeDetection.detectChanges();
      },

      error: (err) => {
        this.isSaving = false;

        console.error(err);
      },
    });
  }
}
