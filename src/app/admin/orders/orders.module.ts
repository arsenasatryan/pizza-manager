import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersListComponent } from './orders-list/orders-list.component';
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule} from '@angular/forms';
import { OrderStatusActionsComponent } from './order-status-actions/order-status-actions.component';

@NgModule({
  declarations: [
    OrdersListComponent,
    OrderStatusActionsComponent
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    NgbPaginationModule,
    SharedModule,
    FormsModule,
  ],
})
export class OrdersModule { }
