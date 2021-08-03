import {AbstractControl, FormArray, FormGroup} from '@angular/forms';

export function updateTreeValidity(group: FormGroup | FormArray): void {
  Object.keys(group.controls).forEach((key: string) => {
    const abstractControl: AbstractControl | FormGroup | FormArray = group.get(key) as AbstractControl | FormGroup | FormArray;

    if (abstractControl instanceof FormGroup || abstractControl instanceof FormArray) {
      updateTreeValidity(abstractControl);
    } else {
      abstractControl.updateValueAndValidity();
    }
  });
}
