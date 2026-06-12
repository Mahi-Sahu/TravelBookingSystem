import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const travelDateSequencingValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const start = control.get('startDate')?.value;
  const end = control.get('endDate')?.value;

  if (start && end) {
    const startDate = new Date(start);
    const endDate = new Date(end);

    if (endDate < startDate) {
      return { dateSequencing: true }; 
    }
  }
  return null;
};