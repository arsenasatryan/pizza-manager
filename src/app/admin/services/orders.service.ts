import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, Subject, Subscription} from 'rxjs';
import {IOrder} from '../../infrastructure/interfaces/order';
import {map, tap} from 'rxjs/operators';
import {ITableStateOptions} from '../../infrastructure/interfaces/table-state-options';
import {Socket} from 'ngx-socket-io';
import {OrderStatus} from '../../infrastructure/enums/order-status';

const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

@Injectable()
export class OrdersService {
  public orders$ = new BehaviorSubject<IOrder[]>([]);
  public orderListManaged$ = new BehaviorSubject<IOrder[]>([]);
  public manageOrders$ = new Subject<ITableStateOptions>();
  private subscription!: Subscription;

  constructor(private http: HttpClient, private socket: Socket) {
  }

  public getOrders(): Observable<IOrder[]> {
    return this.http.get<IOrder[]>('orders?_sort=createdTime&_order=desc').pipe(tap((orders) => {
      this.orders$.next(orders);
    }));
  }

  public updateOrderStatus(status: OrderStatus, id: number) {
    return this.http.patch<IOrder>(`orders/${id}`, {
      status,
      ...(status === OrderStatus.COMPLETED && {completedTime: new Date().toISOString()})
    }).pipe(tap((order) => {
      this.updateOrders(order);
    }));
  }

  public subscribeToListChanges() {
    this.subscription = new Subscription();
    const manageSub = this.manageOrders$.subscribe((value) => {
      this.sortAndFilterOrders(value);
    });
    const socketSub = this.getMessage().subscribe();
    this.subscription.add(manageSub);
    this.subscription.add(socketSub);
  }

  public unsubscribeToListChanges() {
    this.subscription.unsubscribe();
  }

  public sortAndFilterOrders(state: ITableStateOptions) {
    let orders = this.orders$.getValue();
    if (state.sortDirection || state.sortColumn) {
      orders = [...orders].sort((a, b) => {
        const res = compare(a[state.sortColumn as (keyof IOrder)] as string,
          b[state.sortColumn as (keyof IOrder)] as string);
        return state.sortDirection === 'asc' ? res : -res;
      });
    }
    orders = orders.slice((state.page - 1) * state.pageSize, (state.page - 1) * state.pageSize + state.pageSize);
    this.orderListManaged$.next(orders);
  }

  private getMessage(): Observable<any> {
    return this.socket.fromEvent<IOrder>('orderMessage').pipe(map((data: IOrder) => {
      this.updateOrders(data);
    }));
  }

  public updateOrders(order: IOrder): void {
    const orders = this.orders$.getValue();
    const index = orders.findIndex(x => x.itemId === order.itemId);
    if (index > -1) {
      orders[index] = order;
    } else {
      orders.unshift(order);
    }
    this.orders$.next(orders);
  }

}
