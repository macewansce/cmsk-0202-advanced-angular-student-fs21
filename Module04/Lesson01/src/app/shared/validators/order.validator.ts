import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function invalidOrderIdValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const valid = control.value >= -1 && control.value <= 99999;
    return !valid ? {invalidOrderId: {value: control.value}} : null;
  };
}


