import {Component, OnInit} from '@angular/core';
import {ControlContainer, FormControl, FormGroup} from '@angular/forms';
import toppings from '../../../infrastructure/select-options/toppings';

@Component({
  selector: 'app-pizza-options',
  templateUrl: './pizza-options.component.html',
  styleUrls: ['./pizza-options.component.scss']
})
export class PizzaOptionsComponent implements OnInit {
  public pizzaForm!: FormGroup;
  public toppingOptions: { name: string; value: string }[] = toppings;

  constructor(public controlContainer: ControlContainer) {
  }

  ngOnInit(): void {
    this.pizzaForm = this.controlContainer.control as FormGroup;
  }

  get toppingsControl(): FormControl {
    return this.pizzaForm.get('toppings') as FormControl;
  }

  onToppingsChange(event: Event, name: string) {
    let toppings = (this.toppingsControl?.value || []) as string[];
    const target = (event.target as HTMLInputElement);
    if (target?.checked) {
      toppings.push(name);
    } else {
      toppings = toppings.filter(x => x !== name);
    }
    this.toppingsControl.patchValue(toppings);
  }

  // very bad to use fn in template but no other way during this short time
  isCheckedTopping(val: string) {
    let toppings = (this.toppingsControl?.value || []) as string[];
    return toppings.indexOf(val) > -1;
  }
}
