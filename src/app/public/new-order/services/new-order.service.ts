import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IPrices} from '../../../infrastructure/interfaces/prices';
import {IOrder} from '../../../infrastructure/interfaces/order';

@Injectable()
export class NewOrderService {
  constructor(private http: HttpClient) {
  }

  getPrices(): Observable<IPrices> {
    return this.http.get<IPrices>('prices');
  }

  placeOrder(order: IOrder): Observable<IOrder> {
    return this.http.post<IOrder>('orders', order);
  }
}
