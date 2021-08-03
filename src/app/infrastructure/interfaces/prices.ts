import {PricePerType} from './price-per-type';

export interface IPrices {
  sizes: PricePerType;
  toppings: {
    [key: string]: PricePerType;
  }
}
