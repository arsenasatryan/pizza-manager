import {Component, Input, OnChanges, OnInit, Output, SimpleChanges, EventEmitter} from '@angular/core';
import {IPrices} from '../../../infrastructure/interfaces/prices';
import {IPizza} from '../../../infrastructure/interfaces/pizza';
import sizes from '../../../infrastructure/select-options/sizes';
import {IOrderSummary} from '../../../infrastructure/interfaces/order-summary';
import toppings from '../../../infrastructure/select-options/toppings';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent implements OnInit, OnChanges {
  @Input() pizzas!: IPizza[];
  @Input() prices!: IPrices;
  @Output() updateTotalPrice = new EventEmitter<number>();
  public summaryDetails: IOrderSummary[] = [];
  public total: number = 0;

  constructor() {
  }

  ngOnInit(): void {
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this.generateSummary();
  }

  private generateSummary(): void {
    this.summaryDetails = [];
    this.total = 0;
    if (this.prices && this.pizzas?.length) {
      this.summaryDetails = this.pizzas.map((pizza, i) => {
        const pizzaSizePrice = this.prices.sizes[pizza.size];
        this.total += pizzaSizePrice;
        return {
          name: `${sizes.find(x => x.value === pizza.size)?.name} Pizza ${i + 1}`,
          price: pizzaSizePrice,
          toppings: (pizza.toppings || []).map((pizzaTp) => {
            const toppingPrice = this.prices.toppings[pizzaTp][pizza.size];
            this.total += toppingPrice;
            return {
              name: `${toppings.find((tp) => tp.value === pizzaTp)?.name}`,
              price: this.prices.toppings[pizzaTp][pizza.size]
            };
          })
        };
      });
      this.updateTotalPrice.emit(this.total);
    }
  }

}
