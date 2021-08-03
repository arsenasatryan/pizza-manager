import {IPizza} from './pizza';
import {OrderStatus} from '../enums/order-status';

export interface IOrder {
  name: string;
  address: string;
  email: string;
  phone: string;
  pizzas: IPizza[];
  createdTime: string;
  status: OrderStatus,
  completedTime?: string;
  itemId: string;
  id?: number;
  price: number;
}
