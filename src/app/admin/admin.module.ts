import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import {OrdersService} from './services/orders.service';
import {SocketIoConfig, SocketIoModule} from 'ngx-socket-io';
import {environment} from '../../environments/environment';

const config: SocketIoConfig = { url: `${environment.SOCKET_URL}`, options: {} };

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [
    OrdersService
  ]
})
export class AdminModule { }
