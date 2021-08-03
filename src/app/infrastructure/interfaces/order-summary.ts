export interface IOrderSummary {
  name: string;
  price: number;
  toppings: {
    name: string;
    price: number;
  }[]
}
