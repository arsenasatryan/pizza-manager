import {Component, OnDestroy, OnInit, QueryList, ViewChildren} from '@angular/core';
import {OrdersService} from '../../services/orders.service';
import {BehaviorSubject, Subscription} from 'rxjs';
import {NgbSortableHeader, SortEvent} from '../../../shared/directives/sortable.directive';
import {ITableStateOptions} from '../../../infrastructure/interfaces/table-state-options';
import {IOrder} from '../../../infrastructure/interfaces/order';
import {OrderStatus} from '../../../infrastructure/enums/order-status';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss', './../../../../scss/components/table.component.scss']
})
export class OrdersListComponent implements OnInit, OnDestroy {
  public subscription = new Subscription();
  public orderListManaged$!: BehaviorSubject<IOrder[]>;
  public orders$!: BehaviorSubject<IOrder[]>;
  @ViewChildren(NgbSortableHeader) headers!: QueryList<NgbSortableHeader>;
  public state: ITableStateOptions = {
    page: 1,
    pageSize: 5,
    sortColumn: '',
    sortDirection: ''
  };
  public totals = {
    totalCount: 0,
    totalCompleted: 0,
    totalPending: 0,
    totalCancelled: 0
  };
  public loadingOrders = true;
  public loadingOrderUpdate = false;

  constructor(private orderService: OrdersService) {
    this.orderService.subscribeToListChanges();
    this.orderListManaged$ = this.orderService.orderListManaged$
    this.orders$ = this.orderService.orders$;
    const listSub = this.orders$.subscribe((orders) => {
      this.calculateTotals(orders);
      this.updateManageOrders();
    });
    this.subscription.add(listSub);
  }

  ngOnInit(): void {
    const orderGetSub = this.orderService.getOrders().pipe(finalize(() => {
      this.loadingOrders = false;
    })).subscribe();
    this.subscription.add(orderGetSub);
  }

  private updateManageOrders(): void {
    this.orderService.manageOrders$.next(this.state);
  }

  public onSort({column, direction}: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.state.sortColumn = column;
    this.state.sortDirection = direction;
    this.updateManageOrders();
  }

  public onPageChange() {
    this.updateManageOrders();
  }

  public calculateTotals(orders: IOrder[]): void {
    this.totals.totalCount = orders.length;
    let totalCompleted = 0;
    let totalPending = 0;
    let totalCancelled = 0;
    const pendingStatuses = [OrderStatus.PENDING, OrderStatus.ACCEPTED, OrderStatus.IN_TRANSIT];
    orders.forEach((x) => {
      if (pendingStatuses.includes(x.status)) {
        totalPending++;
      } else if (x.status === OrderStatus.COMPLETED) {
        totalCompleted++;
      } else if (x.status === OrderStatus.CANCELLED) {
        totalCancelled++;
      }
    })
    this.totals.totalPending = totalPending;
    this.totals.totalCompleted = totalCompleted;
    this.totals.totalCancelled = totalCancelled;
  }

  public printSummary() {
    const currPage = this.state.pageSize;
    this.state.pageSize = 100;
    this.onPageChange();
    setTimeout(() => {
      window.print();
      this.state.pageSize = currPage;
      this.onPageChange();
    });
  }

  public onStatusChange(status: OrderStatus, id?: number) {
    if (!id) return;
    this.loadingOrderUpdate = true;
    this.orderService.updateOrderStatus(status, id).pipe(finalize(() => {
      this.loadingOrderUpdate = false;
    })).subscribe();
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.orderService.unsubscribeToListChanges();
  }

}
