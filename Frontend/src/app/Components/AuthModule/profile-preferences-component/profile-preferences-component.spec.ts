import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePreferencesComponent } from './profile-preferences-component';

describe('ProfilePreferencesComponent', () => {
  let component: ProfilePreferencesComponent;
  let fixture: ComponentFixture<ProfilePreferencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilePreferencesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfilePreferencesComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
