import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbPanelChangeEvent} from '@ng-bootstrap/ng-bootstrap';
import {NewOrderService} from '../services/new-order.service';
import {Subscription} from 'rxjs';
import {IPrices} from '../../../infrastructure/interfaces/prices';
import {finalize} from 'rxjs/operators';
import {updateTreeValidity} from '../../../infrastructure/utils/update-tree-validity';
import {ToastService} from '../../../core/services/toast-service';
import {randomIdGenerator} from '../../../infrastructure/utils/random-id-generator';
import {smoothScrollToTop} from '../../../infrastructure/utils/smooth-scroll';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.scss']
})
export class NewOrderComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public activeIds = ['pizza-0'];
  public subscription = new Subscription();
  public prices!: IPrices;
  public loadingPrices = true;
  private totalPrice = 0;

  constructor(private fb: FormBuilder, private newOrderService: NewOrderService,
              private toastService: ToastService) {
    this.form = this.buildForm();
  }

  ngOnInit(): void {
    const priceSub = this.newOrderService.getPrices()
      .pipe(finalize(() => {
        this.loadingPrices = false;
      }))
      .subscribe((prices) => {
        this.prices = prices;
      });
    this.subscription.add(priceSub);
  }

  private buildForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required, Validators.maxLength(200)]],
      phone: ['', [Validators.required]], // may be we need pattern validator for phone
      pizzas: this.fb.array([this.generateDefaultPizza()])
    })
  }

  private resetForm(): void {
    // hacky solution to reset form and initalize again
    this.form = null as unknown as FormGroup;
    setTimeout(() => {
      this.form = this.buildForm();
    });
  }

  private generateDefaultPizza() {
    return this.fb.group({
      size: ['large'],
      toppings: [[]]
    });
  }

  get pizzaGroupControls(): FormGroup[] {
    return (this.form.get('pizzas') as FormArray)?.controls as FormGroup[];
  }

  public addPizza(): void {
    const pizzas = (this.form.get('pizzas') as FormArray);
    if (pizzas) {
      pizzas.push(this.generateDefaultPizza());
      this.addToActiveList(`pizza-${pizzas.length - 1}`);
    }
  }

  private addToActiveList(id: string) {
    this.activeIds = [...this.activeIds, id];
  }

  private removeFromActiveList(index: number) {
    const activeIds: string[] = [];
    this.activeIds.forEach((id) => {
      const idN = Number(id.replace('pizza-', ''));
      if (idN < index) {
        activeIds.push(id);
      }
      if (idN > index) {
        activeIds.push(`pizza-${idN - 1}`);
      }
    });
    this.activeIds = activeIds;
  }

  public removePizza(index: number): void {
    (this.form.get('pizzas') as FormArray)?.removeAt(index);
    this.removeFromActiveList(index)
  }

  onPanelChange(event: NgbPanelChangeEvent): void {
    if (event.nextState) {
      this.addToActiveList(event.panelId);
    } else {
      this.removeFromActiveList(Number(event.panelId.replace('pizza-', '')))
    }
  }

  submitOrder(): void {
    this.form.markAllAsTouched();
    updateTreeValidity(this.form);
    setTimeout(async () => {
      if (this.form.valid) {
        this.newOrderService.placeOrder({
          ...this.form.value,
          // add some extra fields instead of backing, do not do custom coding on API
          status: 'pending',
          createdTime: new Date().toISOString(),
          itemId: randomIdGenerator(),
          price: Number(this.totalPrice.toFixed(2)),
        }).subscribe(() => {
          this.toastService.showSuccess('Order successfully placed.');
          this.resetForm();
        }, () => {
          this.toastService.showError('Something went wrong. please try again.');
        });
      } else {
        smoothScrollToTop();
      }
    });
  }

  public updateTotalPrice(price: number) {
    this.totalPrice = price;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
