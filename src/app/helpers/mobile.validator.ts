import { AbstractControl, ValidationErrors } from "@angular/forms"

export const MobileValidator = function (control: AbstractControl): ValidationErrors | null {

  let value: string = control.value || '';

  if (!value) {
    return null
  }

  let upperCaseCharacters = /[0-9\+\-\ ]/g
  if (upperCaseCharacters.test(value) === false) {
    return { mobileNumberError: `text has to contine Upper case characters,current value ${value}` };
  }
  return null;
}