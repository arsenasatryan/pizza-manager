import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {OrderStatus} from '../../../infrastructure/enums/order-status';

@Component({
  selector: 'app-order-status-actions',
  templateUrl: './order-status-actions.component.html',
  styleUrls: ['./order-status-actions.component.scss']
})
export class OrderStatusActionsComponent implements OnInit {
  @Input() status!: OrderStatus;
  @Input() loading = false;
  @Output() changeStatus = new EventEmitter<OrderStatus>();
  public orderStatus = OrderStatus;

  constructor() { }

  ngOnInit(): void {
  }

  changeTo(status: OrderStatus): void {
    if (!this.loading) {
      this.changeStatus.emit(status);
    }
  }

}
